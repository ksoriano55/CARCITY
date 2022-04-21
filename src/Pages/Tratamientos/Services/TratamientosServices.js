import axios from 'axios';
//import Swal from 'sweetalert2'
import { APIURL } from '../../../Utils/Environment';
export const ObtenerTratamientos = async () => {
    try {
        const request = await axios.get(`${APIURL}api/tratamientos`)
        return request.data;
    } catch (err) {
        console.log(err)
    }
}