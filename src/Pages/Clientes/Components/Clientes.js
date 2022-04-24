import React, { useEffect, useState, useRef } from 'react';
import { ListaClientes } from './ListaClientes'
import { DialogContent, DialogTitle, DialogActions, TextField, TextareaAutosize, Dialog } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import { ObtenerClientes } from '../Services/ClientesServices'
import axios from 'axios';
import Swal from 'sweetalert2'
import { APIURL } from '../../../Utils/Environment';
export const Clientes = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [clienteSelected, setClienteSelected] = useState(null);
    const context = useRef();

    useEffect(() => {
        cargarClientes();
    }, [])

    const validationSchema = yup.object().shape(
        {
            nombre: yup.string().required('Este campo es obligatorio')
        });

    const cargarClientes = async () => {
        let listaClientes = await ObtenerClientes();
        setClientes(listaClientes);
    }

    const RegistrarCliente = async (data) => {
        try {
            await axios.post(`${APIURL}api/clientes/registrar`, data);
            setOpenModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Guardado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarClientes();
            })
        } catch (err) {
            let mensaje = "Ha ocurrido un error y no se ha registrado el cliente.";

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

    const ModificarCliente = async (data) => {
        try {
            await axios.post(`${APIURL}api/clientes/modificar`, data);
            setOpenModal(false);
            setClienteSelected(null);
            Swal.fire({
                icon: 'success',
                title: 'Modificado Exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                cargarClientes();
            })
        } catch (err) {
            let mensaje = "Ha ocurrido un error y no se ha registrado el cliente.";

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

    const openEditar = (cliente) => {
        setClienteSelected(cliente);
        setOpenModal(true);
    }

    const openCerrar = () => {
        setClienteSelected(null);
        setOpenModal(false);
    }
    let initialValues;
    if (clienteSelected == null) {
        initialValues = {
            nombre: '',
            apellido: '',
            direccion: '',
            telefono: ''
        }
    }
    else {
        initialValues = {
            clienteId: clienteSelected.clienteId,
            nombre: clienteSelected.nombre,
            apellido: clienteSelected.apellido,
            direccion: clienteSelected.direccion,
            telefono: clienteSelected.telefono
        }
    }


    return (
        <>
            <div className="col-12 text-right">
                <Button className="my-1" color="primary" onClick={() => setOpenModal(true)}>Registrar Nuevo</Button>
            </div>
            
            {
                <ListaClientes Clientes={clientes} openEditar={openEditar} />
            }

            <Dialog open={openModal} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">REGISTRAR NUEVO CLIENTE</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            RegistrarCliente(values);
                        }}>
                        {({ errors, values }) => (
                            <div ref={context}>
                                <Form>
                                    <div className="form-group">
                                        <Field
                                            id="nombre"
                                            name="nombre"
                                            label= {<p>Nombre <span style={{ color: 'red' }}>*</span></p>}
                                            error={!!errors.nombre}
                                            helperText={errors.nombre}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            id="apellido"
                                            name="apellido"
                                            label= {<p>Apellido <span style={{ color: 'red' }}>*</span></p>}
                                            error={!!errors.apellido}
                                            helperText={errors.apellido}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            id="telefono"
                                            name="telefono"
                                            label= {<p>Telefono <span style={{ color: 'red' }}>*</span></p>}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Dirección</label>
                                        <Field
                                            id="direccion"
                                            name="direccion"
                                            label= {<p>Dirección <span style={{ color: 'red' }}>*</span></p>}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextareaAutosize}
                                            className="form-control"
                                        />
                                    </div>
                                    <DialogActions>
                                        <Button onClick={() => { openCerrar() }} color="secondary">
                                            Cancelar
                                            </Button>
                                        {clienteSelected != null && <Button color="primary" onClick={() => ModificarCliente(values)}>Guardar</Button>}
                                        {clienteSelected == null && <Button color="primary" type="submit">Guardar</Button>}
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