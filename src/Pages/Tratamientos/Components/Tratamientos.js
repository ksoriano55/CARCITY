import React, { useEffect, useState, useRef } from 'react';
import { ListaTratamientos } from './ListaTratamientos'
import { DialogContent, DialogTitle, DialogActions, TextField, FormControlLabel, Dialog } from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import { ObtenerTratamientos } from '../Services/TratamientosServices'
import axios from 'axios';
import Swal from 'sweetalert2'
import { APIURL } from '../../../Utils/Environment';
export const Tratamientos = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [tratamientos, setTratamientos] = useState([]);
    const [tratamientoSelected, setTratamientoSelected] = useState(null);
    const context = useRef();

    useEffect(() => {
        cargarTratamientos();
    }, [])

    const validationSchema = yup.object().shape(
        {
            descripcion: yup.string().required('Este campo es obligatorio')
        });

    const cargarTratamientos = async () => {
        let tratamientos = await ObtenerTratamientos();
        setTratamientos(tratamientos);
    }

    const RegistrarTratamiento = async (data) => {
        try {
            await axios.post(`${APIURL}api/listadoTratamiento/registrar`, data);
            setOpenModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Guardado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarTratamientos();
            })
        } catch (err) {
            let mensaje = "Ha ocurrido un error y no se ha registrado el tratamiento.";

            if (err.response) {
                mensaje = err.response.data.Message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error:' + mensaje,
            })
        }
    }

    const ModificarTratamiento = async (data) => {
        try {
            await axios.post(`${APIURL}api/listaTratamiento/modificar`, data);
            setOpenModal(false);
            setTratamientoSelected(null);
            Swal.fire({
                icon: 'success',
                title: 'Modificado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarTratamientos();
            })
        } catch (err) {
            let mensaje = "Ha ocurrido un error y no se ha registrado el tratamiento.";

            if (err.response) {
                mensaje = err.response.data.Message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error:' + mensaje,
            })
        }
    }

    const openEditar = (tratamiento) => {
        setTratamientoSelected(tratamiento);
        setOpenModal(true);
    }

    const openCerrar = () => {
        setTratamientoSelected(null);
        setOpenModal(false);
    }
    let initialValues;
    if (tratamientoSelected == null) {
        initialValues = {
            descripcion: '',
            activo: true
        }
    }
    else {
        initialValues = {
            idListaTratamiento: tratamientoSelected.idListaTratamiento,
            descripcion: tratamientoSelected.descripcion,
            activo: tratamientoSelected.activo
        }
    }


    return (
        <>
            <div className="col-12 text-right">
                <Button className="my-1" color="primary" onClick={() => setOpenModal(true)}>Registrar Nuevo</Button>
            </div>
            
            {
                <ListaTratamientos tratamientos={tratamientos} openEditar={openEditar} />
            }

            <Dialog open={openModal} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">REGISTRAR NUEVO TRATAMIENTO</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            RegistrarTratamiento(values);
                        }}>
                        {({ errors, values }) => (
                            <div ref={context}>
                                <Form>
                                    <div className="form-group">
                                        <Field
                                            id="descripcion"
                                            name="descripcion"
                                            label= {<p>Tratamiento <span style={{ color: 'red' }}>*</span></p>}
                                            error={!!errors.descripcion}
                                            helperText={errors.descripcion}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                        />


                                    </div>
                                    <div className="form-group">
                                        <FormControlLabel
                                            control={
                                                <Field
                                                    type="checkbox"
                                                    name="activo"
                                                    checked={values.activo}
                                                    as={CheckBox}
                                                />
                                            }
                                            label={"Activar"}
                                        />
                                    </div>
                                    <DialogActions>
                                        <Button onClick={() => { openCerrar() }} color="secondary">
                                            Cancelar
                                            </Button>
                                        {tratamientoSelected != null && <Button color="primary" onClick={() => ModificarTratamiento(values)}>Guardar</Button>}
                                        {tratamientoSelected == null && <Button color="primary" type="submit">Guardar</Button>}
                                    </DialogActions>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}