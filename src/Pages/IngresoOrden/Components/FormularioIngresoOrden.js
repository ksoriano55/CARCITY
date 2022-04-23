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
import { ObtenerColores } from '../../Colores/Services/ColoresServices';
import { ObtenerClientes } from '../../Clientes/Services/ClientesServices';
import { ObtenerTipoMecanica } from '../../TipoMecanica/Services/TipoMecanicaServices';

export const FormularioIngresoOrden = () => {

    const [clientes, setClientes] = useState([]); //Drop Down List Clientes
    const [tipoMecanica, setTipoMecanica] = useState([]); //Drop Down List Tipo Mecanica
    const [colores, setColores] = useState([]); //Drop Down List Colores
    const context = useRef();

    const estados = [
        { key: 'Seleccione Estado...', value: null }
        , { key: 'En Espera', value: 'En Espera' }
        , { key: 'En Proceso', value: 'En Proceso' }
        , { key: 'Cerrado', value: 'Cerrado' }
    ]

    useEffect(() => {
        getColores();
        getClientes();
        getTipoMecanica();
    }, [])

    const getClientes = async () => {
        let obtenerCliente = await ObtenerClientes();
        let Options = [{ key: "Seleccione Cliente...", value: null }];
        obtenerCliente.forEach(t => {
            let Valores = { key: t.nombre + " " + t.apellido, value: t.clienteId }
            Options.push(Valores);
        })
        setClientes(Options);
    }

    const getColores = async () => {
        let ObtenerColor = await ObtenerColores();
        let Options = [{ key: "Seleccione Color...", value: null }];
        ObtenerColor.forEach(t => {
            let Valores = { key: t.descripcion, value: t.colorId }
            Options.push(Valores);
        })
        setColores(Options);
    }

    const getTipoMecanica = async () => {
        let tipoMecanica = await ObtenerTipoMecanica();
        let Options = [{ key: "Seleccione Tipo Mecanica...", value: null }];
        tipoMecanica.forEach(t => {
            let Valores = { key: t.descripcion, value: t.mecanicaId }
            Options.push(Valores);
        })
        setTipoMecanica(Options);
    }

    const onCancelar = () => {
      
    }

    const peticionRegistrarOrden = async (data) => {
        try {
            await axios.post(`${APIURL}api/ingresoOrden/registrar`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Token')
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Guardado exitosamente',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            console.log(err.response.data.Message);
            let mensaje = "No se pudo guardar el registro.";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error: ' + mensaje,
                timer: 1500
            })
        }
    }

    let initialValues;
    initialValues = {
        mecanicaId: 0,
        clienteId: 0,
        colorId: 0,
        diagnostico: '',
        comentarios: '',
        anio: '',
        estado: '',
        marca: '',
        fechaIngreso: new Date(),
    }


    const regExpNumeros = /^\d+$/;

    const validationSchema = yup.object().shape({
        mecanicaId: yup.string().required("Este campo es obligatorio"),
        clienteId: yup.string().required("Este campo es obligatorio"),
        colorId: yup.string().required("Este campo es obligatorio")
    });

    return (
        <>
            {(<Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values) => { peticionRegistrarOrden(values); }}>
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
                                            <CardTitle>CLIENTE</CardTitle>
                                        </Col>
                                        <Col md={6}>
                                            <CardTitle align={"right"}>{moment(new Date()).format("DD-MM-YYYY")}</CardTitle>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={12}>
                                            <div className="form-group">
                                                <Label htmlFor="clienteId">Cliente</Label>
                                                <Field className="form-control" id="clienteId" name="clienteId" as='select'>
                                                    {clientes.map(e => {
                                                        return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                    })}
                                                </Field>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Datos Del Vehiculo</CardTitle>
                                    <Row form>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Label htmlFor="marca">Marca</Label>
                                                <Field id="marca" type="textarea" autoComplete="off" name="marca" className="form-control" />
                                            </div>

                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Label htmlFor="anio">Año</Label>
                                                <Field id="anio" type="textarea" autoComplete="off" name="anio" className="form-control" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Label htmlFor="colorId">Color</Label>
                                                <Field className="form-control" id="colorId" name="colorId" as='select'>
                                                    {colores.map(e => {
                                                        return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                    })}
                                                </Field>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Label htmlFor="mecanicaId">Tipo Mecanica</Label>
                                                <Field className="form-control" id="mecanicaId" name="mecanicaId" as='select'>
                                                    {tipoMecanica.map(e => {
                                                        return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                    })}
                                                </Field>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
                                                <Field className="form-control" name="fechaIngreso" type="date" id="fechaIngreso" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <Label htmlFor="estado">Estado</Label>
                                                <Field className="form-control" id="estado" name="estado" as='select'>
                                                    {estados.map(e => {
                                                        return (<option key={e.key} value={e.value}>{e.key}</option>)
                                                    })}
                                                </Field>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={12}>
                                            <div className="form-group">
                                                <Label htmlFor="diagnostico">Diagnóstico</Label>
                                                <Field id="diagnostico" name="diagnostico" type={"dataArea"} className="form-control" />
                                            </div>
                                        </Col>
                                    </Row>

                                    (<Button className="mb-2 mr-2" color="primary" type="submit">Guardar</Button>)

                                    <Button className="mb-2 mr-2" color="secondary" onClick={() => onCancelar()}>Cancelar</Button>
                                </CardBody>
                            </Card>
                        </Form>
                    </div>
                )}
            </Formik>)
            }
        </>
    );
}



