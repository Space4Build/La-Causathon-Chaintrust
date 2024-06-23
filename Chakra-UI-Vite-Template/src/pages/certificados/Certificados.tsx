import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@chakra-ui/react";
import './Certificados.css';

const Certificados: React.FC = () => {
  const [marcados, setMarcados] = useState<number[]>([]);
  const [marcados2, setMarcados2] = useState<number[]>([]);
  const [usuarioSeguido, setUsuarioSeguido] = useState<boolean>(false);

  const manejarMarcado = (id: number) => {
    setMarcados(prevMarcados =>
      prevMarcados.includes(id) ? prevMarcados.filter(marcadoId => marcadoId !== id) : [id]
    );

  };

  const manejarMarcado2 = (id:number) =>{
    setMarcados2(prevMarcados =>
      prevMarcados.includes(id) ? prevMarcados.filter(marcadoId => marcadoId !== id) : [id]
    );
  };

  const manejarSeguirUsuario = () => {
    setUsuarioSeguido(true);
  };

  const manejarSolicitudFirma = () => {
    if (marcados.length > 0 && usuarioSeguido) {
      const elementosSeleccionados = marcados.map(id =>
        elementos.find(elemento => elemento.id === id)
      );
      const empresasSeleccionadas = marcados2.map(id =>
        empresas.find(empresa => empresa.id === id)
      );

      const enlaces = elementosSeleccionados.map(el => el?.enlaceImagen);
      const wallets = elementosSeleccionados.map(el => el?.wallet);
      const enlacesEmpresas = empresasSeleccionadas.map(emp => emp?.enlaceImagen);
      const walletsEmpresas = empresasSeleccionadas.map(emp => emp?.wallet);

      console.log('Enlaces:', enlaces, 'Wallets:', wallets);
      console.log('Enlaces Empresas:', enlacesEmpresas, 'Wallets Empresas:', walletsEmpresas);
    } else {
      console.log('Debe seleccionar un elemento y seguir a un usuario antes de solicitar la firma');
    }
  };

  const elementos = [
    { id: 1, titulo: 'Elemento 1', enlaceImagen: 'https://images.vexels.com/media/users/3/130100/isolated/lists/1071e6146bfbbb8018d2c36358a988c4-icono-de-circulo-de-documento.png', wallet: 'wallet1' },
    { id: 2, titulo: 'Elemento 2', enlaceImagen: 'https://cdn-icons-png.flaticon.com/256/337/337946.png', wallet: 'wallet2' },
    { id: 3, titulo: 'Elemento 3', enlaceImagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzVxcc0FcUORB6uKIQQz6a8XaKY59cveV9g&s', wallet: 'wallet3' },
    { id: 4, titulo: 'Elemento 4', enlaceImagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKGNMbsLeJHBlLpfYeF4TU18t4zJ4ESnTIQ&s0', wallet: 'wallet4' }
  ];

  const empresas = [
    { id: 1, nombre: 'Google', enlaceImagen: 'https://cdn-icons-png.flaticon.com/256/2875/2875404.png', wallet: 'walletGoogle' },
    { id: 2, nombre: 'Microsoft', enlaceImagen: 'https://static.wikia.nocookie.net/borderlands/images/9/9c/Windows.svg/revision/latest?cb=20100618110446&path-prefix=es', wallet: 'walletMicrosoft' },
    { id: 3, nombre: 'ACM', enlaceImagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSKa_NCPzXGqMpDAtqeNPnC5wuG3V5Zwyglw&s', wallet: 'walletAmazon' }
  ];

  const logoContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
    position: 'absolute',
    top: '20px', // Adjust the position as needed
    left: '10%',
    right: '10%'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const logoDividerStyle = {
    width: '100%',
    height: '2px',
    backgroundColor: '#fff',
    margin: '0 10px'
  };

  return (
    <div className="certificados-container">
      <div style={logoContainerStyle}>
        <div style={logoStyle}>
          <div>SmartSign Verifier</div>
          <Button as={Link} to="/" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Home</Button>
          <Button as={Link} to="/certificados" style={{ marginLeft: '20px', color: '#fff', textDecoration: 'none' }}>Certificados</Button>
        </div>
        <div style={logoDividerStyle}></div>
      </div>
      <div className="main-content">
      <div className="certificados">
          {elementos.map(elemento => (
            <div
              key={elemento.id}
              className={`elemento ${marcados.includes(elemento.id) ? 'marcado' : ''}`}
              style={{ backgroundImage: `url(${elemento.enlaceImagen})` }}
              onClick={() => manejarMarcado(elemento.id)}
            >
              <button className="boton">Start for free</button>
            </div>
          ))}
        </div>
        <div className="sidebar">
          {empresas.map(empresa => (
            <div
              key={empresa.id}
              className={`elemento ${marcados2.includes(empresa.id) ? 'marcado' : ''}`}
              style={{ backgroundImage: `url(${empresa.enlaceImagen})` }}
              onClick={() => manejarMarcado2(empresa.id)}
            >
              <button className="boton-seguir" onClick={manejarSeguirUsuario}>Seguir usuario</button>
            </div>
          ))}
        </div>
        <Button
          className="solicitar-firma-boton"
          onClick={manejarSolicitudFirma}
          disabled={marcados.length === 0 || !usuarioSeguido}
        >
          Solicitar firma
        </Button>
        
      </div>
    </div>
  );
};

export default Certificados;
