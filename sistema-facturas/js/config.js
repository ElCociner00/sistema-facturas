const CONFIG = {
    // PROXY 100% FUNCIONAL - Sin funciones serverless
    SHEET_URL: 'https://corsproxy.io/?' + encodeURIComponent('https://docs.google.com/spreadsheets/d/e/2PACX-1vRBrazhlZ91OI-rcjqCCefnYmrOKm-pnqVqTGYhl1r_VnjS3u1PzdhnMT2GEKo0QPMXxXY84hcb_Eno/pub?output=csv'),
    
    usuariosAutorizados: {
        'admin': 'admin123',
        'contabilidad': 'contabilidad2024', 
        'gerente': 'gerente123',
        'empleado': 'password123'
    },
    
    ESTADOS: {
        PAGADA: 'pagada',
        PENDIENTE: 'pendiente',
        VENCIDA: 'vencida'
    }
};