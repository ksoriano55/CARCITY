export const SET_PERMISOS_USUARIO = 'PERMISOS/SET_PERMISOS_USUARIO';


export const setPermisos = permisos => ({
    type: SET_PERMISOS_USUARIO,
    permisos
});

const myState = {
    permisos: []
}

export default function reducer(state = myState, action) {
    switch (action.type) {
        case SET_PERMISOS_USUARIO:
            return { permisos: action.permisos } 
        default:
            return state;
    }
}