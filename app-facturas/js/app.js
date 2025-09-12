// Aplicación principal - Punto de entrada

// Función para cargar y agrupar facturas
async function cargarFacturas() {
    // Solo cargar si está autenticado
    if (!localStorage.getItem('usuarioLogueado')) return;
    
    actualizarEstado('loading', 'Cargando y agrupando facturas...');
    
    try {
        const response = await fetch(CONFIG.SHEET_URL);
        if (!response.ok) throw new Error('Error al cargar los datos');
        
        const csvData = await response.text();
        const filas = parsearCSV(csvData);
        
        // Agrupar por número de factura
        const facturasAgrupadas = agruparPorFactura(filas);
        
        mostrarFacturasAgrupadas(facturasAgrupadas);
        actualizarEstadisticas(facturasAgrupadas);
        actualizarEstado('success', `Datos cargados correctamente (${facturasAgrupadas.length} facturas)`);
        
    } catch (error) {
        console.error('Error:', error);
        actualizarEstado('error', 'Error al cargar los datos. Verifica la conexión.');
    }
}

// Configurar event listeners de la aplicación
function setupAppListeners() {
    // Botón de actualizar
    document.getElementById('refreshBtn').addEventListener('click', cargarFacturas);
}

// Inicializar la aplicación
function initApp() {
    // Configurar event listeners
    setupAuthListeners();
    setupAppListeners();
    
    // Verificar autenticación al cargar
    checkAuth();
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);