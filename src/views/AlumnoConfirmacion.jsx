// src/views/AlumnoConfirmacion.jsx
import React from 'react';
import logoTaller from '../assets/logo_taller.png'; 
import iconWhatsApp from '../assets/whatsapp.png';

function AlumnoConfirmacion({ nombre = "Nombre Apellido", turno = "Día - hora" }) {
  
  // Vamos a separar el string "LU-14:00" para que quede más lindo visualmente
  const [dia, hora] = turno ? turno.split('-') : ['Día', 'hora'];

  // Un pequeño diccionario para que "LU" diga "Lunes"
  const nombresDias = {
    'LU': 'Lunes', 'MA': 'Martes', 'MI': 'Miércoles', 
    'JU': 'Jueves', 'VI': 'Viernes', 'SA': 'Sábado'
  };
  const diaCompleto = nombresDias[dia] || dia;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '480px',
      margin: '0 auto',
      position: 'relative',
      backgroundColor: 'var(--color-crema)'
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
      padding: '40px 20px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    textoPrincipal: {
      fontSize: '22px',
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
      lineHeight: '1.4'
    },
    textoSecundario: {
      fontSize: '18px',
      textAlign: 'center',
      color: '#333',
      lineHeight: '1.5'
    },
    saludoCursiva: {
      fontFamily: 'var(--font-titulo)',
      fontSize: '40px',
      color: 'var(--color-marron-oscuro)',
      marginTop: '40px'
    },
    textoFooter: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#444',
      position: 'absolute',
      bottom: '30px',
      left: '20px',
      right: '90px', // Para no pisarse con el ícono de Wpp
      lineHeight: '1.3'
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
        <div style={styles.textoPrincipal}>
          <strong>{nombre}</strong><br />
          su clase ha sido agendada<br />
          correctamente!
        </div>

        <div style={styles.textoSecundario}>
          Sus clases seran cada:<br />
          <strong>{diaCompleto}</strong> del mes<br />
          a las <strong>{hora}</strong>.
        </div>

        <h2 style={styles.saludoCursiva}>Te esperamos!</h2>
      </main>

      <div style={styles.textoFooter}>
        Si crees que hubo un error comunicate con la profesora por WhatsApp
      </div>

      <img src={iconWhatsApp} alt="WhatsApp" style={styles.whatsapp} />
    </div>
  );
}

export default AlumnoConfirmacion;