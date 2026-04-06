// src/views/ProfesorAlumnos.jsx
import React, { useState } from 'react';
import logoTaller from '../assets/logo_taller.png';
import CalendarioCupos from '../components/CalendarioCupos';

function ProfesorAlumnos({ onVolver }) {
  const [alumnos, setAlumnos] = useState([
    { id: 1, nombre: 'María López', tel: '+54 11 2233 4455', mail: 'maria@gmail.com', clase: 'ceramica', dia: 'LU', hora: '09:00', antiguedad: 'Nueva' },
    { id: 2, nombre: 'Juan Pérez', tel: '+54 11 9988 7766', mail: 'juan_p@hotmail.com', clase: 'ceramica', dia: 'MA', hora: '10:30', antiguedad: 'Viejo' },
    { id: 3, nombre: 'Ana Gómez', tel: '+54 11 5566 7788', mail: 'anita@live.com', clase: 'pintura', dia: 'MI', hora: '14:00', antiguedad: 'Viejo' },
    { id: 4, nombre: 'Lucas Silva', tel: '+54 11 4455 6677', mail: 'lucas@gmail.com', clase: 'ceramica', dia: 'JU', hora: '10:30', antiguedad: 'Nueva' },
    { id: 5, nombre: 'Carla Ruiz', tel: '+54 11 1122 3344', mail: 'cruiz@yahoo.com', clase: 'pintura', dia: 'VI', hora: '16:00', antiguedad: 'Nueva' }
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [filtroClase, setFiltroClase] = useState('todas');
  const [filtroDia, setFiltroDia] = useState('todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [formData, setFormData] = useState({ clase: 'ceramica', dia: 'LU', hora: '09:00' });

  const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  const horas = ['09:00', '10:30', '14:00', '16:00', '18:00'];

  const turnosPorClase = {
    ceramica: { 'LU-09:00': 4, 'MA-10:30': 4, 'MA-16:00': 4, 'MI-14:00': 4, 'JU-10:30': 4, 'JU-18:00': 4, 'VI-09:00': 4, 'VI-14:00': 4 },
    pintura: { 'LU-14:00': 4, 'LU-16:00': 4, 'MI-09:00': 4, 'MI-18:00': 4, 'JU-14:00': 4, 'VI-16:00': 4, 'SA-10:30': 4 }
  };

  const alumnosFiltrados = alumnos.filter((alumno) => {
    const coincideNombre = alumno.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideClase = filtroClase === 'todas' || alumno.clase === filtroClase;
    const coincideDia = filtroDia === 'todos' || alumno.dia === filtroDia;
    return coincideNombre && coincideClase && coincideDia;
  });

  const handleEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setFormData({ ...alumno });
    setMostrarModal(true);
  };

  const handleSelectTurno = (dia, hora) => {
    setFormData(prev => ({ ...prev, dia, hora }));
  };

  const handleActualizarAlumno = () => {
    if (!formData.nombre?.trim() || !formData.tel?.trim() || !formData.mail?.trim()) {
      alert('Completá nombre, teléfono y email');
      return;
    }
    setAlumnos(alumnos.map((a) => (a.id === alumnoEditando.id ? { ...a, ...formData } : a)));
    setMostrarModal(false);
    setAlumnoEditando(null);
  };

  const handleEliminarAlumno = () => {
    if (!alumnoEditando) return;
    if (window.confirm(`¿Estás seguro que querés eliminar a ${alumnoEditando.nombre}?`)) {
      setAlumnos(alumnos.filter((a) => a.id !== alumnoEditando.id));
      setMostrarModal(false);
      setAlumnoEditando(null);
    }
  };

  const handleChangeForm = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const styles = {
    container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-crema)', position: 'relative' },
    header: { backgroundColor: 'var(--color-marron-oscuro)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { color: '#E0C9A6', fontFamily: 'var(--font-titulo)', fontSize: '24px', margin: 0 },
    volver: { color: '#E0C9A6', fontSize: '14px', marginTop: '5px', cursor: 'pointer', textDecoration: 'underline' },
    logo: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', padding: '2px', objectFit: 'cover' },
    body: { padding: '20px', flex: 1 },
    seccionFiltros: { marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    inputBusqueda: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' },
    filaSelects: { display: 'flex', gap: '10px' },
    selectFiltro: { flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ddd', backgroundColor: 'white', fontSize: '16px' },
    tarjetaAlumno: {
      backgroundColor: 'white', padding: '20px', borderRadius: '18px', marginBottom: '18px',
      boxShadow: '0 12px 30px rgba(0,0,0,0.08)', position: 'relative', borderLeft: '6px solid var(--color-marron-oscuro)'
    },
    nombre: { fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: '#333' },
    dato: { fontSize: '14px', margin: '4px 0', color: '#555' },
    claseBadge: { display: 'inline-block', marginTop: '10px', padding: '6px 12px', borderRadius: '999px', backgroundColor: '#C8A97E', color: 'white', fontSize: '12px', fontWeight: '700' },
    botonesTarjeta: { display: 'flex', flexDirection: 'column', gap: '10px', position: 'absolute', right: '15px', top: '15px', width: '56px' },
    botonEditar: {
      width: '56px',
      height: '56px',
      padding: '0',
      backgroundColor: '#C8A97E',
      color: 'white',
      border: 'none',
      borderRadius: '18px',
      cursor: 'pointer',
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '1',
      boxShadow: '0 16px 32px rgba(0,0,0,0.14)',
      display: 'grid',
      placeItems: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    botonPagos: {
      width: '56px',
      height: '56px',
      padding: '0',
      backgroundColor: '#8B7355',
      color: 'white',
      border: 'none',
      borderRadius: '18px',
      cursor: 'pointer',
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '1',
      boxShadow: '0 16px 32px rgba(0,0,0,0.14)',
      display: 'grid',
      placeItems: 'center',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: mostrarModal ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '24px',
      width: '95%',
      maxWidth: '520px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 24px 50px rgba(0,0,0,0.15)'
    },
    inputForm: {
      width: '100%',
      padding: '14px',
      marginBottom: '16px',
      borderRadius: '14px',
      border: '1px solid #ddd',
      fontSize: '16px',
      boxSizing: 'border-box'
    },
    selectForm: {
      width: '100%',
      padding: '14px',
      marginBottom: '16px',
      borderRadius: '14px',
      border: '1px solid #ddd',
      fontSize: '16px',
      backgroundColor: 'white',
      boxSizing: 'border-box'
    },
    labelForm: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '700',
      color: '#333',
      marginBottom: '8px'
    },
    botonesModal: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px'
    },
    btnCancelar: {
      flex: 1,
      padding: '14px',
      borderRadius: '14px',
      border: 'none',
      backgroundColor: '#F7F5F0',
      color: '#333',
      cursor: 'pointer',
      fontWeight: '700',
      boxShadow: '0 16px 30px rgba(0,0,0,0.12)'
    },
    btnGuardar: {
      flex: 1,
      padding: '14px',
      borderRadius: '14px',
      border: 'none',
      backgroundColor: 'var(--color-marron-oscuro)',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '700',
      boxShadow: '0 16px 30px rgba(0,0,0,0.18)'
    },
    btnEliminar: {
      width: '100%',
      padding: '14px',
      marginTop: '14px',
      borderRadius: '14px',
      border: 'none',
      backgroundColor: '#d9534f',
      color: 'white',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 16px 30px rgba(217, 83, 79, 0.2)'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Panel del profesor</h1>
          <span style={styles.volver} onClick={onVolver}>← Volver al Dashboard</span>
        </div>
        <img src={logoTaller} alt="Logo" style={styles.logo} />
      </header>

      <main style={styles.body}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Agenda de Alumnos</h2>

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
              <option value="LU">Lunes</option>
              <option value="MA">Martes</option>
              <option value="MI">Miércoles</option>
              <option value="JU">Jueves</option>
              <option value="VI">Viernes</option>
              <option value="SA">Sábado</option>
            </select>
          </div>
        </section>

        <div style={{ paddingBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
            Mostrando {alumnosFiltrados.length} alumnos
          </p>

          {alumnosFiltrados.map((alumno) => (
            <div key={alumno.id} style={styles.tarjetaAlumno}>
              <h3 style={styles.nombre}>{alumno.nombre}</h3>
              <p style={styles.dato}>📱 {alumno.tel}</p>
              <p style={styles.dato}>✉️ {alumno.mail}</p>
              <div style={styles.claseBadge}>
                {alumno.clase.toUpperCase()} | {alumno.dia} {alumno.hora}
              </div>
              <div style={styles.botonesTarjeta}>
                <button
                  type="button"
                  style={styles.botonEditar}
                  title="Editar"
                  onClick={(e) => { e.stopPropagation(); handleEditar(alumno); }}
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}

          {alumnosFiltrados.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '50px', color: '#999' }}>No se encontraron alumnos con esos filtros.</p>
          )}
        </div>
      </main>

      {mostrarModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{ color: 'var(--color-marron-oscuro)', marginBottom: '18px' }}>Editar Alumno</h3>

            <label style={styles.labelForm}>Nombre</label>
            <input
              style={styles.inputForm}
              type="text"
              value={formData.nombre || ''}
              onChange={(e) => handleChangeForm('nombre', e.target.value)}
            />

            <label style={styles.labelForm}>Teléfono</label>
            <input
              style={styles.inputForm}
              type="text"
              value={formData.tel || ''}
              onChange={(e) => handleChangeForm('tel', e.target.value)}
            />

            <label style={styles.labelForm}>Email</label>
            <input
              style={styles.inputForm}
              type="email"
              value={formData.mail || ''}
              onChange={(e) => handleChangeForm('mail', e.target.value)}
            />

            <label style={styles.labelForm}>Clase</label>
            <select
              style={styles.selectForm}
              value={formData.clase || 'ceramica'}
              onChange={(e) => handleChangeForm('clase', e.target.value)}
            >
              <option value="ceramica">Cerámica</option>
              <option value="pintura">Pintura</option>
            </select>

            <label style={styles.labelForm}>Calendario de cupos</label>
            <CalendarioCupos
              clase={formData.clase || 'ceramica'}
              dias={dias}
              horas={horas}
              turnosPorClase={turnosPorClase}
              selectedDia={formData.dia}
              selectedHora={formData.hora}
              onSelectTurno={handleSelectTurno}
            />

            <div style={styles.botonesModal}>
              <button type="button" style={styles.btnCancelar} onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button type="button" style={styles.btnGuardar} onClick={handleActualizarAlumno}>Guardar Cambios</button>
            </div>

            <button type="button" style={styles.btnEliminar} onClick={handleEliminarAlumno}>🗑️ Eliminar Alumno</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfesorAlumnos;