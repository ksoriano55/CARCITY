import React, { useState, useRef } from 'react';
import { Formik,/* Form, */Field } from 'formik';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import * as yup from 'yup';
import { APIURL } from '../../../Utils/Environment';
import { useHistory } from "react-router-dom";
import '../../InicioSesion/Components/InicioSesion.css'
import { setPermisos } from 'reducers/Permisos';
import { useDispatch } from 'react-redux'
import loginImg from 'assets/utils/images/login.png'
import { Form, /*Icon,*/ Input, Button, Checkbox, message } from "antd";
import 'antd/dist/antd.css';
export const InicioSesion = (props) => {
    let history = useHistory();
    const context = useRef();
    const [msg, setSmg] = useState(null);
    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        codigoUsuario: yup.string().required('Este campo es obligatorio'),
        newPassword: yup.string().required('Este campo es obligatorio')
    });
    const FormItem = Form.Item;
    //const { getFieldDecorator } = props.form;
    let initialValues;
    initialValues = {
        codigoUsuario: '',
        newPassword: ''
    }

    const peticionIniciarSesion = async (data) => {
        try {
            setSmg(null);
            let request = await axios.get(`${APIURL}api/InicioSesion?codigoUsuario=` + data.codigoUsuario + `&newPassword=` + data.newPassword);
            history.push("/IngresoOrden/listado");
            //obtenerPermisos(request.data.usuario);
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
            history.push("/IngresoOrden/listado");
        }
        catch (err) {
            console.log("Ocurrion un error:", err.response.data.Message)
        }
    }

   
    return (
        <div>
            <div className={"lContainer" + (false ? ' hidden' : ' ')}>
                <div className="lItem">
                    <div className="loginImage">
                        <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
                    </div>
                    <div className="loginForm">
                        <h2>Inicio Sesion</h2>
                        <Form onFinish={peticionIniciarSesion} className="login-form">

                            <Form.Item
                                name="codigoUsuario"
                                rules={[{ required: true, message: 'Porfavor ingrese su usuario!' }]}
                            >
                                <Input placeholder='Usuario'/>
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                rules={[{ required: true, message: 'Porfavor ingrese su contraseña!' }]}
                            >
                                <Input.Password placeholder='Contraseña'/>
                            </Form.Item>
                            {msg && <p style={{ color: "red" }}>{msg}</p>}
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Ingresar
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="footer">
                    <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">Car City</a>
                </div>
            </div>
        </div>
    );
};