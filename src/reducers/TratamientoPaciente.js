export const SET_TRATAMIENTOPACIENTE_SELECTED = 'TRATAMIENTOPACIENTE/SET_TRATAMIENTOPACIENTE_SELECTED';


export const setTratamientoPacienteSelected = pacienteTratamientoSelected => ({
    type: SET_TRATAMIENTOPACIENTE_SELECTED,
    pacienteTratamientoSelected
});

const myState = {
    pacienteTratamientoSelected: null
}

export default function reducer(state = myState, action) {
    switch (action.type) {
        case SET_TRATAMIENTOPACIENTE_SELECTED:
            return { pacienteTratamientoSelected: action.pacienteTratamientoSelected } 
        default:
            return state;
    }
}