const rutas = {
    index: 'http://localhost:3000',  // esta sera la url raiz.
    home : '/',
    password: '/new-password/*',
    admin :'/users/admin',
    profesor :'/users/profesor',
    canchero :'/users/ballboy',
    socio: '/users/socio',  
    registro : 'registro',          
                
    adminPagina :'/users/admin/pagina',
    adminHorario : '/users/admin/horario',
    adminPermisos : '/users/admin/permisos',
    adminRegistro : '/users/admin/registro',
    adminUsers : '/users/admin/usuarios',
    adminAyuda : '/users/admin/ayuda', 
    adminMeUser : '/users/admin/miUsuario', 
    
    profesorUser:'/users/profesor/administrar',
    profesorPoliticas: 'users/profesor/politicas',

    cancheroUser:'/users/ballboy/administrar',
    
    socioUser:'/users/socio/administrar',

    server : 'http://localhost:4000/',
};

export default rutas;