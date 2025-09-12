// Procesamiento de datos y manipulación de CSV

// Función para parsear CSV
function parsearCSV(csv) {
    const lineas = csv.split('\n');
    const filas = [];
    
    // Empezar desde 1 para saltar los encabezados
    for (let i = 1; i < lineas.length; i++) {
        // Manejar comas dentro de campos entre comillas
        const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
        const cells = lineas[i].match(regex) || [];
        
        if (cells.length >= 15) { // Asegurar que tenemos suficientes columnas
            const fila = {
                factura: cells[0]?.replace(/"/g, '').trim() || '',
                proveedor: cells[1]?.replace(/"/g, '').trim() || '',
                nit: cells[2]?.replace(/"/g, '').trim() || '',
                direccion: cells[3]?.replace(/"/g, '').trim() || '',
                telefono: cells[4]?.replace(/"/g, '').trim() || '',
                email: cells[5]?.replace(/"/g, '').trim() || '',
                producto: cells[6]?.replace(/"/g, '').trim() || '',
                valorUnitario: parseFloat(cells[7]?.replace(/"/g, '').replace(',', '.')) || 0,
                cantidad: parseFloat(cells[8]?.replace(/"/g, '').replace(',', '.')) || 0,
                subtotal: parseFloat(cells[9]?.replace(/"/g, '').replace(',', '.')) || 0,
                totalFactura: parseFloat(cells[10]?.replace(/"/g, '').replace(',', '.')) || 0,
                porcentajeIVA: parseFloat(cells[11]?.replace(/"/g, '').replace(',', '.')) || 0,
                codigoContable: cells[12]?.replace(/"/g, '').trim() || '',
                valorDebito: parseFloat(cells[13]?.replace(/"/g, '').replace(',', '.')) || 0,
                valorCredito: parseFloat(cells[14]?.replace(/"/g, '').replace(',', '.')) || 0,
                descripcion: cells[15]?.replace(/"/g, '').trim() || ''
            };
            
            if (fila.factura) { // Solo agregar filas con número de factura
                filas.push(fila);
            }
        }
    }
    
    return filas;
}

// Función para agrupar por número de factura
function agruparPorFactura(filas) {
    const facturasMap = new Map();
    
    filas.forEach(fila => {
        if (!facturasMap.has(fila.factura)) {
            facturasMap.set(fila.factura, {
                numero: fila.factura,
                proveedor: fila.proveedor,
                nit: fila.nit,
                direccion: fila.direccion,
                telefono: fila.telefono,
                email: fila.email,
                total: fila.totalFactura,
                items: [],
                estado: determinarEstado(fila),
                fecha: obtenerFechaFormateada()
            });
        }
        
        // Agregar item a la factura
        const factura = facturasMap.get(fila.factura);
        factura.items.push({
            producto: fila.producto,
            valorUnitario: fila.valorUnitario,
            cantidad: fila.cantidad,
            subtotal: fila.subtotal,
            descripcion: fila.descripcion
        });
        
        // Actualizar total si es necesario
        if (fila.totalFactura > factura.total) {
            factura.total = fila.totalFactura;
        }
    });
    
    return Array.from(facturasMap.values());
}

// Función para determinar el estado de la factura
function determinarEstado(fila) {
    if (fila.valorCredito > 0) return CONFIG.ESTADOS.PAGADA;
    if (fila.descripcion?.toLowerCase().includes('crédito')) return CONFIG.ESTADOS.PAGADA;
    return CONFIG.ESTADOS.PENDIENTE;
}

// Función para actualizar estadísticas
function actualizarEstadisticas(facturas) {
    const totalFacturado = facturas.reduce((sum, f) => sum + f.total, 0);
    const pendientes = facturas.filter(f => f.estado === CONFIG.ESTADOS.PENDIENTE).length;
    const pagadas = facturas.filter(f => f.estado === CONFIG.ESTADOS.PAGADA).length;
    
    document.getElementById('total-facturas').textContent = facturas.length;
    document.getElementById('total-facturado').textContent = formatearMoneda(totalFacturado);
    document.getElementById('facturas-pendientes').textContent = pendientes;
    document.getElementById('facturas-pagadas').textContent = pagadas;
}
