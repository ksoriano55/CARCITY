import React, { useEffect, useState, useRef } from 'react';
import { ListaColores } from './ListaColores'
import { DialogContent, DialogTitle, DialogActions, TextField, FormControlLabel, Dialog } from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import { ObtenerColores } from '../Services/ColoresServices'
import axios from 'axios';
import Swal from 'sweetalert2'
import { APIURL } from '../../../Utils/Environment';
export const Colores = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [colores, setColores] = useState([]);
    const [coloresSelected, setColoresSelected] = useState(null);
    const context = useRef();

    useEffect(() => {
        cargarColores();
    }, [])

    const validationSchema = yup.object().shape(
        {
            descripcion: yup.string().required('Este campo es obligatorio')
        });

    const cargarColores = async () => {
        let colores = await ObtenerColores();
        setColores(colores);
    }

    const RegistrarColor = async (data) => {
        try {
            await axios.post(`${APIURL}api/listadoTratamiento/registrar`, data);
            setOpenModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Guardado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarColores();
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

    const ModificarColores = async (data) => {
        try {
            await axios.post(`${APIURL}api/listaTratamiento/modificar`, data);
            setOpenModal(false);
            setColoresSelected(null);
            Swal.fire({
                icon: 'success',
                title: 'Modificado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarColores();
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
        setColoresSelected(tratamiento);
        setOpenModal(true);
    }

    const openCerrar = () => {
        setColoresSelected(null);
        setOpenModal(false);
    }
    let initialValues;
    if (coloresSelected == null) {
        initialValues = {
            descripcion: '',
            activo: true
        }
    }
    else {
        initialValues = {
            idListaTratamiento: coloresSelected.idListaTratamiento,
            descripcion: coloresSelected.descripcion,
            activo: coloresSelected.activo
        }
    }


    return (
        <>
            <div className="col-12 text-right">
                <Button className="my-1" color="primary" onClick={() => setOpenModal(true)}>Registrar Nuevo</Button>
            </div>
            
            {
                <ListaColores Colores={colores} openEditar={openEditar} />
            }

            <Dialog open={openModal} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">REGISTRAR NUEVO COLOR</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            RegistrarColor(values);
                        }}>
                        {({ errors, values }) => (
                            <div ref={context}>
                                <Form>
                                    <div className="form-group">
                                        <Field
                                            id="descripcion"
                                            name="descripcion"
                                            label= {<p>Colores <span style={{ color: 'red' }}>*</span></p>}
                                            error={!!errors.descripcion}
                                            helperText={errors.descripcion}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                        />


                                    </div>
                                    <DialogActions>
                                        <Button onClick={() => { openCerrar() }} color="secondary">
                                            Cancelar
                                            </Button>
                                        {coloresSelected != null && <Button color="primary" onClick={() => ModificarColores(values)}>Guardar</Button>}
                                        {coloresSelected == null && <Button color="primary" type="submit">Guardar</Button>}
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