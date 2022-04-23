export const MainNav = [
    {
        icon: 'pe-7s-culture',
        label: 'Inicio',
        to: '#/home/inicio',
    },
    {
        icon: 'pe-7s-users',
        label: 'Orden',
        to: '#/Pacientes/inicio',
    },
    {
        icon: 'pe-7s-users',
        label: 'Clientes',
        to: '#/Clientes/inicio',
    }
];
export const ConfiguracionesNav = [
    {
        icon: 'pe-7s-display2',
        label: 'Catalogos',
        content: [
            {
                label: 'Colores ',
                to: '#/colores/inicio',
            },
            {
                label: 'Tipo Mecanica',
                to: '#/tipoMecanica/inicio',
            },
        ],
    },
    /*{
        icon: 'pe-7s-shield',
        label: 'Seguridad',
        content: [
            {
                label: 'Asignar Permisos',
                to: '#/AsignacionPermisos/inicio',
            },
            {
                label: 'Mantenimiento',
                to: '#/Mantenimiento/inicio',
            },
        ],
    },*/
];