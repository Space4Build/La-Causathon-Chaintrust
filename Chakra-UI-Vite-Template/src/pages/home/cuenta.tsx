import React, { useState, useEffect } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import image from '/src/data/fondo.png'; // Ensure the path to the background image is correct
import { Link } from 'react-router-dom';
import { Center, HStack, VStack, Box, Text } from "@chakra-ui/react";

const Login: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
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
        console.log('Logged in');
      }
    };

    connectToPolkadot();
  }, []);

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
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    height: '100%'
  };

  const logoContainerStyle = {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
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
        <Box textAlign="center">
          <Text fontSize="36px" fontWeight="bold">Welcome</Text>
          <Text fontSize="24px" fontWeight="bold">Your account address is:</Text>
          <Text fontSize="20px"><strong>{account}</strong></Text>
        </Box>
      </div>
    </div>
  );
};

export {Login};
