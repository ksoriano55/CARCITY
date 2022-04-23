import axios from 'axios';
import { APIURL } from '../../../Utils/Environment';

export const ObtenerTipoMecanica = async () => {
    try {
        const request = await axios.get(`${APIURL}api/tipoMecanica`)
        return request.data;
    } catch (err) {
        console.log(err)
    }
}