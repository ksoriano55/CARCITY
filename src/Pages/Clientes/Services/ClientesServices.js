import axios from 'axios';
import { APIURL } from '../../../Utils/Environment';
export const ObtenerClientes = async () => {
    try {
        const request = await axios.get(`${APIURL}api/clientes`)
        return request.data;
    } catch (err) {
        console.log(err)
    }
}