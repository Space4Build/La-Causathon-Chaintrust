// import { Center, HStack, VStack, Button, Heading } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { ReadRequestCertificates } from "./ReadRequestCertificates";

// function Sign() {
//   return (
//     // <ReadRequestCertificates walletID={account}>
//     <div>
//       <ReadRequestCertificates walletID="w4ll3t_id_company" />
//     </div>
//   );
// }

// export { Sign };




import React, { useState, useEffect } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import crypto from 'crypto-browserify';
import { UploadCertificateCall } from './loader'; // Import the UploadCertificateCall component
import { UploadCertificate } from './uploadCertificate';
import image from '/src/data/fondo.png'; // Ensure the path to the background image is correct
import circleImage from '/src/data/fondo2.png'; // Ensure the path to the circular image is correct
import { Link } from 'react-router-dom';
// import { Center, HStack, VStack, Button } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { ReadRequestCertificates } from "./ReadRequestCertificates"; // Assuming this is where ReadRequestCertificates is defined



import { Center, HStack, VStack, Button, Heading } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
import { ReadRequestCertificates } from "./ReadRequestCertificates";
import { SignCertificate } from "./SignCertificates";
import { px } from 'framer-motion';

const Sign: React.FC = () => {
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
    // justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    height: '100%',
    padding: '100px' // Adjust padding as needed
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
    marginBottom: '25px'
  };

  
  const paddingStyle = {
    padding: '40px'
  };

  const heightStyle = {
    height: '200px'
  };

  return (
    <div style={containerStyle}>
      <img src={image} alt="Background" style={imageStyle} />
      <div style={logoContainerStyle}>
        <div style={logoStyle}>
          <div>SmartSign Verifier</div>
          <Button as={Link} to="/" style={{ marginLeft: '20px', color: '#000', textDecoration: 'none' }}>Home</Button>

          <Button as={Link} to="/certificados" style={{ marginLeft: '20px', color: '#000', textDecoration: 'none' }}>Certificados</Button>

          <Button as={Link} to="/sign" style={{ marginLeft: '20px', color: '#000', textDecoration: 'none' }}>Solicitudes</Button>
          
        </div>
        <div style={logoDividerStyle}></div>
      </div>

      <VStack style={contentStyle}>

        <HStack style={paddingStyle}>
          <img style={heightStyle} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdrsaKK3FnZbbPhmWLf7vas3AfU5QH7fIzHoi8LgFwjC621XKGsAsDLUWw&s=10" alt="Image 1"/>
          <div >
            <h3>UCSP</h3>
            <p>Certificación en Gestión Eficiente de Operaciones Industriales, abarcando desde la planificación y optimización de procesos hasta la implementación de prácticas de mejora continua. Aprende estrategias para reducir costos, mejorar la calidad y aumentar la productividad en entornos industriales.</p>
            <SignCertificate walletID="w4ll3t_id_company" />
          </div>
        </HStack>

        <HStack style={paddingStyle}>
          <img style={heightStyle} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL7p9wVTNygKu0vR-nHRIBNKbQnTCt4lboJ1OHHXg-E35l1MBJishZ5t8T&s=10" alt="Image 2"/>
          <div >
            <h3>Google</h3>
            <p>Curso avanzado en diseño gráfico, enfocado en técnicas de ilustración digital, tipografía creativa y diseño de marca. Aprende a utilizar herramientas como Adobe Illustrator y Adobe Photoshop para crear composiciones visuales impactantes.</p>
            <SignCertificate walletID="w4ll3t_id_company" />
          </div>
        </HStack>

        <HStack style={paddingStyle}>
          <img style={heightStyle} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShnO35MVt51nvAkG9w9otPLVHj40TAL8LkNIudpChujnx18jX0BFLELyBq&s=10" alt="Image 2"/>
          <div >
            <h3>Microsoft</h3>
            <p>Certificación en Excel para profesionales, cubriendo desde funciones básicas hasta avanzadas, incluyendo análisis de datos, tablas dinámicas y automatización con macros. Domina la herramienta indispensable para la gestión y análisis de datos en entornos empresariales.</p>
            <SignCertificate walletID="w4ll3t_id_company" />
          </div>
        </HStack>



        {/* <div style={leftContentStyle}>
          <div style={welcomeStyle}>
            <p><strong>{account}</strong></p>
          </div>
          <ReadRequestCertificates walletID="w4ll3t_id_company" />
        </div> */}



      </VStack>
    </div>
  );
};

export { Sign };
