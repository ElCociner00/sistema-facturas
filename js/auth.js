// Módulo de autenticación y gestión de usuarios

// Verificar autenticación
function checkAuth() {
    const usuario = localStorage.getItem('usuarioLogueado');
    const rol = localStorage.getItem('usuarioRol');
    
    if (usuario) {
        // Usuario logueado - ocultar login, mostrar contenido
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('userBar').style.display = 'flex';
        document.getElementById('nombreUsuario').textContent = `${usuario} (${rol})`;
        
        // Cargar facturas solo si está autenticado
        cargarFacturas();
    } else {
        // No logueado - mostrar login
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('userBar').style.display = 'none';
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('usuarioRol');
    checkAuth();
    limpiarTablaFacturas();
}

// Configurar event listeners para autenticación
function setupAuthListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginError = document.getElementById('loginError');
        
        const usuario = CONFIG.usuariosAutorizados[username];
        
        if (usuario && usuario.password === password) {
            // Login exitoso
            localStorage.setItem('usuarioLogueado', username);
            localStorage.setItem('usuarioRol', usuario.rol);
            checkAuth();
        } else {
            // Login fallido
            loginError.style.display = 'block';
            setTimeout(() => {
                loginError.style.display = 'none';
            }, 3000);
        }
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', logout);
}
