import axios from 'axios';
import { APIURL } from '../../../Utils/Environment';
export const ObtenerColores = async () => {
    try {
        const request = await axios.get(`${APIURL}api/colores`)
        return request.data;
    } catch (err) {
        console.log(err)
    }
}