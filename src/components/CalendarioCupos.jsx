import React from 'react';

function CalendarioCupos({
  clase,
  turnosPorClase,
  turnosActuales,
  dias = [],
  horas = [],
  selectedDia,
  selectedHora,
  modoEdicion,
  turnoViendoDetalle,
  onSelectTurno,
  onCellClick
}) {
  const turnos =
    turnosActuales ??
    (turnosPorClase && clase ? turnosPorClase[clase] : {}) ??
    {};

  return (
    <table style={styles.calendarioContenedor}>
      <thead>
        <tr style={styles.headerRow}>
          <th style={{ ...styles.thHeader, ...styles.colHoraHeader }}></th>
          {dias.map((dia) => (
            <th key={dia} style={styles.thHeader}>{dia}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {horas.map((hora) => (
          <tr key={hora}>
            <td style={styles.celdaHora}>{hora}</td>
            {dias.map((dia) => {
              const idTurno = `${dia}-${hora}`;
              const cupos = turnos[idTurno];
              const hayClase = cupos !== undefined;
              const seleccionado =
                (selectedDia === dia && selectedHora === hora) ||
                (turnoViendoDetalle === idTurno);

              const estiloCelda = hayClase
                ? {
                    ...styles.celdaBase,
                    ...styles.celdaDisponible,
                    ...(seleccionado ? styles.celdaSeleccionadaVista : {})
                  }
                : { ...styles.celdaBase, ...styles.celdaVacia };

              return (
                <td
                  key={idTurno}
                  style={estiloCelda}
                  onClick={() => {
                    if (onCellClick) {
                      if (hayClase || modoEdicion) onCellClick(idTurno, hayClase);
                    } else if (onSelectTurno) {
                      if (hayClase) onSelectTurno(dia, hora);
                    }
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
  );
}

const styles = {
  calendarioContenedor: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed', // fuerza columnas iguales
    textAlign: 'center',
    fontSize: '14px'
  },
  headerRow: {
    backgroundColor: 'var(--color-marron-oscuro)',
    color: 'white'
  },
  thHeader: {
    height: '42px',
    padding: 0,
    fontWeight: 'bold'
  },
  colHoraHeader: {
    width: '76px'
  },
  celdaHora: {
    width: '76px',
    height: '46px',
    backgroundColor: '#C8A97E',
    color: 'var(--color-marron-oscuro)',
    fontWeight: 'bold',
    padding: 0,
    border: '1px solid white'
  },
  celdaBase: {
    height: '46px',
    padding: 0,
    border: '1px solid white',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease, color 0.2s ease'
  },
  // Cupos disponibles: blanco (no verde)
  celdaDisponible: {
    backgroundColor: '#EAEAEA', // con cupos, no seleccionados: gris
    color: '#7A7A7A',           // número gris
    cursor: 'pointer'
  },
  // Sin clase definida: gris claro
  celdaVacia: {
    backgroundColor: '#FFFFFF', // sin cupo: blanco
    color: '#FFFFFF',
    cursor: 'default'
  },
  // Seleccionada: verde, sin borde extra
  celdaSeleccionadaVista: {
    backgroundColor: '#95B89F', // seleccionada: verde
    color: 'white'
  }
};

export default CalendarioCupos;