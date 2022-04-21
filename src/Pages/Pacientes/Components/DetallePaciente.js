import React, { useState, useEffect } from 'react';
import moment from "moment";
import PacientesBreadCrumb from "../BreadCrumb/PacientesBreadCrumb";
import userIcon from '../../../assets/utils/images/userIcon.png';
import { useSelector } from 'react-redux';

const DetallePaciente = (props) => {
    const [obtenerInfoPaciente, setObtenerInfoPaciente] = useState([]);
    const PacienteSelected = useSelector(r => r.Paciente.pacienteSelected);

    useEffect(() => {
        setObtenerInfoPaciente(PacienteSelected);
        //eslint-disable-next-line
    }, [])

    const BreadCrumb = () => {
        return (
            <PacientesBreadCrumb
                match={props.match}
                clickBreadCrumb={clickBreadCrumb}>
            </PacientesBreadCrumb >
        )
    }

    const clickBreadCrumb = (nuevaRuta) => {
        props.history.push(nuevaRuta);
    }

    const calculoEdad = (e) => {
        let hoy = new Date();
        let cumpleanos = new Date(e);
        let age = hoy.getFullYear() - cumpleanos.getFullYear();
        let m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            age--;
        }

        return age
    }

    const TableBodyDatosGenerales = (paciente) => {
        return (
            <tbody>
                <tr>
                    <td>
                        {'Identidad: '}
                    </td>
                    {
                        <td>{paciente.identidad}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Fecha Nacimiento: '}
                    </td>
                    {
                        <td>{paciente.fechaNacimiento === null || paciente.fechaNacimiento === undefined ? '' : moment(paciente.fechaNacimiento).format("DD-MM-YYYY")}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Edad: '}
                    </td>
                    {
                        <td>{paciente.fechaNacimiento === null || paciente.fechaNacimiento === undefined ? '' : calculoEdad(paciente.fechaNacimiento)}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Correo Electrónio: '}
                    </td>
                    {
                        <td>{paciente.email}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Teléfono: '}
                    </td>
                    {
                        <td>{paciente.telefono}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Teléfono Referencia: '}
                    </td>
                    {
                        <td>{paciente.telefonoReferencia}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Profesión: '}
                    </td>
                    {
                        <td>{paciente.profesion}</td>
                    }
                </tr>
            </tbody>
        )
    }

    const TableBodyFicha = (paciente) => {
        return (
            <tbody>
                <tr>
                    <td>
                        {'Nombre Sucursal: '}
                    </td>
                    {
                        <td>{paciente.nombreSucursal}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Fecha Creación Expediente: '}
                    </td>
                    {
                        <td>{moment(paciente.fechaCrea).format("DD-MM-YYYY")}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Estado: '}
                    </td>
                    {
                        paciente.idEstado === 4
                            ? <td style={{ color: 'green' }}>{paciente.nombreEstado}</td>
                            : <td style={{ color: 'red' }}>{paciente.nombreEstado}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Diagnóstico: '}
                    </td>
                    {
                        <td>{paciente.listFichaClinica !== undefined ? paciente.listFichaClinica[0].diagnostico : ""}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Tipo de sangre: '}
                    </td>
                    {
                        <td>{paciente.listFichaClinica !== undefined ? paciente.listFichaClinica[0].tipoSangre : ""}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Alergias: '}
                    </td>
                    {
                        <td>{paciente.listFichaClinica !== undefined ? paciente.listFichaClinica[0].alergias : ""}</td>
                    }
                </tr>
                <tr>
                    <td>
                        {'Antecedentes Clínicos: '}
                    </td>
                    {
                        <td>{paciente.listFichaClinica !== undefined ? paciente.listFichaClinica[0].antecedentesClinicos : ""}</td>
                    }
                </tr>
            </tbody>
        )
    }

    const Titulo = (i) => {
        return i.numExpediente + " " + i.nombre + " " + i.apellido;
    }

    const srcFotoPaciente = (p) => {
        let src = "";
        src = (p.fotoPacienteBase64 === "data:image/png;base64," || p.fotoPacienteBase64 === "") ? userIcon : p.fotoPacienteBase64
        return src;
    }

    return (
        <>
            {BreadCrumb()}

            <div className="row">
                <div className="col-12 text-center">
                    <h3>{Titulo(obtenerInfoPaciente)}</h3>
                    <hr />
                </div>

                <div className="col-xs-12 col-sm-5">
                    <table className="table table-xl-responsive table-striped" style={{ border: 'none' }}>
                        {TableBodyDatosGenerales(obtenerInfoPaciente)}
                    </table>
                </div>

                <div className="col-xs-12 col-sm-5">
                    <table className="table table-xl-responsive table-striped" style={{ border: 'none' }}>
                        {TableBodyFicha(obtenerInfoPaciente)}
                    </table>
                </div>

                <div className="col-xs-12 col-sm-2 text-center">
                    <img className="img-responsive img-fluid img-thumbnail" height='350px' width={350} src={srcFotoPaciente(obtenerInfoPaciente)} alt={"foto"} />
                </div>

            </div>
        </>
    );
}

export default DetallePaciente;