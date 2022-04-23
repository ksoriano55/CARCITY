import React, { useEffect, useState, useRef } from 'react';
import { ListaTipoMecanica } from './ListaTipoMecanica'
import { DialogContent, DialogTitle, DialogActions, TextField, FormControlLabel, Dialog } from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import { ObtenerTipoMecanica } from '../Services/TipoMecanicaServices'
import axios from 'axios';
import Swal from 'sweetalert2'
import { APIURL } from '../../../Utils/Environment';

export const TipoMecanica = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [tipoMecanica, setTipoMecanica] = useState([]);
    const [tipoMecanicaSelected, setTipoMecanicaSelected] = useState(null);
    const context = useRef();

    useEffect(() => {
        cargarTipoMecanica();
    }, [])

    const validationSchema = yup.object().shape(
        {
            descripcion: yup.string().required('Este campo es obligatorio')
        });

    const cargarTipoMecanica = async () => {
        let tipoMecanica = await ObtenerTipoMecanica();
        setTipoMecanica(tipoMecanica);
    }

    const RegistrarTipoMecanica = async (data) => {
        try {
            await axios.post(`${APIURL}api/tipoMecanica/registrar`, data);
            setOpenModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Guardado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarTipoMecanica();
            })
        } catch (err) {
            let mensaje = "Ha ocurrido un error y no se ha registrado el tipo de mecanica.";

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

    const ModificarTipoMecanica = async (data) => {
        try {
            await axios.post(`${APIURL}api/tipoMecanica/modificar`, data);
            setOpenModal(false);
            setTipoMecanicaSelected(null);
            Swal.fire({
                icon: 'success',
                title: 'Modificado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarTipoMecanica();
            })
        } catch (err) {
            let mensaje = "Ha ocurrido un error y no se ha registrado el tipo de mecanica.";

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
        setTipoMecanicaSelected(tratamiento);
        setOpenModal(true);
    }

    const openCerrar = () => {
        setTipoMecanicaSelected(null);
        setOpenModal(false);
    }
    let initialValues;
    if (tipoMecanicaSelected == null) {
        initialValues = {
            descripcion: '',
            activo: true
        }
    }
    else {
        initialValues = {
            mecanicaId: tipoMecanicaSelected.mecanicaId,
            descripcion: tipoMecanicaSelected.descripcion,            
            activo: tipoMecanicaSelected.activo
        }
    }


    return (
        <>
            <div className="col-12 text-right">
                <Button className="my-1" color="primary" onClick={() => setOpenModal(true)}>Registrar Nuevo</Button>
            </div>
            
            {
                <ListaTipoMecanica TipoMecanica={tipoMecanica} openEditar={openEditar} />
            }

            <Dialog open={openModal} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">REGISTRAR TIPO MECANICA</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            RegistrarTipoMecanica(values);
                        }}>
                        {({ errors, values }) => (
                            <div ref={context}>
                                <Form>
                                    <div className="form-group">
                                        <Field
                                            id="descripcion"
                                            name="descripcion"
                                            label= {<p>Tipo de Mecanica <span style={{ color: 'red' }}>*</span></p>}
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
                                        {tipoMecanicaSelected != null && <Button color="primary" onClick={() => ModificarTipoMecanica(values)}>Guardar</Button>}
                                        {tipoMecanicaSelected == null && <Button color="primary" type="submit">Guardar</Button>}
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