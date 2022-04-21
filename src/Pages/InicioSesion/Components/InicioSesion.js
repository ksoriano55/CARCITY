import React, { useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import * as yup from 'yup';
import { APIURL } from '../../../Utils/Environment';
import { useHistory } from "react-router-dom";
import '../../InicioSesion/Components/InicioSesion.css'
import { setPermisos } from 'reducers/Permisos';
import { useDispatch } from 'react-redux'

export const InicioSesion = () => {
    let history = useHistory();
    const context = useRef();
    const [msg, setSmg] = useState(null);
    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        codigoUsuario: yup.string().required('Este campo es obligatorio'),
        newPassword: yup.string().required('Este campo es obligatorio')
    });

    let initialValues;
    initialValues = {
        codigoUsuario: '',
        newPassword: ''
    }

    const peticionIniciarSesion = async (data) => {
        try {
            setSmg(null);
            let request = await axios.get(`${APIURL}api/InicioSesion?codigoUsuario=` + data.codigoUsuario + `&newPassword=` + data.newPassword);
            obtenerPermisos(request.data.usuario);
            localStorage.setItem("Token", request.data.Token)
            localStorage.setItem("Usuario", request.data.usuario)

        }
        catch (err) {
            console.log(err.response.data.Message);
            let mensaje = "";
            if (err.response.data.Message === "Usuario inactivo") {
                mensaje = "Usuario inactivo";
            }
            else if (err.response.data.Message === "Usuario o contraseña incorrecto") {
                mensaje = "Usuario o contraseña incorrecto";
            }
            else {
                mensaje = "No se pudo iniciar sesión";
            }
            setSmg(mensaje);
        }
    }

    const obtenerPermisos = async (usuario) => {
        try {
            setSmg(null);
            let request = await axios.get(`${APIURL}api/Accesos/${usuario}`);
            dispatch(setPermisos(request.data));
            history.push("/home/Inicio");
        }
        catch (err) {
            console.log("Ocurrion un error:", err.response.data.Message)
        }
    }

    return (
        <div className="outer" ref={context}>
            <div className="inner">
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values) => { peticionIniciarSesion(values); }}>
                    {({ errors
                    }) => (
                        <div ref={context}>
                        <Form>
                            <h3>CENAO</h3>
                            <div className="form-group">
                                <Field
                                    id="codigoUsuario"
                                    name="codigoUsuario"
                                    label="Usuario"
                                    error={!!errors.codigoUsuario}
                                    helperText={errors.codigoUsuario}
                                    as={TextField}
                                    className="form-control"
                                    autoComplete="off"
                                />

                            </div>
                            <br></br>
                            <div className="form-group">
                                <Field
                                    id="newPassword"
                                    name="newPassword"
                                    label="Contraseña"
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword}
                                    as={TextField}
                                    className="form-control"
                                    autoComplete="off"
                                    type="password"
                                />
                            </div>
                            {msg && <p style={{ color: "red" }}>{msg}</p>}
                            <br></br>
                            <br></br>
                            <button type="submit" className="btn btn-dark btn-lg btn-block">ENTRAR</button>
                        </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};