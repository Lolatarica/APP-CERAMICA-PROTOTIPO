// src/views/ProfesorAlumnos.jsx
import React, { useState } from 'react';
import logoTaller from '../assets/logo_taller.png';

function ProfesorAlumnos({ onVolver }) {
  // Simulamos una base de datos completa de alumnos
  const [alumnos] = useState([
    { id: 1, nombre: 'María López', tel: '+54 11 2233 4455', mail: 'maria@gmail.com', clase: 'ceramica', dia: 'LU', hora: '09:00', antiguedad: 'Nueva' },
    { id: 2, nombre: 'Juan Pérez', tel: '+54 11 9988 7766', mail: 'juan_p@hotmail.com', clase: 'ceramica', dia: 'MA', hora: '10:30', antiguedad: 'Viejo' },
    { id: 3, nombre: 'Ana Gómez', tel: '+54 11 5566 7788', mail: 'anita@live.com', clase: 'pintura', dia: 'MI', hora: '14:00', antiguedad: 'Viejo' },
    { id: 4, nombre: 'Lucas Silva', tel: '+54 11 4455 6677', mail: 'lucas@gmail.com', clase: 'ceramica', dia: 'JU', hora: '10:30', antiguedad: 'Nueva' },
    { id: 5, nombre: 'Carla Ruiz', tel: '+54 11 1122 3344', mail: 'cruiz@yahoo.com', clase: 'pintura', dia: 'VI', hora: '16:00', antiguedad: 'Nueva' },
  ]);

  // Estados para los filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroClase, setFiltroClase] = useState('todas');
  const [filtroDia, setFiltroDia] = useState('todos');

  // Lógica de filtrado en tiempo real
  const alumnosFiltrados = alumnos.filter(alumno => {
    const coincideNombre = alumno.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideClase = filtroClase === 'todas' || alumno.clase === filtroClase;
    const coincideDia = filtroDia === 'todos' || alumno.dia === filtroDia;
    return coincideNombre && coincideClase && coincideDia;
  });

  const styles = {
    container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-crema)' },
    header: { backgroundColor: 'var(--color-marron-oscuro)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { color: '#E0C9A6', fontFamily: 'var(--font-titulo)', fontSize: '24px', margin: 0 },
    volver: { color: '#E0C9A6', fontSize: '14px', marginTop: '5px', cursor: 'pointer', textDecoration: 'underline' },
    logo: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', padding: '2px', objectFit: 'cover' },
    body: { padding: '20px', flex: 1 },
    
    // Filtros
    seccionFiltros: { marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    inputBusqueda: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' },
    filaSelects: { display: 'flex', gap: '10px' },
    selectFiltro: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: 'white' },
    
    // Lista
    tarjetaAlumno: { 
      backgroundColor: 'white', padding: '15px', borderRadius: '12px', marginBottom: '15px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative', borderLeft: '5px solid var(--color-marron-oscuro)' 
    },
    tagAntiguedad: { position: 'absolute', top: '15px', right: '15px', fontSize: '10px', padding: '3px 8px', borderRadius: '10px', backgroundColor: '#eee', color: '#666' },
    nombre: { fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#333' },
    dato: { fontSize: '13px', margin: '2px 0', color: '#555' },
    claseBadge: { display: 'inline-block', marginTop: '8px', padding: '4px 10px', borderRadius: '5px', backgroundColor: '#C8A97E', color: 'white', fontSize: '12px', fontWeight: 'bold' }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={styles.title}>Panel del profesor</h1>
          <span style={styles.volver} onClick={onVolver}>← Volver al Dashboard</span>
        </div>
        <img src={logoTaller} alt="Logo" style={styles.logo} />
      </header>

      <main style={styles.body}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Agenda de Alumnos</h2>

        {/* BUSCADOR Y FILTROS */}
        <section style={styles.seccionFiltros}>
          <input 
            style={styles.inputBusqueda} 
            placeholder="Buscar por nombre..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div style={styles.filaSelects}>
            <select style={styles.selectFiltro} value={filtroClase} onChange={(e) => setFiltroClase(e.target.value)}>
              <option value="todas">Todas las clases</option>
              <option value="ceramica">Cerámica</option>
              <option value="pintura">Pintura</option>
            </select>
            <select style={styles.selectFiltro} value={filtroDia} onChange={(e) => setFiltroDia(e.target.value)}>
              <option value="todos">Todos los días</option>
              <option value="LU">Lunes</option><option value="MA">Martes</option><option value="MI">Miércoles</option>
              <option value="JU">Jueves</option><option value="VI">Viernes</option><option value="SA">Sábado</option>
            </select>
          </div>
        </section>

        {/* RESULTADOS */}
        <div style={{ paddingBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
            Mostrando {alumnosFiltrados.length} alumnos
          </p>
          
          {alumnosFiltrados.map(alumno => (
            <div key={alumno.id} style={styles.tarjetaAlumno}>
              <h3 style={styles.nombre}>{alumno.nombre}</h3>
              <p style={styles.dato}> {alumno.tel}</p>
              <p style={styles.dato}> {alumno.mail}</p>
              <div style={styles.claseBadge}>
                {alumno.clase.toUpperCase()} | {alumno.dia} {alumno.hora}
              </div>
            </div>
          ))}

          {alumnosFiltrados.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '50px', color: '#999' }}>No se encontraron alumnos con esos filtros.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfesorAlumnos;