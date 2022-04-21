import axios from 'axios';
import { APIURL } from '../../../Utils/Environment';

export const obtenerCitasDiarias = async () => {
    try {
        const request = await axios.get(`${APIURL}api/CitasDiarias`)
        return [];
    } catch (err) {
        console.log(err);
    }
}

export const obtenerValoresTotales = async () => {
    try {
        const request = await axios.get(`${APIURL}api/obtenerValoresDiario`)
        return [];
    } catch (err) {
        console.log(err);
    }
}