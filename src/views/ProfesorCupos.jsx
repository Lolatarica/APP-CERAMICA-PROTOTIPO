// src/views/ProfesorCupos.jsx
import React, { useState } from 'react';
import logoTaller from '../assets/logo_taller.png'; 

function ProfesorCupos({ onVolver, claseInicial }) {
const [claseSeleccionada, setClaseSeleccionada] = useState(claseInicial || 'ceramica');  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [celdaSeleccionada, setCeldaSeleccionada] = useState('');
  const [inputCupos, setInputCupos] = useState('');

  const [turnoViendoDetalle, setTurnoViendoDetalle] = useState(null);

  const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  const horas = ['09:00', '10:30', '14:00', '16:00', '18:00'];

  const [turnosPorClase, setTurnosPorClase] = useState({
    ceramica: { 'LU-09:00': 4, 'MA-10:30': 4, 'MA-16:00': 4, 'MI-14:00': 4, 'JU-10:30': 4, 'JU-18:00': 4, 'VI-09:00': 4, 'VI-14:00': 4 },
    pintura: { 'LU-14:00': 4, 'LU-16:00': 4, 'MI-09:00': 4, 'MI-18:00': 4, 'JU-14:00': 4, 'VI-16:00': 4, 'SA-10:30': 4 }
  });

  const alumnosInscritos = {
    'LU-09:00': [
      { id: 1, nombre: 'María López', telefono: '11 2233 4455' },
      { id: 2, nombre: 'Juan Pérez', telefono: '11 9988 7766' }
    ],
    'MA-10:30': [
      { id: 3, nombre: 'Ana Gómez', telefono: '11 5566 7788' }
    ]
  };

  const turnosActuales = turnosPorClase[claseSeleccionada];

  const manejarClicCelda = (idTurno, hayClase) => {
    if (modoEdicion) {
      setCeldaSeleccionada(idTurno);
      setInputCupos(turnosActuales[idTurno] || '');
      setMostrarModal(true);
    } else {
      // Solo permitimos ver detalles si la celda no está vacía
      if (hayClase) {
        if (turnoViendoDetalle === idTurno) {
          setTurnoViendoDetalle(null);
        } else {
          setTurnoViendoDetalle(idTurno);
        }
      }
    }
  };

  const toggleEdicion = () => {
    setModoEdicion(!modoEdicion);
    setTurnoViendoDetalle(null); 
  };

  const guardarCupos = () => {
    if (!inputCupos || inputCupos <= 0) {
      alert("Ingresá un número válido de cupos");
      return;
    }
    setTurnosPorClase({
      ...turnosPorClase,
      [claseSeleccionada]: {
        ...turnosPorClase[claseSeleccionada],
        [celdaSeleccionada]: parseInt(inputCupos)
      }
    });
    setMostrarModal(false);
    setInputCupos('');
  };

  const styles = {
    container: {
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-crema)',
      position: 'relative'
    },
    header: {
      backgroundColor: 'var(--color-marron-oscuro)', padding: '20px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    titleContainer: { display: 'flex', flexDirection: 'column' },
    title: { color: '#E0C9A6', fontFamily: 'var(--font-titulo)', fontSize: '24px', margin: 0 },
    volver: { color: '#E0C9A6', fontSize: '14px', marginTop: '5px', cursor: 'pointer', textDecoration: 'underline' },
    logo: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', padding: '2px', objectFit: 'cover' },
    body: { padding: '20px', flex: 1 },
    contenedorSelect: { marginBottom: '20px' },
    labelSelect: { display: 'block', fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#333' },
    selectBase: {
      width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd',
      backgroundColor: 'var(--color-blanco)', fontSize: '16px', fontFamily: 'var(--font-principal)', cursor: 'pointer'
    },
    
    envoltorioCalendario: {
      border: modoEdicion ? '3px dashed var(--color-marron-oscuro)' : '3px solid transparent',
      padding: modoEdicion ? '10px' : '0',
      borderRadius: '8px', transition: 'all 0.3s ease', position: 'relative',
      backgroundColor: modoEdicion ? 'rgba(93, 77, 66, 0.05)' : 'transparent',
      marginBottom: '15px'
    },
    cartelEdicion: {
      position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: 'var(--color-marron-oscuro)', color: 'white', padding: '5px 15px',
      borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
      display: modoEdicion ? 'block' : 'none'
    },
    calendarioContenedor: { width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '14px' },
    celdaHora: { backgroundColor: '#C8A97E', color: 'var(--color-marron-oscuro)', fontWeight: 'bold', padding: '10px 5px', border: '1px solid white' },
    
    // RESTAURAMOS LOS ESTILOS ORIGINALES
    celdaBase: { border: '1px solid white', padding: '10px 5px', fontWeight: 'bold', color: 'white', transition: 'all 0.2s' },
    celdaVerde: { backgroundColor: '#95B89F' },
    celdaVacia: { backgroundColor: '#EAEAEA', border: '1px solid white', padding: '10px 5px' },
    
    celdaSeleccionadaVista: { border: '2px solid var(--color-marron-oscuro)', transform: 'scale(1.05)' },

    tablaCard: {
      backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '20px',
      animation: 'aparecer 0.3s ease'
    },
    tablaTituloContenedor: { backgroundColor: '#C8A97E', padding: '10px', textAlign: 'center' },
    tablaTitulo: { fontFamily: 'var(--font-principal)', fontSize: '16px', color: 'var(--color-marron-oscuro)', margin: 0, fontWeight: 'bold' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '14px' },
    th: { backgroundColor: 'var(--color-marron-oscuro)', color: 'white', padding: '8px 5px', fontWeight: 'normal' },
    td: { padding: '10px 5px', color: '#333', borderBottom: '1px solid #eee' },

    botonesFlotantesContainer: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginBottom: '30px' },
    botonRedondo: {
      width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-marron-oscuro)',
      color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontSize: '30px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', transition: 'transform 0.2s ease'
    },
    botonRedondoActivo: { backgroundColor: '#C8A97E', transform: 'scale(1.1)' },
    
    overlayModal: {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', display: mostrarModal ? 'flex' : 'none',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    },
    cajaModal: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', width: '80%', maxWidth: '300px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
    inputModal: { width: '100%', padding: '10px', fontSize: '18px', textAlign: 'center', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px' },
    botonesModal: { display: 'flex', gap: '10px' },
    btnModal: { flex: 1, padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>Panel del profesor</h1>
          <span style={styles.volver} onClick={onVolver}>← Volver</span>
        </div>
        <img src={logoTaller} alt="Logo" style={styles.logo} />
      </header>

      <main style={styles.body}>
        <div style={styles.contenedorSelect}>
          <label style={styles.labelSelect}>Clase:</label>
          <select style={styles.selectBase} value={claseSeleccionada} onChange={(e) => { setClaseSeleccionada(e.target.value); setTurnoViendoDetalle(null); }}>
            <option value="ceramica">Taller de Cerámica</option>
            <option value="pintura">Taller de Pintura</option>
          </select>
        </div>

        <div style={styles.envoltorioCalendario}>
          <div style={styles.cartelEdicion}>MODO EDICIÓN</div>
          <table style={styles.calendarioContenedor}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-marron-oscuro)', color: 'white' }}>
                <th></th>{dias.map(dia => <th key={dia} style={{ padding: '10px 0' }}>{dia}</th>)}
              </tr>
            </thead>
            <tbody>
              {horas.map(hora => (
                <tr key={hora}>
                  <td style={styles.celdaHora}>{hora}</td>
                  {dias.map(dia => {
                    const idTurno = `${dia}-${hora}`;
                    const cupos = turnosActuales[idTurno]; 
                    const hayClase = cupos !== undefined;
                    const estaViendoDetalle = turnoViendoDetalle === idTurno;

                    // Lógica para devolver el estilo exacto:
                    let estiloAplicado;
                    if (hayClase) {
                      estiloAplicado = { ...styles.celdaBase, ...styles.celdaVerde, ...(estaViendoDetalle ? styles.celdaSeleccionadaVista : {}) };
                      estiloAplicado.cursor = 'pointer'; // Siempre clickeable si hay clase
                    } else {
                      estiloAplicado = { ...styles.celdaVacia };
                      estiloAplicado.cursor = modoEdicion ? 'pointer' : 'default'; // Solo clickeable si estamos editando
                    }

                    return (
                      <td 
                        key={idTurno} 
                        style={estiloAplicado}
                        onClick={() => {
                          if (hayClase || modoEdicion) manejarClicCelda(idTurno, hayClase);
                        }}
                      >
                        {hayClase ? cupos : ''}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABLA DE DETALLES */}
        {!modoEdicion && turnoViendoDetalle && (
          <div style={styles.tablaCard}>
            <div style={styles.tablaTituloContenedor}>
              <h2 style={styles.tablaTitulo}>Anotados para el {turnoViendoDetalle}</h2>
            </div>
            
            {alumnosInscritos[turnoViendoDetalle] ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Alumno</th>
                    <th style={styles.th}>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnosInscritos[turnoViendoDetalle].map(alumno => (
                    <tr key={alumno.id}>
                      <td style={styles.td}>{alumno.nombre}</td>
                      <td style={styles.td}>{alumno.telefono}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', padding: '15px', color: '#666', margin: 0 }}>
                Aún no hay alumnos anotados en este turno.
              </p>
            )}
          </div>
        )}

        <div style={{ position: 'relative', marginBottom: '30px', marginTop: '10px' }}>
          <div style={styles.botonesFlotantesContainer}>
            <button 
              style={{...styles.botonRedondo, ...(modoEdicion ? styles.botonRedondoActivo : {})}} 
              onClick={toggleEdicion}
            >
              ✎
            </button>
          </div>
          {modoEdicion && (
            <div style={{ position: 'absolute', right: '0', top: '70px', fontSize: '12px', color: '#666', textAlign: 'right', fontStyle: 'italic' }}>
              Tocá el lápiz nuevamente<br/>para salir y guardar.
            </div>
          )}
        </div>
      </main>

      {/* MODAL / POP-UP FLOTANTE */}
      <div style={styles.overlayModal}>
        <div style={styles.cajaModal}>
          <h3 style={{ marginTop: 0, color: 'var(--color-marron-oscuro)' }}>Turno: {celdaSeleccionada}</h3>
          <p style={{ fontSize: '14px', marginBottom: '15px' }}>Ingresá la cantidad de cupos disponibles:</p>
          <input type="number" style={styles.inputModal} value={inputCupos} onChange={(e) => setInputCupos(e.target.value)} placeholder="Ej: 4" autoFocus />
          <div style={styles.botonesModal}>
            <button style={{...styles.btnModal, backgroundColor: '#ddd', color: '#333'}} onClick={() => setMostrarModal(false)}>Cancelar</button>
            <button style={{...styles.btnModal, backgroundColor: 'var(--color-marron-oscuro)', color: 'white'}} onClick={guardarCupos}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfesorCupos;