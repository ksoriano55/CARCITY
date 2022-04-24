import axios from 'axios';
import { APIURL } from '../../../Utils/Environment';

export const peticionListadoRoles = async () => {
    try {
        const request = await axios.get(`${APIURL}api/rol`)
        return request.data;
    } catch (err) {
        console.log(err);
    }
}

export const peticionListadoFunciones = async () => {
    try {
        const request = await axios.get(`${APIURL}api/funciones`)
        return request.data;
    } catch (err) {
        console.log(err);
    }
}

export const peticionListadoPantallas = async () => {
    try {
        const request = await axios.get(`${APIURL}api/pantallas`)
        return request.data;
    } catch (err) {
        console.log(err);
    }
}

export const peticionListadoUsuarios = async () => {
    try {
        const request = await axios.get(`${APIURL}api/usuarios`)
        return request.data;
    } catch (err) {
        console.log(err);
    }
}