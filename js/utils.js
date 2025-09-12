// Utilidades generales de la aplicación

// Formatear moneda
function formatearMoneda(monto) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(monto);
}

// Actualizar estado de la UI
function actualizarEstado(tipo, mensaje) {
    const status = document.getElementById('status');
    status.className = `status ${tipo}`;
    status.innerHTML = tipo === 'loading' 
        ? `<i class="fas fa-spinner fa-spin"></i> ${mensaje}`
        : mensaje;
}

// Obtener fecha formateada
function obtenerFechaFormateada() {
    return new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Limpiar tabla de facturas
function limpiarTablaFacturas() {
    document.getElementById('facturas-body').innerHTML = '';
    actualizarEstado('loading', 'Cargando y agrupando facturas...');
    
    // Reiniciar estadísticas
    document.getElementById('total-facturas').textContent = '0';
    document.getElementById('total-facturado').textContent = '$0';
    document.getElementById('facturas-pendientes').textContent = '0';
    document.getElementById('facturas-pagadas').textContent = '0';
}

// Toggle detalles de factura
function toggleDetalles(numeroFactura) {
    const detalle = document.getElementById(`detalle-${numeroFactura}`);
    const icono = document.querySelector(`#detalle-${numeroFactura}`).previousElementSibling.querySelector('i');
    
    detalle.classList.toggle('show');
    icono.classList.toggle('fa-chevron-down');
    icono.classList.toggle('fa-chevron-up');
}
