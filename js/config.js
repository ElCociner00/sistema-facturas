// Configuración de la aplicación
const CONFIG = {
    SHEET_URL: '/.netlify/functions/fetchSheet',
    
    usuariosAutorizados: {
        'admin': 'admin123',
        'contabilidad': 'contabilidad2024', 
        'gerente': 'gerente123',
        'empleado': 'password123'
    },
    
    // Estados posibles de las facturas
    ESTADOS: {
        PAGADA: 'pagada',
        PENDIENTE: 'pendiente',
        VENCIDA: 'vencida'
    }
};
