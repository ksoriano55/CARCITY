import axios from 'axios';
import { APIURL } from '../../../Utils/Environment';

export const peticionListadoPacientes = async () => {
    try {
        const request = await axios.get(`${APIURL}api/pacientes`)
        return request.data;
    } catch (err) {
        console.log(err);
    }
}

export const peticionGenerarNumExpediente = async () => {
    try {
        const request = await axios.get(`${APIURL}api/pacientes/generarNumExpediente`)
        return request.data;
    } catch (err) {
        console.log(err);
    }
}

export const peticionObtenerDatosPaciente = async (numExpediente) => {
    try {
        const request = await axios.get(`${APIURL}api/obtenerPaciente?numExpediente=` + numExpediente)
        return request.data;
    } catch (err) {
        console.log(err);
    }
}
