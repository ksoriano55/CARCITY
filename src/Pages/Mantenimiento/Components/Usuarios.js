import React, { useEffect, useState, useRef } from 'react';
import { DialogContent, DialogTitle, DialogActions, TextField, FormControlLabel, Dialog } from '@material-ui/core';
import CheckBox from '@material-ui/core/Checkbox';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { APIURL } from '../../../Utils/Environment';
import { peticionListadoUsuarios } from '../Services/MantenimientoServices'
import { ListadoUsuarios } from './ListadoUsuarios'

export const Usuarios = () => {

    const [openModal, setOpenModal] = useState(false);
    const [openModalRestablecerPassword, setopenModalRestablecerPassword] = useState(false);
    const [UsuariosSelected, setUsuariosSelected] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const context = useRef();

    useEffect(() => {
        getListUsuarios();
    }, [])

    const getListUsuarios = async () => {
        let listUsuarios = await peticionListadoUsuarios();
        setUsuarios(listUsuarios);
    }

    const validationSchema = yup.object().shape({
        codigoUsuario: yup.string().required('Este campo es obligatorio'),
        newPassword: yup.string().required('Este campo es obligatorio')
    });

    const openEditar = (usuarios) => {
        setUsuariosSelected(usuarios);
        setOpenModal(true);
    }

    const abrirModalRestablecerPassword = (usuarios) => {
        setUsuariosSelected(usuarios);
        setopenModalRestablecerPassword(true);
    }

    const cerrarModal = () => {
        setOpenModal(false);
        setopenModalRestablecerPassword(false);
        setUsuariosSelected(null);
    }

    const peticionRegistrarUsuarios = async (data) => {
        try {
            await axios.post(`${APIURL}api/usuarios/registrar`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Token')
                }
            });
            setOpenModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Guardado exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                getListUsuarios();
            })
        } catch (err) {
            setOpenModal(false);
            console.log(err.response.data.Message);
            let mensaje = "";
            if (err.response.data.Message === "Ya existe este usuario.") {
                mensaje = "Ya existe este usuario.";
            }
            else {
                mensaje = "No se pudo guardar el registro.";
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error: ' + mensaje
            })
        }
    }

    const peticionEditarUsuarios = async (data) => {
        try {
            await axios.put(`${APIURL}api/usuarios/editar?idUsuario=` + data.idUsuario, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Token')
                }
            });
            setOpenModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                setUsuariosSelected(null);
                getListUsuarios();
            })
        }
        catch (err) {
            console.log(err.response.data.Message);
            setOpenModal(false);
            let mensaje = "No se pudo editar el registro.";

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error: ' + mensaje
            }).then(e => {
                setUsuariosSelected(null);
                getListUsuarios();
            })
        }
    }

    const peticionModificarPassword = async (data) => {
        try {
            await axios.post(`${APIURL}api/usuarios/resetearPassword?idUsuario=` + data.idUsuario + `&newPassword=` + data.newPassword, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Token')
                }
            });
            setopenModalRestablecerPassword(false);
            Swal.fire({
                icon: 'success',
                title: 'Modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                getListUsuarios();
            })
        } catch (err) {
            setopenModalRestablecerPassword(false);
            console.log(err.response.data.Message);
            let mensaje = "No se pudo modificar la contraseña.";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error: ' + mensaje
            })
        }
    }

    let initialValues;
    if (UsuariosSelected == null) {
        initialValues = {
            nombre: '',
            apellido: '',
            telefono: '',
            codigoUsuario: '',
            newPassword: '',
            esMecanico: ''
        }
    }
    else {
        initialValues = {
            nombre: UsuariosSelected.nombre,
            apellido: UsuariosSelected.apellido,
            telefono: UsuariosSelected.telefono,
            idUsuario: UsuariosSelected.idUsuario,
            codigoUsuario: UsuariosSelected.codigoUsuario,
            esActivo: UsuariosSelected.esActivo,
            newPassword: '',
            esMecanico: UsuariosSelected.esMecanico
        }
    }

    return (
        <>
            <div className="col-12 text-right">
                <Button className="my-1" color="primary" onClick={() => setOpenModal(true)}>Registrar Nuevo</Button>
            </div>

            {
                <ListadoUsuarios usuarios={usuarios} openEditar={openEditar} abrirModalRestablecerPassword={abrirModalRestablecerPassword} />
            }

            <Dialog open={openModal} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">
                    {UsuariosSelected != null ? "EDITAR USUARIOS" : "REGISTRAR USUARIOS"}
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            peticionRegistrarUsuarios(values);
                        }}>
                        {({ errors, values }) => (
                            <div ref={context}>
                                <Form>
                                    <div className="form-group">
                                        <Field
                                            id="nombre"
                                            name="nombre"
                                            label={<p>Nombre <span style={{ color: 'red' }}>*</span></p>}
                                            error={!!errors.nombre}
                                            helperText={errors.nombre}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            id="apellido"
                                            name="apellido"
                                            label="Apellido"
                                            error={!!errors.apellido}
                                            helperText={errors.apellido}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            id="telefono"
                                            name="telefono"
                                            label="Telefono"
                                            error={!!errors.telefono}
                                            helperText={errors.telefono}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Field
                                            id="codigoUsuario"
                                            name="codigoUsuario"
                                            label={<p>Código Usuario <span style={{ color: 'red' }}>*</span></p>}
                                            error={!!errors.codigoUsuario}
                                            helperText={errors.codigoUsuario}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                    </div>
                                    {
                                        UsuariosSelected == null
                                        && (<div className="form-group">
                                            <Field
                                                id="newPassword"
                                                name="newPassword"
                                                label={<p>Contraseña <span style={{ color: 'red' }}>*</span></p>}
                                                error={!!errors.newPassword}
                                                helperText={errors.newPassword}
                                                style={{ width: '455px', marginRight: '15px' }}
                                                as={TextField}
                                                className="form-control"
                                                autoComplete="off"
                                            />
                                        </div>)
                                    }
                                    {
                                        <div className="form-group">
                                            {UsuariosSelected != null
                                                && <FormControlLabel
                                                    control={
                                                        <Field
                                                            type="checkbox"
                                                            name="esActivo"
                                                            checked={values.esActivo}
                                                            as={CheckBox}
                                                        />
                                                    }
                                                    label={"Activar"}
                                                />}
                                            <FormControlLabel
                                                control={
                                                    <Field
                                                        type="checkbox"
                                                        name="esMecanico"
                                                        checked={values.esMecanico}
                                                        as={CheckBox}
                                                    />
                                                }
                                                label={"Es Mecanico"}
                                            />
                                        </div>
                                    }
                                    <div className="form-group">

                                    </div>
                                    <DialogActions>
                                        {UsuariosSelected != null
                                            ? (<Button color="primary" onClick={() => peticionEditarUsuarios(values)}>Guardar</Button>)
                                            : (<Button color="primary" type="submit">Guardar</Button>)
                                        }
                                        <Button onClick={() => { cerrarModal() }} color="secondary">
                                            Cancelar
                                        </Button>
                                    </DialogActions>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Dialog open={openModalRestablecerPassword} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">
                    Resetear Contraseña
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            peticionModificarPassword(values);
                        }}>
                        {({ errors }) => (
                            <div ref={context}>
                                <Form>
                                    <div className="form-group">
                                        <Field
                                            id="newPassword"
                                            name="newPassword"
                                            label={<p>Nueva Contraseña <span style={{ color: 'red' }}>*</span></p>}
                                            error={!!errors.newPassword}
                                            helperText={errors.newPassword}
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                        />
                                    </div>
                                    <DialogActions>
                                        <Button color="primary" type="submit">Guardar</Button>
                                        <Button onClick={() => { cerrarModal() }} color="secondary">
                                            Cancelar
                                        </Button>
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