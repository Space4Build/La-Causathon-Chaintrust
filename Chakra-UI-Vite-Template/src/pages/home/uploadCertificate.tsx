import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { Button } from "@gear-js/ui";

function UploadCertificate() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api, isApiReady } = useApi();

  const programID = "0xce9738db1894beffa5e471b7394169f06109f53d4dd04e5579bcfbbc9db9d302";
  const meta = "00020001000000000001040000000106000000000000000109000000010a000000590b30000808696f28496e6974537472756374000004013466745f70726f6772616d5f696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f64436572746966696361746548616e646c6572416374696f6e7300010c187365745461670800140118537472696e670000140118537472696e670000004475706c6f616443657274696669636174650c00140118537472696e670000140118537472696e670000140118537472696e670001003c7369676e43657274696669636174650800140118537472696e670000140118537472696e6700020000140000050200180418526573756c74080454011c044501200108084f6b04001c000000000c45727204002000000100001c0808696f60436572746966696361746548616e646c65724576656e747300010c34736574546167537563636573730000003475706c6f6164537563636573730001002c7369676e5375636365737300020000200808696f60436572746966696361746548616e646c65724572726f727300010000240808696f5c436572746966696361746548616e646c65725175657279000110305265706c7944656661756c740000002072656164546167730400140118537472696e6700010040726561644365727469666963617465730400140118537472696e6700020024726561645369676e730400140118537472696e6700030000280808696f70436572746966696361746548616e646c657251756572795265706c79000110305265706c7944656661756c740400140118537472696e670000002072656164546167730400140118537472696e67000100407265616443657274696669636174657304002c012c5665633c537472696e673e00020024726561645369676e7304002c012c5665633c537472696e673e000300002c0000021400";
  const metadata = ProgramMetadata.from(meta);

  const message = {
    destination: programID,
    payload: {
    "uploadCertificate": [
        "w4ll3t_id_gabo",
        "hash_of_doc_2_gabo",
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    ]
},
    gasLimit: 9899819245,
    value: 0,
  };

  const signer = async () => {
    if (!account?.address) {
      alert.error("No account found");
      return;
    }

    const isVisibleAccount = accounts.some((visibleAccount) => visibleAccount.address === account.address);
    if (!isVisibleAccount) {
      alert.error("Account not available to sign");
      return;
    }

    if (!isApiReady) {
      alert.error("API not ready");
      return;
    }

    try {
      const extrinsic = await api.message.send(message, metadata);
      const injector = await web3FromSource(account.meta.source);
      await extrinsic.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
          alert.success("Transaction included in block");
        } else if (status.isFinalized) {
          alert.success("Transaction finalized");
        }
      });
    } catch (error) {
      console.error("Transaction failed", error);
      alert.error("Transaction failed");
    }
  };

  return <Button text="uploadCertificate" onClick={signer} />;
}

export { UploadCertificate };