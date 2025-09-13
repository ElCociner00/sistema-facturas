// Configuración de la aplicación
const CONFIG = {
    SHEET_URL: '/.netlify/functions/fetchSheet',
    
    usuariosAutorizados: {
        'admin': { password: 'admin123', rol: 'administrador' },
        'contabilidad': { password: 'contabilidad2024', rol: 'contador' },
        'gerente': { password: 'gerente123', rol: 'gerente' },
        'empleado': { password: 'password123', rol: 'empleado' }
    },
    
    ROLES: {
        ADMIN: 'administrador',
        CONTADOR: 'contador', 
        GERENTE: 'gerente',
        EMPLEADO: 'empleado'
    },
    
    ESTADOS: {
        PAGADA: 'pagada',
        PENDIENTE: 'pendiente',
        VENCIDA: 'vencida'
    }
};
