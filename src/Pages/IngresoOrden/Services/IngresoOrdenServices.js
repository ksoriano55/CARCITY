import axios from 'axios';
import { APIURL } from '../../../Utils/Environment';

export const ObtenerOrden = async () => {
    try {
        const request = await axios.get(`${APIURL}api/ingresoOrden`)
        return request.data;
    } catch (err) {
        console.log(err)
    }
}