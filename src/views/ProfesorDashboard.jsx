// src/views/ProfesorDashboard.jsx
import React from 'react';
import logoTaller from '../assets/logo_taller.png'; 
import BotonPrincipal from '../components/BotonPrincipal';

function ProfesorDashboard({ onLogout, onIrACupos, onIrAClases, onIrAAlumnos }) {  const agendamientosRecientes = [
    { id: 1, alumno: 'María López', clase: 'Taller de cerámica', horario: 'Lun 10:00' },
    { id: 2, alumno: 'Juan Pérez', clase: 'Taller de cerámica', horario: 'Mar 16:00' },
    { id: 3, alumno: 'Ana Gómez', clase: 'Taller de pintura', horario: 'Mie 14:00' },
    { id: 4, alumno: 'Lucas Silva', clase: 'Taller de cerámica', horario: 'Jue 10:30' },
  ];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '480px',
      margin: '0 auto',
      backgroundColor: 'var(--color-crema)'
    },
    // El header ahora es flexbox para poner título a la izquierda y logo a la derecha
    header: {
      backgroundColor: 'var(--color-marron-oscuro)',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: '#E0C9A6',
      fontFamily: 'var(--font-titulo)',
      fontSize: '28px',
      margin: 0,
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'white',
      padding: '2px',
      objectFit: 'cover'
    },
    logout: {
      color: '#E0C9A6',
      fontSize: '12px',
      marginTop: '5px',
      cursor: 'pointer',
      textDecoration: 'underline'
    },
    body: {
      padding: '20px',
      flex: 1,
    },
    // Estilos de la tabla de agendamientos
    tablaCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden', // Para que los bordes redondeados corten la tabla
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    tablaTituloContenedor: {
      backgroundColor: '#C8A97E',
      padding: '15px',
      textAlign: 'center',
    },
    tablaTitulo: {
      fontFamily: 'var(--font-titulo)',
      fontSize: '24px',
      color: 'var(--color-marron-oscuro)',
      margin: 0
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'center',
      fontSize: '14px'
    },
    th: {
      backgroundColor: 'var(--color-marron-oscuro)',
      color: 'white',
      padding: '12px 5px',
      fontWeight: 'normal'
    },
    td: {
      padding: '12px 5px',
      color: '#333'
    },
    // Fila gris alternada
    trGris: {
      backgroundColor: '#EAEAEA'
    },
    botonesContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px' // Espacio entre botones
    }
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER DEL PROFESOR */}
      <header style={styles.header}>
        <h1 style={styles.title}>Panel del profesor</h1>
        <div style={styles.logoContainer}>
          <img src={logoTaller} alt="Logo" style={styles.logo} />
          <span style={styles.logout} onClick={onLogout}>
            Salir
          </span>
        </div>
      </header>

      <main style={styles.body}>
        
        {/* TABLA DE AGENDAMIENTOS */}
        <div style={styles.tablaCard}>
          <div style={styles.tablaTituloContenedor}>
            <h2 style={styles.tablaTitulo}>Agendamientos recientes</h2>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Alumnos</th>
                <th style={styles.th}>Clase</th>
                <th style={styles.th}>Horario</th>
              </tr>
            </thead>
            <tbody>
              {agendamientosRecientes.map((reserva, index) => (
                // Lógica para alternar colores: si el índice es impar, fila gris
                <tr key={reserva.id} style={index % 2 !== 0 ? styles.trGris : {}}>
                  <td style={styles.td}>{reserva.alumno}</td>
                  <td style={styles.td}>{reserva.clase}</td>
                  <td style={styles.td}>{reserva.horario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTONERA PRINCIPAL */}
        <div style={styles.botonesContainer}>
          <BotonPrincipal 
            text="Gestionar cupos" 
            onClick={onIrACupos} 
          />
          <BotonPrincipal 
         text="Gestionar clases" 
         onClick={onIrAClases} 
       />
          <BotonPrincipal 
            text="Alumnos" 
            onClick={onIrAAlumnos} // Conectar aquí
          />
        </div>

      </main>
    </div>
  );
}

export default ProfesorDashboard;