import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
    Col, Row, Card, CardBody,
    CardTitle, Button, Label
} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from "moment";
import { APIURL } from '../../../Utils/Environment';
import { ListadoPacientes } from './ListadoPacientes';
import { peticionListadoPacientes, peticionGenerarNumExpediente, peticionObtenerDatosPaciente } from '../Services/PacientesServices';
import { ObtenerTratamientos } from '../../Tratamientos/Services/TratamientosServices';
import fondoBlanco from '../../../assets/utils/images/fondoBlanco.jpg';
import './Pacientes.css';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setPacienteSelected } from 'reducers/Paciente'

export const FormularioPaciente = () => {

    const [sucursales, setSucursales] = useState([]); //Drop Down List Sucursal
    const [estados, setEstados] = useState([]); //Drop Down List Estado
    const [tratamientos, setTratamientos] = useState([]); //Drop Down List Tratamiento
    const [pacientes, setPacientes] = useState([]); //Listado de los pacientes
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [base64, setBase64] = useState("");
    const [numeroExpediente, setNumeroExpediente] = useState('');
    const [size, setSize] = useState(null);
    const context = useRef();
    const dispatch = useDispatch();
    let history = useHistory();

    const RedirectDetalle = (datosPaciente) => {
        dispatch(setPacienteSelected(datosPaciente));
        history.push("/Pacientes/Detalle");
    }

    const tipoSangre = [
        { key: 'A+', value: 'A+' }
        , { key: 'A-', value: 'A-' }
        , { key: 'B+', value: 'B+' }
        , { key: 'B-', value: 'B-' }
        , { key: 'AB+', value: 'AB' }
        , { key: 'AB-', value: 'AB-' }
        , { key: 'O+', value: 'O+' }
        , { key: 'O-', value: 'O-' }
    ]

    const sexo = [
        { key: 'Femenino', value: 'F' }
        , { key: 'Masculino', value: 'M' }
    ]

    useEffect(() => {
        getListPacientes();
        getListTratamientos();
        getNumeroExpediente();
    }, [])
    
    const getNumeroExpediente = async () => {
        let NumExpediente = await peticionGenerarNumExpediente();
        setNumeroExpediente(NumExpediente[0]);
    }

    const getListPacientes = async () => {
        let listPacientes = await peticionListadoPacientes();
        setPacientes(listPacientes);
    }


    const getListTratamientos = async () => {
        let listTratamientos = await ObtenerTratamientos();
        let Options = [];
        listTratamientos.forEach(t => {
            let Valores = { key: t.descripcion, value: t.idListaTratamiento }
            Options.push(Valores);
        })
        setTratamientos(Options);
    }


    const getDatosPaciente = async (getDatos) => {
        let obtenerDatosPaciente = await peticionObtenerDatosPaciente(getDatos.numExpediente);
        RedirectDetalle(obtenerDatosPaciente[0]);
    }

    const onCancelar = () => {
        setOpenForm(false);
        setPacienteSeleccionado(null);
        setBase64("");
    }

    const abrir = () => {
        setOpenForm(true);
    }

    const editar = (pacientes) => {
        setPacienteSeleccionado(pacientes);
        setOpenForm(true);
    }

    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const handleFileInputChange = e => {
        let file = e.target.files[0];

        if (file.size > 10000) {
            setSize('Favor adjuntar una imagen cuyo peso sea menor que 100 KB');
        }
        else {
            setSize(null);
            document.getElementById('previewImage').src = URL.createObjectURL(e.target.files[0]);
            getBase64(file)
                .then(result => {
                    file["base64"] = result;
                    setBase64(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const peticionRegistrarPaciente = async (data) => {
        try {
            let arrayFichaClinica = [];
            arrayFichaClinica.push(data.listFichaClinica);
            data.listFichaClinica = arrayFichaClinica;
            data.fotoPacienteBase64 = base64;
            await axios.post(`${APIURL}api/pacientes/registrar`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Token')
                }
            });
            setOpenForm(false);
            Swal.fire({
                icon: 'success',
                title: 'Guardado exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                setBase64("");
                getListPacientes();
                getNumeroExpediente();
                getDatosPaciente(data);
            })
           
        } catch (err) {
            setOpenForm(false);
            console.log(err.response.data.Message);
            let mensaje = "No se pudo guardar el registro.";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error: ' + mensaje,
                timer: 1500
            }).then(i => {
                setBase64("");
                getListPacientes();
                getNumeroExpediente();
            })
        }
    }

    const peticionEditarPaciente = async (data) => {
        try {
            let arregloFichaClinica = [];
            arregloFichaClinica.push(data.listFichaClinica);
            data.listFichaClinica = arregloFichaClinica;
            if (base64 !== "") {
                data.fotoPacienteBase64 = base64;
            }
            await axios.put(`${APIURL}api/pacientes/editar?numExpediente=` + data.numExpediente, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Token')
                }
            });
            setOpenForm(false);
            Swal.fire({
                icon: 'success',
                title: 'Modificado exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(e => {
                setBase64("");
                setPacienteSeleccionado(null);
                getListPacientes();
            })
        }
        catch (err) {
            setOpenForm(false);
            console.log(err.response.data.Message);
            let mensaje = "No se pudo editar el registro.";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error:' + mensaje,
                timer: 1500
            }).then(i => {
                setBase64("");
                setPacienteSeleccionado(null);
                getListPacientes();
            })
        }
    }

    let initialValues;
    if (pacienteSeleccionado == null) {
        initialValues = {
            numExpediente: numeroExpediente,
            idSucursal: sucursales.length > 0 ? sucursales[0].value : '',
            identidad: '',
            nombre: '',
            apellido: '',
            sexo: sexo.length > 0 ? sexo[0].value : '',
            email: '',
            direccion: '',
            fechaNacimiento: '',
            telefono: '',
            telefonoReferencia: '',
            profesion: '',
            foto: '',
            fotoPacienteBase64: '',
            idListaTratamiento: tratamientos.length > 0 ? tratamientos[0].value : '',
            montoPrima: '',
            montoMensualidad: '',
            comentario: '',
            listFichaClinica: {
                diagnostico: '',
                planTratamiento: '',
                tipoSangre: tipoSangre.length > 0 ? tipoSangre[0].value : '',
                alergias: '',
                antecedentesClinicos: ''
            }
        }
    }
    else {
        initialValues = {
            numExpediente: pacienteSeleccionado.numExpediente,
            idSucursal: pacienteSeleccionado.idSucursal,
            identidad: pacienteSeleccionado.identidad === null ? '' : pacienteSeleccionado.identidad,
            nombre: pacienteSeleccionado.nombre,
            apellido: pacienteSeleccionado.apellido,
            sexo: pacienteSeleccionado.sexo,
            idEstado: pacienteSeleccionado.idEstado,
            email: pacienteSeleccionado.email === null ? '' : pacienteSeleccionado.email,
            direccion: pacienteSeleccionado.direccion === null ? '' : pacienteSeleccionado.direccion,
            fechaNacimiento: pacienteSeleccionado.fechaNacimiento === null ? '' : moment(new Date(pacienteSeleccionado.fechaNacimiento)).format("YYYY-MM-DD"),
            telefono: pacienteSeleccionado.telefono === null ? '' : pacienteSeleccionado.telefono,
            telefonoReferencia: pacienteSeleccionado.telefonoReferencia === null ? '' :  pacienteSeleccionado.telefonoReferencia,
            profesion: pacienteSeleccionado.profesion === null ? '' :  pacienteSeleccionado.profesion,
            foto: '',
            fotoPacienteBase64: pacienteSeleccionado.fotoPacienteBase64,
            listFichaClinica: {
                diagnostico: pacienteSeleccionado.listFichaClinica[0].diagnostico === null ? '' : pacienteSeleccionado.listFichaClinica[0].diagnostico,
                planTratamiento: pacienteSeleccionado.listFichaClinica[0].planTratamiento === null ? '' : pacienteSeleccionado.listFichaClinica[0].planTratamiento,
                tipoSangre: pacienteSeleccionado.listFichaClinica[0].tipoSangre === null ? '' : pacienteSeleccionado.listFichaClinica[0].tipoSangre,
                alergias: pacienteSeleccionado.listFichaClinica[0].alergias === null ? '' : pacienteSeleccionado.listFichaClinica[0].alergias,
                antecedentesClinicos: pacienteSeleccionado.listFichaClinica[0].antecedentesClinicos === null ? '' : pacienteSeleccionado.listFichaClinica[0].antecedentesClinicos,
                idFicClinica: pacienteSeleccionado.listFichaClinica[0].idFicClinica
            }
        }
    }

    const regExpNumeros = /^\d+$/;

    const validationSchema = yup.object().shape({
        identidad: yup
            .string()
            .nullable()
            .min(13, "Se requieren 13 dígitos")
            .matches(regExpNumeros, "Sólo se aceptan números"),
        nombre: yup.string().required("Este campo es obligatorio"),
        apellido: yup.string().required("Este campo es obligatorio"),
        email: yup.string().email("Ingrese un correo electrónico válido").nullable()
    });

    let srcPreviewFotoPaciente = "";
    if (pacienteSeleccionado == null) {
        srcPreviewFotoPaciente = fondoBlanco
    }
    else {
        srcPreviewFotoPaciente = (pacienteSeleccionado.fotoPacienteBase64 === "data:image/png;base64," || pacienteSeleccionado.fotoPacienteBase64 === "") ? fondoBlanco : pacienteSeleccionado.fotoPacienteBase64
    }

    const handleChange = (e) => {
        if (pacienteSeleccionado == null) {
            let hoy = new Date();
            let cumpleanos = new Date(e.target.value);
            let age = hoy.getFullYear() - cumpleanos.getFullYear();
            let m = hoy.getMonth() - cumpleanos.getMonth();
    
            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                age--;
            }
    
            return (document.getElementById("edad").value = age);
        }
    }

    return (
        <>
            {
                openForm
                    ? (<Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={(values) => { peticionRegistrarPaciente(values); }}>
                        {({ values,
                            errors,
                            touched
                        }) => (
                            <div ref={context}>
                                <Form>
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <Row form>
                                                <Col md={6}>
                                                    <CardTitle>Datos generales</CardTitle>
                                                </Col>
                                                {
                                                    pacienteSeleccionado == null &&
                                                    <Col md={6}>
                                                        <CardTitle align={"right"}>{moment(new Date()).format("DD-MM-YYYY")}</CardTitle>
                                                    </Col>
                                                }
                                            </Row>
                                            <Row form>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="numExpediente">Número de expediente</Label>
                                                        <Field id="numExpediente" readOnly name="numExpediente" className="form-control" type="text" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="idSucursal">Sucursal</Label>
                                                        <Field className="form-control" id="idSucursal" name="idSucursal" as='select'>
                                                            {sucursales.map(e => {
                                                                return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                            })}
                                                        </Field>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="identidad">Identidad</Label>
                                                        <Field className={errors.identidad && touched.identidad ? 'form-control is-invalid' : 'form-control'} autoComplete="off" name="identidad" id="identidad" maxLength="13" placeholder="no incluya guiones" />
                                                        {errors.identidad && touched.identidad ? (<p style={{ color: 'red' }}>{errors.identidad}</p>) : null}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="nombre">Nombre <span style={{ color: 'red' }}>*</span></Label>
                                                        <Field className={errors.nombre && touched.nombre ? 'form-control is-invalid' : 'form-control'} autoComplete="off" name="nombre" id="nombre" maxLength="100" type="text" />
                                                        {errors.nombre && touched.nombre ? (<p style={{ color: 'red' }}>{errors.nombre}</p>) : null}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="apellido">Apellido<span style={{ color: 'red' }}>*</span></Label>
                                                        <Field className={errors.apellido && touched.apellido ? 'form-control is-invalid' : 'form-control'} autoComplete="off" name="apellido" id="apellido" maxLength="100" type="text" />
                                                        {errors.apellido && touched.apellido ? (<p style={{ color: 'red' }}>{errors.apellido}</p>) : null}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="sexo">Sexo</Label>
                                                        <Field className="form-control" id="sexo" name="sexo" as="select">
                                                            {sexo.map(e => {
                                                                return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                            })}
                                                        </Field>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                {
                                                    pacienteSeleccionado == null
                                                        ? (
                                                            <>
                                                                <Col md={3}>
                                                                    <div className="form-group">
                                                                        <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                                                                        <Field className="form-control" onBlur={handleChange} name="fechaNacimiento" max={moment(new Date()).subtract(24, 'months').format("YYYY-MM-DD")} type="date" id="fechaNacimiento" />
                                                                    </div>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <div className="form-group">
                                                                        <Label htmlFor="edad">Edad</Label>
                                                                        <Field className="form-control" name="edad" readOnly id="edad" />
                                                                    </div>
                                                                </Col>
                                                            </>
                                                        )
                                                        : (<Col md={6}>
                                                            <div className="form-group">
                                                                <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                                                                <Field className="form-control" onBlur={handleChange} name="fechaNacimiento" max={moment(new Date()).subtract(24, 'months').format("YYYY-MM-DD")} type="date" id="fechaNacimiento" />
                                                            </div>
                                                        </Col>)
                                                }

                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="profesion">Profesión</Label>
                                                        <Field className="form-control" autoComplete="off" type="tel" name="profesion" id="profesion" maxLength="100" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="telefono">Teléfono/Celular</Label>
                                                        <Field className="form-control" autoComplete="off" type="tel" name="telefono" id="telefono" maxLength="50" minLength="8" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="telefonoReferencia">Teléfono/Celular Referencia</Label>
                                                        <Field className="form-control" autoComplete="off" type="tel" name="telefonoReferencia" id="telefonoReferencia" maxLength="50" minLength="8" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="email">Correo Electrónico</Label>
                                                        <Field className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'} autoComplete="off" type="email" name="email" id="email" maxLength="50" />
                                                        {errors.email && touched.email ? (<p style={{ color: 'red' }}>{errors.email}</p>) : null}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="direccion">Dirección</Label>
                                                        <Field type="textarea" className="form-control" autoComplete="off" name="direccion" id="direccion" maxLength="100" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row form>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="foto">
                                                            <div className="font-icon-wrapper">
                                                                <i className="lnr-picture"> </i>
                                                                <p>{"Foto de perfil"}</p>
                                                            </div>
                                                        </Label>
                                                        <Field type="file" className="hideInputType" name="foto" id="foto" onChange={handleFileInputChange} accept=".png, .jpg, .jpeg" />
                                                        {size && <p style={{ color: "red" }}>{size}</p>}
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <img id="previewImage" src={srcPreviewFotoPaciente} width={50} height={50} className="rounded-circle" alt="preview" />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle>Ficha Clínica</CardTitle>
                                            <div className="form-group">
                                                <Label htmlFor="diagnostico">Diagnóstico<span style={{ color: 'red' }}>*</span></Label>
                                                <Field id="diagnostico" type="textarea" autoComplete="off" name="listFichaClinica.diagnostico" className="form-control" maxLength="250" />
                                            </div>
                                            <div className="form-group">
                                                <Label htmlFor="planTratamiento">Plan Tratamiento<span style={{ color: 'red' }}>*</span></Label>
                                                <Field id="planTratamiento" type="textarea" autoComplete="off" name="listFichaClinica.planTratamiento" className="form-control" />
                                            </div>
                                            {
                                                pacienteSeleccionado == null &&
                                                <div className="form-group">
                                                    <Label htmlFor="comentario">Comentario</Label>
                                                    <Field id="comentario" type="textarea" autoComplete="off" name="comentario" className="form-control" />
                                                </div>
                                            }
                                            <div className="form-group">
                                                <Label htmlFor="alergias">Alergias</Label>
                                                <Field id="alergias" type="textarea" autoComplete="off" name="listFichaClinica.alergias" className="form-control" maxLength="100" />
                                            </div>
                                            <div className="form-group">
                                                <Label htmlFor="antecedentesClinicos">Antecedentes clínicos</Label>
                                                <Field id="antecedentesClinicos" autoComplete="off" type="textarea" name="listFichaClinica.antecedentesClinicos" className="form-control" maxLength="250" />
                                            </div>
                                            <Row form>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <Label htmlFor="tipoSangre">Tipo de sangre</Label>
                                                        <Field id="tipoSangre" className="form-control" name="listFichaClinica.tipoSangre" as="select">
                                                            {tipoSangre.map(e => {
                                                                return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                            })}
                                                        </Field>
                                                    </div>
                                                </Col>
                                                {
                                                    pacienteSeleccionado == null
                                                        ? (<Col md={6}>
                                                            <div className="form-group">
                                                                <Label htmlFor="idListaTratamiento">Tratamiento</Label>
                                                                <Field id="idListaTratamiento" className="form-control" name="idListaTratamiento" as="select">
                                                                    {tratamientos.map(e => {
                                                                        return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                                    })}
                                                                </Field>
                                                            </div>
                                                        </Col>)
                                                        : (<Col md={6}>
                                                            <div className="form-group">
                                                                <Label htmlFor="idEstado">Estado</Label>
                                                                <Field id="idEstado" className="form-control" name="idEstado" as="select">
                                                                    {estados.map(e => {
                                                                        return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                                    })}
                                                                </Field>
                                                            </div>
                                                        </Col>)
                                                }
                                            </Row>
                                            {
                                                pacienteSeleccionado == null &&
                                                <Row form>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <Label htmlFor="montoPrima">Monto Prima</Label>
                                                            <Field id="montoPrima" type="textarea" autoComplete="off" name="montoPrima" className="form-control" />
                                                        </div>

                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group">
                                                            <Label htmlFor="montoMensualidad">Monto Mensualidad</Label>
                                                            <Field id="montoMensualidad" type="textarea" autoComplete="off" name="montoMensualidad" className="form-control" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            }
                                            {
                                                pacienteSeleccionado == null
                                                    ? (<Button className="mb-2 mr-2" color="primary" type="submit">Guardar</Button>)
                                                    : (<Button className="mb-2 mr-2" color="primary" onClick={() => peticionEditarPaciente(values)}>Guardar</Button>)
                                            }
                                            <Button className="mb-2 mr-2" color="secondary" onClick={() => onCancelar()}>Cancelar</Button>
                                        </CardBody>
                                    </Card>
                                </Form>
                            </div>
                        )}
                    </Formik>)
                    : (
                        <>
                            <div className="col-12 text-right">
                                <Button className="my-1" color="primary" onClick={() => abrir()}>Registrar Nuevo</Button>
                            </div>
                            <ListadoPacientes pacientes={pacientes} editar={editar} />
                        </>
                    )
            }
        </>
    );
}


