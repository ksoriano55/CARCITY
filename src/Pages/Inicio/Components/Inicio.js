import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, } from 'reactstrap';
import { Line, ResponsiveContainer, LineChart } from 'recharts';
import {
    faCalendarCheck,
    faDatabase,
    faEdit,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import avatar4 from '../../../assets/utils/images/avatars/13.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { obtenerValoresTotales } from '../Services/InicioServices'
import moment from "moment";

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page C', uv: 2000, pv: 6800, amt: 2290 },
    { name: 'Page D', uv: 4780, pv: 7908, amt: 2000 },
    { name: 'Page E', uv: 2890, pv: 9800, amt: 2181 },
    { name: 'Page F', uv: 1390, pv: 3800, amt: 1500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
export const Inicio = () => {
    const [Citas, setCitas] = useState([]);
    const [valoresTotales, setValoresTotales] = useState('');
    useEffect(() => {
        obtenerCitas();

    }, [])

    const obtenerCitas = async () => {
        let valores = await obtenerValoresTotales();
        setCitas([]);
        if(valores !== undefined && valores.length > 0){
            setValoresTotales(valores[0]);
        }
    }
    return (
        <Fragment>
            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div
                            className={cx("page-title-icon")}>
                            <i className="lnr-home icon-gradient bg-tempting-azure" />
                        </div>
                        <div>
                            {"CENAO"}
                            <div
                                className={cx("page-title-subheading")}>
                                {"¡Bienvenido " + localStorage.getItem("Usuario") + "!"}
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                    </div>
                </div>
            </div>
            <Col /*md="12" lg="6"*/>
                <Row>
                    <Col md="3">
                        <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                            <div className="icon-wrapper rounded-circle">
                                <div className="icon-wrapper-bg bg-white opacity-10" />
                                <i className="lnr-calendar-full icon-gradient bg-arielle-smile" />
                            </div>
                            <div className="widget-numbers"> {valoresTotales.TOTALCITAS} </div>
                            <div className="widget-numbers-sm"> Citas </div>
                            <div className="widget-description text-white">
                                {<FontAwesomeIcon icon={faEdit} />}
                                <span className="pl-1"> Total de pacientes citados el dia de hoy</span>
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                            <div className="widget-chart-content text-white">
                                <div className="icon-wrapper rounded">
                                    <div className="icon-wrapper-bg bg-white opacity-10" />
                                    <i className="pe-7s-check icon-gradient bg-warm-flame" />
                                </div>
                                <div className="widget-numbers"> {valoresTotales.TOTALCOMPLETADAS} </div>
                                <div className="widget-numbers-sm"> Realizadas </div>
                                <div className="widget-description text-white">
                                    <FontAwesomeIcon icon={faCalendarCheck} />
                                    <span className="pr-1"> Total de Consultas realizadas el dia de hoy</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card mb-3 bg-love-kiss widget-chart card-border">
                            <div className="widget-chart-content text-white">
                                <div className="icon-wrapper rounded">
                                    <div className="icon-wrapper-bg bg-white opacity-4" />
                                    <i className="pe-7s-close-circle text-white" />
                                </div>
                                <div className="widget-numbers"> {valoresTotales.TOTALCANCELADAS}  </div>
                                <div className="widget-numbers-sm"> Canceladas</div>
                                <div className="widget-description">
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    <span className="text-white"> Total de consultas canceladas el dia de hoy</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                            <div className="icon-wrapper rounded-circle">
                                <div className="icon-wrapper-bg bg-white opacity-4" />
                                <i className="lnr-users" />
                            </div>
                            <div className="widget-numbers"> {valoresTotales.TOTALPACIENTES} </div>
                            <div className="widget-numbers-sm"> Pacientes  </div>

                            <div className="widget-description text-white">
                                <FontAwesomeIcon icon={faDatabase} />
                                <span className="pl-1">Total de Pacientes registrados en el sistema</span>
                            </div>
                            <div className="widget-chart-wrapper">
                                <ResponsiveContainer width='100%' aspect={3.0 / 1.0}>
                                    <LineChart data={data}
                                        margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
                                        <Line type='monotone' dataKey='pv' stroke='#ffffff' strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            <div className="card-header">Citas del dia de hoy</div>
                            <div className="table-responsive">
                                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Numero Expediente</th>
                                            <th className="text-center">Nombre</th>
                                            <th className="text-center">Hora Inicio</th>
                                            <th className="text-center">Hora Final</th>
                                            <th className="text-center">Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Citas.map((cita, index) => (
                                            <tr key={index}>
                                                <td className="text-center text-muted">{index + 1}</td>
                                                <td className="text-center">{cita.numExpediente}</td>
                                                <td>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width={40} height={40} className="rounded-circle" src={cita.foto !== "" ?cita.foto : avatar4} alt="Avatar" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">{cita.nombrePaciente}</div>
                                                                <div className="widget-subheading opacity-7">{cita.tratamiento}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">{moment(cita.horaInicio).format('LT')}</td>
                                                <td className="text-center">{moment(cita.horaFinal).format('LT')}</td>
                                                <td className="text-center">
                                                    <div className={cita.idEstado === 1 ? "badge badge-primary" : cita.idEstado === 2 ? "badge badge-success" : "badge badge-danger"}>{cita.estado}</div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <div className="d-block text-center card-footer"> </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Fragment>
    )
}