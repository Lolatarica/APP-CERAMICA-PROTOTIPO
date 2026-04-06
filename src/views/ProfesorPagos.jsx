// src/views/ProfesorPagos.jsx
import React, { useState } from 'react';
import logoTaller from '../assets/logo_taller.png';

function ProfesorPagos({ onVolver }) {
  // Simulamos la base de datos de pagos
  const [pagos, setPagos] = useState([
    { id: 1, nombre: 'María López', clase: 'ceramica', estado: 'pagado' },
    { id: 2, nombre: 'Juan Pérez', clase: 'ceramica', estado: 'pendiente' },
    { id: 3, nombre: 'Ana Gómez', clase: 'pintura', estado: 'esperandoComprobante' },
    { id: 4, nombre: 'Lucas Silva', clase: 'ceramica', estado: 'pagado' },
    { id: 5, nombre: 'Carla Ruiz', clase: 'pintura', estado: 'pendiente' },
  ]);

  // ESTADOS PARA FILTROS
  const [busqueda, setBusqueda] = useState('');
  const [filtroClase, setFiltroClase] = useState('todas');
  const [filtroMes, setFiltroMes] = useState('Abril 2026');
  const [verSoloPendientes, setVerSoloPendientes] = useState(false);

  // Función para cambiar el estado del pago
  const cambiarEstadoPago = (id, nuevoEstado) => {
    setPagos(pagos.map(pago => 
      pago.id === id ? { ...pago, estado: nuevoEstado } : pago
    ));
  };

  // LÓGICA DE FILTRADO COMBINADA
  const alumnosFiltrados = pagos.filter(pago => {
    const coincideNombre = pago.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideClase = filtroClase === 'todas' || pago.clase === filtroClase;
    const esPendiente = pago.estado === 'pendiente' || pago.estado === 'esperandoComprobante';
    const coincideEstado = verSoloPendientes ? esPendiente : true;

    return coincideNombre && coincideClase && coincideEstado;
  });

  const styles = {
    container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '480px', margin: '0 auto', backgroundColor: 'var(--color-crema)' },
    header: { backgroundColor: 'var(--color-marron-oscuro)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { color: '#E0C9A6', fontFamily: 'var(--font-titulo)', fontSize: '24px', margin: 0 },
    volver: { color: '#E0C9A6', fontSize: '14px', marginTop: '5px', cursor: 'pointer', textDecoration: 'underline' },
    logo: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', padding: '2px', objectFit: 'cover' },
    body: { padding: '20px', flex: 1 },
    
    // SECCIÓN DE FILTROS (Igual a la de Alumnos)
    seccionFiltros: { marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    inputBusqueda: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' },
    filaSelects: { display: 'flex', gap: '10px' },
    selectFiltro: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: 'white', fontSize: '14px' },
    btnPendientes: { padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', transition: 'all 0.2s' },

    tarjetaPago: { backgroundColor: 'white', padding: '15px', borderRadius: '12px', marginBottom: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '5px' },
    infoAlumno: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    nombre: { fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#333' },
    claseTxt: { fontSize: '12px', color: '#666', margin: 0, textTransform: 'capitalize' },
    
    botonesContenedor: { display: 'flex', gap: '10px', marginTop: '10px' },
    botonAccion: { flex: 1, padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' },
    botonComprobanteInicial: { width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #C62828', backgroundColor: 'white', color: '#C62828', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Control de Pagos</h2>

        {/* --- NUEVOS FILTROS --- */}
        <section style={styles.seccionFiltros}>
          <input 
            style={styles.inputBusqueda} 
            placeholder="Buscar alumno por nombre..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <div style={styles.filaSelects}>
            <select style={styles.selectFiltro} value={filtroMes} onChange={(e) => setFiltroMes(e.target.value)}>
              <option value="Abril 2026">Abril 2026</option>
              <option value="Mayo 2026">Mayo 2026</option>
            </select>
            <select style={styles.selectFiltro} value={filtroClase} onChange={(e) => setFiltroClase(e.target.value)}>
              <option value="todas">Todas las clases</option>
              <option value="ceramica">Cerámica</option>
              <option value="pintura">Pintura</option>
            </select>
          </div>
          <button 
            style={{ 
              ...styles.btnPendientes, 
              backgroundColor: verSoloPendientes ? '#A95C5C' : '#EAEAEA', 
              color: verSoloPendientes ? 'white' : '#666' 
            }}
            onClick={() => setVerSoloPendientes(!verSoloPendientes)}
          >
            {verSoloPendientes ? '⚠️ Viendo solo deudores' : 'Ver todos los estados'}
          </button>
        </section>

        {/* --- LISTADO FILTRADO --- */}
        <div>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
            Resultados: {alumnosFiltrados.length} alumnos
          </p>

          {alumnosFiltrados.map(pago => {
            const esPagado = pago.estado === 'pagado';
            const esEsperandoComprobante = pago.estado === 'esperandoComprobante';
            
            let borderColor = esPagado ? '#95B89F' : '#A95C5C';
            if (esEsperandoComprobante) borderColor = '#FFB300';

            return (
              <div key={pago.id} style={{ ...styles.tarjetaPago, borderLeft: `5px solid ${borderColor}` }}>
                <div style={styles.infoAlumno}>
                  <div>
                    <h3 style={styles.nombre}>{pago.nombre}</h3>
                    <p style={styles.claseTxt}>{pago.clase}</p>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', 
                    backgroundColor: esPagado ? '#E8F5E9' : (esEsperandoComprobante ? '#FFF8E1' : '#FFEBEE'), 
                    color: esPagado ? '#2E7D32' : (esEsperandoComprobante ? '#F57F17' : '#C62828') 
                  }}>
                    {esPagado ? 'AL DÍA' : (esEsperandoComprobante ? 'REVISAR' : 'DEBE')}
                  </span>
                </div>

                {esEsperandoComprobante ? (
                  <button 
                    style={styles.botonComprobanteInicial}
                    onClick={() => cambiarEstadoPago(pago.id, 'pendiente')}
                  >
                    🔍 Comprobante Inicial
                  </button>
                ) : (
                  <div style={styles.botonesContenedor}>
                    <button 
                      style={{ ...styles.botonAccion, backgroundColor: esPagado ? '#95B89F' : '#f0f0f0', color: esPagado ? 'white' : '#999' }}
                      onClick={() => cambiarEstadoPago(pago.id, 'pagado')}
                    >
                      ✅ Pagó
                    </button>
                    <button 
                      style={{ ...styles.botonAccion, backgroundColor: !esPagado ? '#A95C5C' : '#f0f0f0', color: !esPagado ? 'white' : '#999' }}
                      onClick={() => cambiarEstadoPago(pago.id, 'pendiente')}
                    >
                      ⏳ Deuda
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {alumnosFiltrados.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '30px', color: '#999' }}>
              No se encontraron coincidencias.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfesorPagos;