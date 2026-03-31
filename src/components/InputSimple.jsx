// src/components/InputSimple.jsx
import React from 'react';

// Recibe la etiqueta (label), el tipo (text, email), el placeholder 
// y el valor actual con su función de cambio
function InputSimple({ label, type = 'text', placeholder, value, onChange }) {
  // Estilos rápidos para el input (luego los podemos pasar a CSS)
  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: 'var(--color-blanco)',
    fontSize: '16px',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)', // Sombrita sutil
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#333'
  };

  const normalizedLabel = label?.replace(/:\s*$/, '');

  return (
    <div>
      <label style={labelStyle}>{normalizedLabel}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
}

export default InputSimple;