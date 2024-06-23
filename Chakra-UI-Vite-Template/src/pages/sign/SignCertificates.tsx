
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { Button } from "@gear-js/ui";

function SignCertificate() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api, isApiReady } = useApi();

  const programID = "0x36dd53b83d99279584bda3f59dc701b9354a1173c15794fec64984e675f82fb7";
  const meta = "00020001000000000001040000000106000000000000000109000000010a000000310f38000808696f28496e6974537472756374000004013466745f70726f6772616d5f696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f64436572746966696361746548616e646c6572416374696f6e73000110187365745461670800140118537472696e670000140118537472696e670000004475706c6f616443657274696669636174650c00140118537472696e670000140118537472696e670000140118537472696e670001003c7369676e43657274696669636174650800140118537472696e670000140118537472696e6700020038726571756573744e65775369676e0c00140118537472696e670000140118537472696e670000140118537472696e6700030000140000050200180418526573756c74080454011c044501200108084f6b04001c000000000c45727204002000000100001c0808696f60436572746966696361746548616e646c65724576656e747300011034736574546167537563636573730000003475706c6f6164537563636573730001002c7369676e5375636365737300020048726571756573745369676e5375636365737300030000200808696f60436572746966696361746548616e646c65724572726f727300010000240808696f5c436572746966696361746548616e646c65725175657279000118305265706c7944656661756c740000002072656164546167730400140118537472696e6700010040726561644365727469666963617465730400140118537472696e6700020024726561645369676e730400140118537472696e670003003072656164416c6c55736572730004005c72656164526571756573744365727469666963617465730400140118537472696e6700050000280808696f70436572746966696361746548616e646c657251756572795265706c79000118305265706c7944656661756c740400140118537472696e670000002072656164546167730400140118537472696e67000100407265616443657274696669636174657304002c01545665633c28537472696e672c20537472696e67293e00020024726561645369676e73040034012c5665633c537472696e673e0003003072656164416c6c557365727304002c01545665633c28537472696e672c20537472696e67293e0004005c726561645265717565737443657274696669636174657304002c01545665633c28537472696e672c20537472696e67293e000500002c00000230003000000408141400340000021400";
  const metadata = ProgramMetadata.from(meta);

  const message = {
    destination: programID,
    payload: {
    "signCertificate": [
        "xxxyyy2",
        "w4ll3t_id_company"
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

  return <Button text="signCertificate" onClick={signer} />;
}

export { SignCertificate };