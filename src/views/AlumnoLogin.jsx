// src/views/AlumnoLogin.jsx
import React, { useState } from 'react';
// Importamos los assets (asegurate de tener las imágenes ahí)
import logoTaller from '../assets/logo_taller.png'; 
import iconWhatsApp from '../assets/whatsapp.png';

// Importamos nuestros componentes reutilizables
import InputSimple from '../components/InputSimple';
import BotonPrincipal from '../components/BotonPrincipal';

function AlumnoLogin({ onSiguiente, onAccesoProfesor }) {
  // Estado para guardar los datos del formulario (luego los usaremos)
  const [nombre, setNombre] = useState('');
  const [mail, setMail] = useState('');
  const [numero, setNumero] = useState(''); // El número lo simplificamos por ahora

  // Estilos específicos para esta pantalla
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '480px', // Limitar ancho para que parezca celular en PC
      margin: '0 auto',  
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
      backgroundColor: 'white', // Fondo blanco circular si la imagen no lo tiene
      padding: '5px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      objectFit: 'cover' // Ajusta la imagen dentro del círculo
    },
    title: {
      color: '#E0C9A6',
      fontFamily: 'var(--font-titulo)', // <-- Nueva línea usando nuestra variable
      fontSize: '28px',
      margin: '2px 0 0 0',
    },
    bodyForm: {
      padding: '30px',
      flex: 1, // Ocupa el espacio restante
    },
    aviso: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#666',
      margin: '30px 0',
      lineHeight: '1.4'
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
      
      {/* HEADER: Marrón, Logo, Título */}
      <header style={styles.header}>
        <img src={logoTaller} alt="Logo El taller de enfrente" style={styles.logo} />
        <h1 style={styles.title}>Agenda tu clase!</h1>
      </header>

      {/* CUERPO: Formulario y Botón */}
      <main style={styles.bodyForm}>
        {/* Usamos el componente reutilizable InputSimple */}
        <InputSimple 
          label="Nombre" 
          placeholder="Nombre Apellido" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        
        {/* Input de Número (simplificado, no tiene el dropdown "+54" aún) */}
        <InputSimple 
          label="Número" 
          placeholder="99 9999 9999" 
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        
        <InputSimple 
          label="Mail" 
          type="email"
          placeholder="mail@gmail.com" 
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <p style={styles.aviso}>
          Si usted ya se agendo una vez no es necesario agendarse todas las semanas.
        </p>

        {/* Usamos el componente reutilizable BotonPrincipal */}
        <BotonPrincipal 
          text="Siguiente" 
          onClick={onSiguiente} 
        />
        <p 
          style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={onAccesoProfesor}
        >
          Acceso Profesor
        </p>
      </main>
      {/* Ícono de WhatsApp Flotante */}
      <img src={iconWhatsApp} alt="WhatsApp" style={styles.whatsapp} />


    </div>
    
    
  );
}

export default AlumnoLogin;