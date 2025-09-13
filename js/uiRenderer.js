// Renderizado de la interfaz de usuario

// Función para mostrar facturas agrupadas
function mostrarFacturasAgrupadas(facturas) {
    const tbody = document.getElementById('facturas-body');
    tbody.innerHTML = '';
    
    if (facturas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: #666;">
                    <i class="fas fa-inbox"></i>
                    <p>No se encontraron facturas</p>
                </td>
            </tr>
        `;
        return;
    }
    
    facturas.forEach(factura => {
        // Fila principal de la factura (MEJORADA)
        const filaPrincipal = document.createElement('tr');
        filaPrincipal.className = 'factura-header';
        filaPrincipal.innerHTML = `
            <td><strong>${factura.numero}</strong></td>
            <td>${factura.proveedor}</td>
            <td>${factura.fecha}</td>
            <td>${formatearMoneda(factura.total)}</td>
            <td>
                <span class="estado ${factura.estado}">
                    <i class="${factura.estado === CONFIG.ESTADOS.PAGADA ? 'fas fa-check-circle' : 'fas fa-clock'}"></i>
                    ${factura.estado.toUpperCase()}
                </span>
            </td>
            <td>
                <span class="toggle-details" onclick="toggleDetalles('${factura.numero}')">
                    <i class="fas fa-chevron-down"></i> Ver detalles (${factura.items.length} items)
                </span>
            </td>
        `;
        tbody.appendChild(filaPrincipal);
        
        // Fila de detalles (inicialmente oculta)
        const filaDetalles = document.createElement('tr');
        filaDetalles.className = 'factura-detail';
        filaDetalles.id = `detalle-${factura.numero}`;
        filaDetalles.innerHTML = `
            <td colspan="6">
                <div style="padding: 15px; background: #f8f9fa; border-radius: 5px;">
                    <h4 style="margin-top: 0;">Detalles de la factura ${factura.numero}</h4>
                    <p><strong>Proveedor:</strong> ${factura.proveedor} | NIT: ${factura.nit}</p>
                    <p><strong>Contacto:</strong> ${factura.telefono} | ${factura.email}</p>
                    <p><strong>Dirección:</strong> ${factura.direccion}</p>
                    
                    <table style="width: 100%; margin-top: 15px;">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Valor Unitario</th>
                                <th>Subtotal</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${factura.items.map(item => `
                                <tr>
                                    <td>${item.producto}</td>
                                    <td>${item.cantidad}</td>
                                    <td>${formatearMoneda(item.valorUnitario)}</td>
                                    <td>${formatearMoneda(item.subtotal)}</td>
                                    <td>${item.descripcion}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </td>
        `;
        tbody.appendChild(filaDetalles);
    });
}
