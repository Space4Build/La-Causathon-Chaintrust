import React, { useState } from 'react';
import './Certificados.css';

interface Elemento {
  id: number;
  titulo: string;
  enlaceImagen: string;
}

interface CertificadosProps {
  elementosFila1?: Elemento[];
  elementosFila2?: Elemento[];
}

const Certificados: React.FC<CertificadosProps> = ({ elementosFila1 = [], elementosFila2 = [] }) => {
  const [marcados, setMarcados] = useState<number[]>([]);

  const manejarMarcado = (id: number) => {
    setMarcados(prevMarcados =>
      prevMarcados.includes(id) ? prevMarcados.filter(marcadoId => marcadoId !== id) : [...prevMarcados, id]
    );
  };

  const manejarBoton = () => {
    console.log('Elementos marcados:', marcados);
  };

  const renderizarFila = (elementos: Elemento[]) => (
    <div className="fila">
      {elementos.map(elemento => (
        <div key={elemento.id} className={`elemento ${marcados.includes(elemento.id) ? 'marcado' : ''}`} onClick={() => manejarMarcado(elemento.id)}>
          <div className="imagen-contenedor">
            <img src={elemento.enlaceImagen} alt={elemento.titulo} />
          </div>
          <p>{elemento.titulo}</p>
          <button>Start for free</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="certificados">
      {renderizarFila(elementosFila1)}
      {renderizarFila(elementosFila2)}
      <button onClick={manejarBoton}>Hacer algo con los marcados</button>
    </div>
  );
};

export default Certificados;
