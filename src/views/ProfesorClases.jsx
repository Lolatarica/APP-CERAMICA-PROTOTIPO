// src/views/ProfesorClases.jsx
import React, { useState } from 'react';
import logoTaller from '../assets/logo_taller.png'; 
import BotonPrincipal from '../components/BotonPrincipal';

function ProfesorClases({ onVolver, onSeleccionarClase }) {
  const [clases, setClases] = useState([
    { id: 'ceramica', nombre: 'Taller de Cerámica' },
    { id: 'pintura', nombre: 'Taller de Pintura' }
  ]);

  // --- ESTADOS DEL MODAL DINÁMICO ---
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreNuevaClase, setNombreNuevaClase] = useState('');
  const diasHeaders = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  
  // Cada fila es un objeto con la hora y los cupos por día
  const [filasConfig, setFilasConfig] = useState([
    { hora: '00:00', cupos: { LU: '', MA: '', MI: '', JU: '', VI: '', SA: '' } }
  ]);

  const agregarFila = () => {
    setFilasConfig([...filasConfig, { hora: '00:00', cupos: { LU: '', MA: '', MI: '', JU: '', VI: '', SA: '' } }]);
  };

  const actualizarHora = (index, valor) => {
    const nuevasFilas = [...filasConfig];
    nuevasFilas[index].hora = valor;
    setFilasConfig(nuevasFilas);
  };

  const actualizarCupo = (filaIndex, dia, valor) => {
    const nuevasFilas = [...filasConfig];
    nuevasFilas[filaIndex].cupos[dia] = valor;
    setFilasConfig(nuevasFilas);
  };

  const guardarNuevaClase = () => {
    if (!nombreNuevaClase.trim()) return alert("Poné un nombre");
    
    const nuevaClase = {
      id: nombreNuevaClase.toLowerCase().replace(/\s+/g, '-'),
      nombre: nombreNuevaClase,
      config: filasConfig // Guardamos toda la grilla armada
    };

    setClases([...clases, nuevaClase]);
    setMostrarModal(false);
    // Resetear form
    setNombreNuevaClase('');
    setFilasConfig([{ hora: '00:00', cupos: { LU: '', MA: '', MI: '', JU: '', VI: '', SA: '' } }]);
  };

  const styles = {
    container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-crema)', position: 'relative' },
    header: { backgroundColor: 'var(--color-marron-oscuro)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { color: '#E0C9A6', fontFamily: 'var(--font-titulo)', fontSize: '24px', margin: 0 },
    volver: { color: '#E0C9A6', fontSize: '14px', marginTop: '5px', cursor: 'pointer', textDecoration: 'underline' },
    logo: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', padding: '2px', objectFit: 'cover' },
    body: { padding: '20px', flex: 1 },
    tarjetaClase: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '15px', cursor: 'pointer', textAlign: 'center' },
    
    // ESTILOS MODAL DINÁMICO
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: mostrarModal ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: 'white', padding: '20px', borderRadius: '15px', width: '95%', maxHeight: '90vh', overflowY: 'auto' },
    inputNombre: { width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' },
    
    tablaMini: { width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '10px' },
    th: { backgroundColor: 'var(--color-marron-oscuro)', color: 'white', padding: '5px' },
    td: { border: '1px solid #ddd', padding: '2px' },
    inputHora: { width: '50px', border: 'none', textAlign: 'center', fontSize: '12px', fontWeight: 'bold' },
    inputCupo: { width: '25px', border: 'none', textAlign: 'center', backgroundColor: '#f0f0f0', borderRadius: '4px' },
    
    btnMas: { backgroundColor: '#95B89F', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '20px', marginBottom: '20px' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={styles.title}>Panel del profesor</h1>
          <span style={styles.volver} onClick={onVolver}>← Volver</span>
        </div>
        <img src={logoTaller} alt="Logo" style={styles.logo} />
      </header>

      <main style={styles.body}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Mis Clases</h2>
        {clases.map((clase) => (
          <div key={clase.id} style={styles.tarjetaClase} onClick={() => onSeleccionarClase(clase.id)}>
            <h3 style={{ color: 'var(--color-marron-oscuro)', margin: 0 }}>{clase.nombre}</h3>
          </div>
        ))}
        <BotonPrincipal text="+ Nueva Clase Interactiva" onClick={() => setMostrarModal(true)} />
      </main>

      {/* MODAL CON GRILLA DINÁMICA */}
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h3 style={{ color: 'var(--color-marron-oscuro)' }}>Configurar Grilla</h3>
          
          <input 
            style={styles.inputNombre} 
            placeholder="Nombre de la clase..." 
            value={nombreNuevaClase}
            onChange={(e) => setNombreNuevaClase(e.target.value)}
          />

          <table style={styles.tablaMini}>
            <thead>
              <tr>
                <th style={styles.th}>Hora</th>
                {diasHeaders.map(d => <th key={d} style={styles.th}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {filasConfig.map((fila, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    <input 
                      type="text" 
                      style={styles.inputHora} 
                      value={fila.hora} 
                      onChange={(e) => actualizarHora(index, e.target.value)}
                    />
                  </td>
                  {diasHeaders.map(dia => (
                    <td key={dia} style={styles.td}>
                      <input 
                        type="text" 
                        placeholder="-"
                        style={styles.inputCupo}
                        value={fila.cupos[dia]}
                        onChange={(e) => actualizarCupo(index, dia, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button style={styles.btnMas} onClick={agregarFila}>+</button>
          <p style={{ fontSize: '11px', color: '#666', marginBottom: '20px' }}>
            Poné el número de cupos en los días que quieras habilitar.
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setMostrarModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>Cancelar</button>
            <button onClick={guardarNuevaClase} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-marron-oscuro)', color: 'white', fontWeight: 'bold' }}>Guardar Clase</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfesorClases;