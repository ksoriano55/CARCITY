export const SET_PACIENTE_SELECTED = 'PACIENTE/SET_PACIENTE_SELECTED';


export const setPacienteSelected = pacienteSelected => ({
    type: SET_PACIENTE_SELECTED,
    pacienteSelected
});

const myState = {
    pacienteSelected: null
}

export default function reducer(state = myState, action) {
    switch (action.type) {
        case SET_PACIENTE_SELECTED:
            return { pacienteSelected: action.pacienteSelected } 
        default:
            return state;
    }
}