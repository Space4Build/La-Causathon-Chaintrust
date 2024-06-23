// import React, { useState, useEffect } from 'react';
// import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
// import crypto from 'crypto-browserify';
// import { UploadCertificateCall } from './loader'; // Import the UploadCertificateCall component
// import { UploadCertificate } from './UploadCertificate';
// import image from '/src/data/fondo.png'; // Ensure the path to the background image is correct
// import circleImage from '/src/data/fondo2.png'; // Ensure the path to the circular image is correct
// import { Link } from 'react-router-dom';
// import { Center, HStack, VStack, Button } from "@chakra-ui/react";

// const Login: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [account, setAccount] = useState<string | null>(null);
//   const [fileHash, setFileHash] = useState<string | null>(null);

//   useEffect(() => {
//     const attemptedLogin = localStorage.getItem('attemptedLogin');
//     if (attemptedLogin) {
//       const connectToPolkadot = async () => {
//         const extensions = await web3Enable('SmartSign Verifier');
//         if (extensions.length === 0) {
//           console.log('No extension found');
//           return;
//         } else {
//           console.log('Extension found');
//         }
//         const accounts = await web3Accounts();
//         if (accounts.length > 0) {
//           setAccount(accounts[0].address);
//           setIsLoggedIn(true);
//           console.log('Logged in');
//         }
//       };

