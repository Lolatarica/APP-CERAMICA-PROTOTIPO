// src/views/AlumnoAgendar.jsx
import React, { useState } from 'react';
import logoTaller from '../assets/logo_taller.png'; 
import iconWhatsApp from '../assets/whatsapp.png';
import BotonPrincipal from '../components/BotonPrincipal';
import InputSimple from '../components/InputSimple';

function AlumnoAgendar({ onConfirmar }) {
  // 1. NUEVO ESTADO: Guarda qué taller se eligió (arranca vacío)
  const [tipoClase, setTipoClase] = useState(''); 
  
  const [esParaMi, setEsParaMi] = useState(true);
  const [nombreTercero, setNombreTercero] = useState('');
  const [slotSeleccionado, setSlotSeleccionado] = useState(null);

  const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  const horas = ['09:00', '10:30', '14:00', '16:00', '18:00'];

  // 2. NUEVA LÓGICA: Separamos los turnos según el taller
  const turnosPorClase = {
    ceramica: [
      'LU-09:00', 'MA-10:30', 'MA-16:00', 'MI-14:00', 'JU-10:30', 'JU-18:00', 'VI-09:00', 'VI-14:00'
    ],
    pintura: [
      'LU-14:00', 'LU-16:00', 'MI-09:00', 'MI-18:00', 'JU-14:00', 'VI-16:00', 'SA-10:30'
    ]
  };

  // Si no hay clase seleccionada, pasamos un array vacío. 
  // Si hay, buscamos la lista correspondiente en nuestro "diccionario".
  const turnosDisponibles = tipoClase === '' ? [] : turnosPorClase[tipoClase];

  // Función que se ejecuta cuando cambian el desplegable
  const manejarCambioClase = (e) => {
    setTipoClase(e.target.value);
    setSlotSeleccionado(null); // Borramos el turno seleccionado anterior por si cambian de taller
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '480px',
      margin: '0 auto',
      position: 'relative'
    },
    header: {
      backgroundColor: 'var(--color-marron-oscuro)',
      padding: '40px 20px 20px 20px',
      textAlign: 'center',
    },
    logo: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: 'white',
      padding: '5px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      objectFit: 'cover'
    },
    title: {
      color: '#E0C9A6',
      fontFamily: 'var(--font-titulo)', // <-- Nueva línea usando nuestra variable
      fontSize: '28px',
      margin: '2px 0 0 0',
    },
    body: {
      padding: '20px',
      flex: 1,
    },
    subtitulo: {
      fontSize: '20px',
      textAlign: 'center',
      marginBottom: '30px',
      fontWeight: '400',
      color: '#333'
    },
    
    // ESTILOS DEL NUEVO DESPLEGABLE
    contenedorSelect: {
      marginBottom: '25px',
    },
    labelSelect: {
      display: 'block',
      fontSize: '16px',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#333',
      textAlign: 'center'
    },
    selectBase: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      backgroundColor: 'var(--color-blanco)',
      fontSize: '16px',
      fontFamily: 'var(--font-principal)',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
      cursor: 'pointer'
    },

    filaOpciones: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '20px',
      fontSize: '16px',
      fontWeight: '700',
      color: '#333'
    },
    labelRadio: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    cuadradito: {
      width: '18px',
      height: '18px',
      border: '1px solid #777',
      display: 'inline-block'
    },
    textoAviso: {
      textAlign: 'center',
      fontSize: '14px',
      marginBottom: '10px',
      lineHeight: '1.4'
    },
    
    calendarioContenedor: {
      width: '100%',
      marginTop: '20px',
      borderCollapse: 'collapse',
      textAlign: 'center',
      fontSize: '14px',
      // 3. LÓGICA DE NUBLADO: Si tipoClase está vacío, aplicamos blur y bloqueamos los clics
      filter: tipoClase === '' ? 'blur(4px) grayscale(0.5)' : 'none',
      opacity: tipoClase === '' ? '0.6' : '1',
      pointerEvents: tipoClase === '' ? 'none' : 'auto',
      transition: 'all 0.4s ease' // Animación suave al desenfocar/enfocar
    },
    celdaHora: {
      backgroundColor: '#C8A97E',
      color: 'var(--color-marron-oscuro)',
      fontWeight: 'bold',
      padding: '10px 5px',
      border: '1px solid white'
    },
    celdaBase: {
      border: '1px solid white',
      padding: '10px 5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      color: 'white',
      transition: 'background-color 0.2s ease'
    },
    celdaVerde: {
      backgroundColor: '#95B89F', 
    },
    celdaMarrón: {
      backgroundColor: '#B59672', 
    },
    celdaVacia: {
      backgroundColor: '#EAEAEA',
      border: '1px solid white',
      padding: '10px 5px',
    },
    whatsapp: {
      position: 'fixed', 
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src={logoTaller} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Agenda tu clase!</h1>
      </header>

      <main style={styles.body}>
        <h2 style={styles.subtitulo}>¡Bienvenido, Nombre apellido!</h2>

        {/* NUEVO DESPLEGABLE PARA ELEGIR TALLER */}
        <div style={styles.contenedorSelect}>
          <label style={styles.labelSelect}>¿Qué taller querés cursar?</label>
          <select 
            style={styles.selectBase} 
            value={tipoClase} 
            onChange={manejarCambioClase}
          >
            <option value="" disabled>Seleccioná un taller...</option>
            <option value="ceramica">Taller de Cerámica</option>
            <option value="pintura">Taller de Pintura</option>
          </select>
        </div>

        <div style={styles.filaOpciones}>
          <span>¿La clase es para usted?</span>
          <label style={styles.labelRadio} onClick={() => setEsParaMi(true)}>
            Sí: <div style={{...styles.cuadradito, backgroundColor: esParaMi ? 'var(--color-marron-oscuro)' : 'transparent'}}></div>
          </label>
          <label style={styles.labelRadio} onClick={() => setEsParaMi(false)}>
            No: <div style={{...styles.cuadradito, backgroundColor: !esParaMi ? 'var(--color-marron-oscuro)' : 'transparent'}}></div>
          </label>
        </div>

        {!esParaMi && (
          <div style={{ marginBottom: '20px' }}>
            <p style={styles.textoAviso}>Ingrese el nombre y apellido de<br/>quien se presentará a la clase:</p>
            <InputSimple 
              placeholder="Nombre Apellido" 
              value={nombreTercero}
              onChange={(e) => setNombreTercero(e.target.value)}
            />
          </div>
        )}

        {/* El contenedor del calendario ahora tiene la lógica del blur */}
        <div style={{ position: 'relative' }}>
          
          {/* Mensaje por encima del calendario si está nublado */}
          {tipoClase === '' && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              color: 'var(--color-marron-oscuro)',
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '10px 20px',
              borderRadius: '8px'
            }}>
              Elegí un taller para ver los horarios
            </div>
          )}

          <table style={styles.calendarioContenedor}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-marron-oscuro)', color: 'white' }}>
                <th></th>
                {dias.map(dia => (
                  <th key={dia} style={{ padding: '10px 0' }}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horas.map(hora => (
                <tr key={hora}>
                  <td style={styles.celdaHora}>{hora}</td>
                  {dias.map(dia => {
                    const idTurno = `${dia}-${hora}`;
                    const hayClase = turnosDisponibles.includes(idTurno);
                    const estaSeleccionado = slotSeleccionado === idTurno;

                    if (!hayClase) {
                      return <td key={idTurno} style={styles.celdaVacia}></td>;
                    }

                    return (
                      <td 
                        key={idTurno}
                        style={{
                          ...styles.celdaBase,
                          ...(estaSeleccionado ? styles.celdaMarrón : styles.celdaVerde)
                        }}
                        onClick={() => setSlotSeleccionado(idTurno)}
                      >
                        4
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BotonPrincipal 
       text="Agendar" 
       onClick={() => {
         if (tipoClase === '') {
           alert('Primero tenés que elegir un taller.');
         } else if (!slotSeleccionado) {
           alert('Por favor, seleccioná un horario en el calendario.');
         } else {
           // Llamamos a la función que nos pasa App.jsx
           onConfirmar(slotSeleccionado);
         }
       }} 
     />
      </main>

      <img src={iconWhatsApp} alt="WhatsApp" style={styles.whatsapp} />
    </div>
  );
}

export default AlumnoAgendar;