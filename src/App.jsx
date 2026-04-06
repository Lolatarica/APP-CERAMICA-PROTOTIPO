// src/App.jsx
import { useState } from 'react'
// Importamos todas las vistas que creamos
import AlumnoLogin from './views/AlumnoLogin'
import AlumnoAgendar from './views/AlumnoAgendar'
import AlumnoConfirmacion from './views/AlumnoConfirmacion'
import ProfesorDashboard from './views/ProfesorDashboard'
import ProfesorCupos from './views/ProfesorCupos'
import ProfesorClases from './views/ProfesorClases'
import ProfesorAlumnos from './views/ProfesorAlumnos' // La nueva vista de agenda
import ProfesorPagos from './views/ProfesorPagos'

function App() {
  // --- ESTADOS DE NAVEGACIÓN ---
  // Controla qué pantalla se ve: 'login', 'agendar', 'confirmacion', 'profesor', 'profesor-clases', 'profesor-cupos', 'profesor-alumnos'
  const [vistaActual, setVistaActual] = useState('login') // Controla qué pantalla se ve: 'login', 'agendar', 'confirmacion', 'profesor', 'profesor-clases', 'profesor-cupos', 'profesor-alumnos'
  
  // Guardan datos temporales para pasar entre pantallas
  const [claseParaVer, setClaseParaVer] = useState('ceramica') // Guardan datos temporales para pasar entre pantallas
  const [turnoElegido, setTurnoElegido] = useState('') // Guardan datos temporales para pasar entre pantallas

  // --- FUNCIONES PARA CAMBIAR DE PANTALLA ---
  const manejarConfirmacionAlumno = (turno) => {
    setTurnoElegido(turno);
    setVistaActual('confirmacion');
  };

  const manejarSeleccionClaseProfesor = (idClase) => {
    setClaseParaVer(idClase);
    setVistaActual('profesor-cupos');
  };

  return (
    <div>
      {/* 1. FLUJO DEL ALUMNO */}
      {vistaActual === 'login' && (
        <AlumnoLogin 
          onSiguiente={() => setVistaActual('agendar')} 
          onAccesoProfesor={() => setVistaActual('profesor')} 
        />
      )}

      {vistaActual === 'agendar' && (
        <AlumnoAgendar 
          onConfirmar={manejarConfirmacionAlumno} 
        />
      )}

      {vistaActual === 'confirmacion' && (
        <AlumnoConfirmacion 
          nombre="Lola" 
          turno={turnoElegido} 
          onVolverInicio={() => setVistaActual('login')} 
        />
      )}

      {/* 2. FLUJO DEL PROFESOR (DASHBOARD) */}
      {vistaActual === 'profesor' && (
        <ProfesorDashboard 
          onLogout={() => setVistaActual('login')} 
          onIrAClases={() => setVistaActual('profesor-clases')}
          onIrAAlumnos={() => setVistaActual('profesor-alumnos')}
          onIrACupos={() => setVistaActual('profesor-cupos')}
          onIrAPagos={() => setVistaActual('profesor-pagos')}
        />
      )}

      {/* 3. GESTIÓN DE CLASES (LISTADO) */}
      {vistaActual === 'profesor-clases' && (
        <ProfesorClases 
          onVolver={() => setVistaActual('profesor')} 
          onSeleccionarClase={manejarSeleccionClaseProfesor}
        />
      )}

      {/* 4. CALENDARIO DE LA CLASE (CUPOS Y ANOTADOS) */}
      {vistaActual === 'profesor-cupos' && (
        <ProfesorCupos 
          claseInicial={claseParaVer}
          onVolver={() => setVistaActual('profesor-clases')} 
        />
      )}

      {/* 5. AGENDA GENERAL DE ALUMNOS (FILTROS Y CONTACTOS) */}
      {vistaActual === 'profesor-alumnos' && (
        <ProfesorAlumnos 
          onVolver={() => setVistaActual('profesor')} 
        />
      )}

      {/* 6. CONTROL DE PAGOS */}
      {vistaActual === 'profesor-pagos' && (
        <ProfesorPagos
          onVolver={() => setVistaActual('profesor')}
        />
      )}
    </div>
  )
}

export default App