//       connectToPolkadot();
//     }
//   }, []);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const data = e.target?.result as ArrayBuffer;
//         const hash = crypto.createHash('sha256');
//         hash.update(new Uint8Array(data));
//         const hashString = hash.digest('hex');
//         setFileHash(hashString);
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   const containerStyle = {
//     position: 'relative' as 'relative',
//     height: '100vh',
//     width: '100vw',
//     fontFamily: 'Arial, sans-serif',
//     overflow: 'hidden',
//     color: '#fff'
//   };

//   const imageStyle = {
//     position: 'absolute' as 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     zIndex: -1
//   };

//   const contentStyle = {
//     display: 'flex' as 'flex',
//     justifyContent: 'space-between' as 'space-between',
//     alignItems: 'center' as 'center',
//     height: '100%',
//     padding: '0 10%' // Adjust padding as needed
//   };

//   const leftContentStyle = {
//     display: 'flex' as 'flex',
//     flexDirection: 'column' as 'column',
//     alignItems: 'flex-start' as 'flex-start',
//     justifyContent: 'center' as 'center',
//     width: '50%'
//   };

//   const rightContentStyle = {
//     display: 'flex' as 'flex',
//     justifyContent: 'center' as 'center',
//     alignItems: 'center' as 'center',
//     width: '50%'
//   };

//   const circleImageStyle = {
//     width: '300px',
//     height: '300px',
//     borderRadius: '50%',
//     objectFit: 'cover'
//   };

//   const inputFileStyle = {
//     margin: '20px 0',
//     padding: '15px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '250px',
//     backgroundColor: '#2A2A3C',
//     color: '#fff'
//   };

//   const headingStyle = {
//     fontSize: '36px',
//     marginBottom: '10px',
//     fontWeight: 'bold' as 'bold'
//   };

//   const logoContainerStyle = {
//     display: 'flex' as 'flex',
//     flexDirection: 'column' as 'column',
//     alignItems: 'flex-start' as 'flex-start',
//     marginBottom: '20px',
//     position: 'absolute' as 'absolute',
//     top: '20px', // Adjust the position as needed
//     left: '10%',
//     right: '10%'
//   };

//   const logoStyle = {
//     display: 'flex' as 'flex',
//     alignItems: 'center' as 'center',
//     fontSize: '20px',
//     fontWeight: 'bold' as 'bold',
//     marginBottom: '10px'
//   };

//   const logoDividerStyle = {
//     width: '100%',
//     height: '2px',
//     backgroundColor: '#fff',
//     margin: '0 10px'
//   };

//   const welcomeStyle = {
//     textAlign: 'left' as 'left',
//     marginBottom: '30px'
//   };

//   return (
//     <div style={containerStyle}>
//       <img src={image} alt="Background" style={imageStyle} />
//       <div style={logoContainerStyle}>
//         <div style={logoStyle}>
//           <div>SmartSign Verifier</div>
//           <Link to="/home" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Home</Link>
//           <Link to="/cuenta" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Cuenta</Link>
//         </div>
//         <div style={logoDividerStyle}></div>
//       </div>
//       <div style={contentStyle}>
//         <div style={leftContentStyle}>
//               <div style={welcomeStyle}>
//                 <h2 style={headingStyle}>Welcome</h2>
//                 <h2 style={headingStyle}>Your account address is:</h2>
//                 <p><strong>{account}</strong></p>
//               </div>
//               <input type="file" onChange={handleFileUpload} style={inputFileStyle} />
//               {fileHash && (
//                 <div>
//                   <h3>File Hash:</h3>
//                   <p>{fileHash}</p>
//                 </div>
//               )}
//               {/* <UploadCertificate /> Use UploadCertificateCall component      */}
//               <UploadCertificate walletID={account} hash={fileHash} url="https://example.com" />

//         </div>
//         <div style={rightContentStyle}>
//           <img src={circleImage} alt="Circular" style={circleImageStyle} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export {Login};







// import React, { useState, useEffect } from 'react';
// import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
// import crypto from 'crypto-browserify';
// import { UploadCertificateCall } from './loader'; // Import the UploadCertificateCall component
// import { UploadCertificate } from './UploadCertificate';
// import image from '/src/data/fondo.png'; // Ensure the path to the background image is correct
// import circleImage from '/src/data/fondo2.png'; // Ensure the path to the circular image is correct
// import { Link } from 'react-router-dom';
// import { Center, HStack, VStack, Button } from "@chakra-ui/react";

// const Login: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [account, setAccount] = useState<string | null>(null);
//   const [fileHash, setFileHash] = useState<string | null>(null);
//   const [url, setUrl] = useState<string>('');

//   useEffect(() => {
//     const attemptedLogin = localStorage.getItem('attemptedLogin');
//     if (attemptedLogin) {
//       const connectToPolkadot = async () => {
//         const extensions = await web3Enable('SmartSign Verifier');
//         if (extensions.length === 0) {
//           console.log('No extension found');
//           return;
//         } else {
//           console.log('Extension found');
//         }
//         const accounts = await web3Accounts();
//         if (accounts.length > 0) {
//           setAccount(accounts[0].address);
//           setIsLoggedIn(true);
//           console.log('Logged in');
//         }
//       };

//       connectToPolkadot();
//     }
//   }, []);

//   const handleUrlSubmit = async () => {
//     try {
//       const response = await fetch(url);
//       const data = await response.arrayBuffer();
//       const hash = crypto.createHash('sha256');
//       hash.update(new Uint8Array(data));
//       const hashString = hash.digest('hex');
//       setFileHash(hashString);
//     } catch (error) {
//       console.error('Error fetching the image:', error);
//     }
//   };

//   const containerStyle = {
//     position: 'relative' as 'relative',
//     height: '100vh',
//     width: '100vw',
//     fontFamily: 'Arial, sans-serif',
//     overflow: 'hidden',
//     color: '#fff'
//   };

//   const imageStyle = {
//     position: 'absolute' as 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     zIndex: -1
//   };

//   const contentStyle = {
//     display: 'flex' as 'flex',
//     justifyContent: 'space-between' as 'space-between',
//     alignItems: 'center' as 'center',
//     height: '100%',
//     padding: '0 10%' // Adjust padding as needed
//   };

//   const leftContentStyle = {
//     display: 'flex' as 'flex',
//     flexDirection: 'column' as 'column',
//     alignItems: 'flex-start' as 'flex-start',
//     justifyContent: 'center' as 'center',
//     width: '50%'
//   };

//   const rightContentStyle = {
//     display: 'flex' as 'flex',
//     justifyContent: 'center' as 'center',
//     alignItems: 'center' as 'center',
//     width: '50%'
//   };

//   const circleImageStyle = {
//     width: '300px',
//     height: '300px',
//     borderRadius: '50%',
//     objectFit: 'cover'
//   };

//   const inputFileStyle = {
//     margin: '20px 0',
//     padding: '15px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '250px',
//     backgroundColor: '#2A2A3C',
//     color: '#fff'
//   };

//   const headingStyle = {
//     fontSize: '36px',
//     marginBottom: '10px',
//     fontWeight: 'bold' as 'bold'
//   };

//   const logoContainerStyle = {
//     display: 'flex' as 'flex',
//     flexDirection: 'column' as 'column',
//     alignItems: 'flex-start' as 'flex-start',
//     marginBottom: '20px',
//     position: 'absolute' as 'absolute',
//     top: '20px', // Adjust the position as needed
//     left: '10%',
//     right: '10%'
//   };

//   const logoStyle = {
//     display: 'flex' as 'flex',
//     alignItems: 'center' as 'center',
//     fontSize: '20px',
//     fontWeight: 'bold' as 'bold',
//     marginBottom: '10px'
//   };

//   const logoDividerStyle = {
//     width: '100%',
//     height: '2px',
//     backgroundColor: '#fff',
//     margin: '0 10px'
//   };

//   const welcomeStyle = {
//     textAlign: 'left' as 'left',
//     marginBottom: '30px'
//   };

//   return (
//     <div style={containerStyle}>
//       <img src={image} alt="Background" style={imageStyle} />
//       <div style={logoContainerStyle}>
//         <div style={logoStyle}>
//           <div>SmartSign Verifier</div>
//           <Link to="/home" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Home</Link>
//           <Link to="/cuenta" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Cuenta</Link>
//         </div>
//         <div style={logoDividerStyle}></div>
//       </div>
//       <div style={contentStyle}>
//         <div style={leftContentStyle}>
//           <div style={welcomeStyle}>
//             <h2 style={headingStyle}>Welcome</h2>
//             <h2 style={headingStyle}>Your account address is:</h2>
//             <p><strong>{account}</strong></p>
//           </div>
//           <input 
//             type="text" 
//             value={url} 
//             onChange={(e) => setUrl(e.target.value)} 
//             placeholder="Enter image URL" 
//             style={inputFileStyle} 
//           />
//           <Button onClick={handleUrlSubmit} colorScheme="blue" style={{ marginTop: '10px' }}>Submit URL</Button>
//           {fileHash && (
//             <div>
//               <h3>File Hash:</h3>
//               <p>{fileHash}</p>
//             </div>
//           )}
//           {/* <UploadCertificate /> Use UploadCertificateCall component */}
//           <UploadCertificate walletID={account} hash={fileHash} url="https://example.com" />
//         </div>
//         <div style={rightContentStyle}>
//           <img src={circleImage} alt="Circular" style={circleImageStyle} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Login };





import React, { useState, useEffect } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import crypto from 'crypto-browserify';
import { UploadCertificateCall } from './loader'; // Import the UploadCertificateCall component
import { UploadCertificate } from './UploadCertificate';
import image from '/src/data/fondo.png'; // Ensure the path to the background image is correct
import circleImage from '/src/data/fondo2.png'; // Ensure the path to the circular image is correct
import { Link } from 'react-router-dom';
import { Center, HStack, VStack, Button } from "@chakra-ui/react";

const Login: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const attemptedLogin = localStorage.getItem('attemptedLogin');
    if (attemptedLogin) {
      const connectToPolkadot = async () => {
        const extensions = await web3Enable('SmartSign Verifier');
        if (extensions.length === 0) {
          console.log('No extension found');
          return;
        } else {
          console.log('Extension found');
        }
        const accounts = await web3Accounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          setIsLoggedIn(true);
          console.log('Logged in');
        }
      };

      connectToPolkadot();
    }
  }, []);

  const handleUrlSubmit = async () => {
    try {
      const response = await fetch(url);
      const data = await response.arrayBuffer();
      const hash = crypto.createHash('sha256');
      hash.update(new Uint8Array(data));
      const hashString = hash.digest('hex');
      setFileHash(hashString);
    } catch (error) {
      console.error('Error fetching the image:', error);
    }
  };

  const containerStyle = {
    position: 'relative' as 'relative',
    height: '100vh',
    width: '100vw',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden',
    color: '#fff'
  };

  const imageStyle = {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1
  };

  const contentStyle = {
    display: 'flex' as 'flex',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    height: '100%',
    padding: '0 10%' // Adjust padding as needed
  };

  const leftContentStyle = {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'flex-start' as 'flex-start',
    justifyContent: 'center' as 'center',
    width: '50%'
  };

  const rightContentStyle = {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    width: '50%'
  };

  const circleImageStyle = {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    objectFit: 'cover'
  };

  const inputFileStyle = {
    margin: '20px 0',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '350px',
    backgroundColor: '#2A2A3C',
    color: '#fff'
  };

  const headingStyle = {
    fontSize: '36px',
    marginBottom: '10px',
    fontWeight: 'bold' as 'bold'
  };

  const logoContainerStyle = {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'flex-start' as 'flex-start',
    marginBottom: '20px',
    position: 'absolute' as 'absolute',
    top: '20px', // Adjust the position as needed
    left: '10%',
    right: '10%'
  };

  const logoStyle = {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    fontSize: '20px',
    fontWeight: 'bold' as 'bold',
    marginBottom: '10px'
  };

  const logoDividerStyle = {
    width: '100%',
    height: '2px',
    backgroundColor: '#fff',
    margin: '0 10px'
  };

  const welcomeStyle = {
    textAlign: 'left' as 'left',
    marginBottom: '30px'
  };

  return (
    <div style={containerStyle}>
      <img src={image} alt="Background" style={imageStyle} />
      <div style={logoContainerStyle}>
        <div style={logoStyle}>
          <div>SmartSign Verifier</div>
          <Link to="/home" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Home</Link>
          <Link to="/cuenta" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Cuenta</Link>
        </div>
        <div style={logoDividerStyle}></div>
      </div>
      <div style={contentStyle}>
        <div style={leftContentStyle}>
          <div style={welcomeStyle}>
            <h2 style={headingStyle}>Welcome</h2>
            <h2 style={headingStyle}>Your account address is:</h2>
            <p><strong>{account}</strong></p>
          </div>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter image URL" 
            style={inputFileStyle} 
          />
          <Button onClick={handleUrlSubmit} colorScheme="blue" style={{ marginTop: '10px' }}>Submit URL</Button>
          {fileHash && (
            <div>
              <h3>File Hash:</h3>
              <p>{fileHash}</p>
            </div>
          )}
          <UploadCertificate walletID={account} hash={fileHash} url={url} />
        </div>
        <div style={rightContentStyle}>
          <img src={circleImage} alt="Circular" style={circleImageStyle} />
        </div>
      </div>
    </div>
  );
};

export { Login };
