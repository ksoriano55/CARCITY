import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { setPacienteSelected } from 'reducers/Paciente'
import { useDispatch } from 'react-redux'
import { ObtenerOrden } from '../Services/IngresoOrdenServices'
import { DialogContent, DialogTitle, DialogActions, TextField, TextareaAutosize, Dialog } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import { APIURL } from '../../../Utils/Environment';
import Swal from 'sweetalert2';

export const ListadoIngresoOrden = (props) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [ordenes, setOrdenes] = useState([]);
    const [ordenSelected, setOrdenSelected] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        cargarOrdenes();
    }, [])

    const cargarOrdenes = async () => {
        let Orden = await ObtenerOrden();
        setOrdenes(Orden);
    }

    const iniciarOrden = async (orden) => {
        try {
            await axios.post(`${APIURL}api/ingresoOrden/iniciarOrden`, orden, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('Token')
                }
            });
            cargarOrdenes();
        } catch (err) {
            console.log(err.response.data.Message);
            let mensaje = "No se pudo iniciar la orden.";
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error: ' + mensaje,
                timer: 1500
            })
        }
    }
    

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTable: {
                responsiveScrollMaxHeight: {
                    maxHeight: 'unset !important',
                }
            },
            MUIDataTableBodyRow: {
                root: {
                    '&:nth-child(odd)': {
                        backgroundColor: '#f8f8f8'
                    }
                }
            },
        }
    })

    const HeaderPacientes = [
        {
            label: "Tipo Mecanica",
            name: "tipoMecanica",
            options: {
                filter: true,
            }
        },
        {
            label: "Descripcion",
            name: "descripcion",
            options: {
                filter: true,
            }
        },
        {
            label: "fecha Ingreso",
            name: "fechaIngreso",
            options: {
                filter: true,
            }
        },
        {
            label: "Cliente",
            name: "cliente",
            options: {
                filter: true,
            }
        },
        {
            label: "Estado",
            name: "Estado",
            options: {
                filter: true,
            }
        },
        {
            name: "Acciones",
            label: "Acciones",
            options: {
                filter: false,
                sort: false,
                print: false,
                download: false
            }
        },
    ]

    const Data = () => {
        let DataPacientes = [];
        if (ordenes.length > 0) {
            ordenes.forEach(p => {
                let data = [
                    p.descripcionMecanica,
                    p.diagnostico,
                    moment(p.fechaIngreso).format("DD/MM/YYYY"),
                    p.nombreCliente + " " + p.apellidoCliente,
                    p.Estado,
                    <div>
                        <span className="mr-1">
                            <Button className='my-1' variant="outlined" onClick={() => openDetalle(p)} size="small" color={"primary"}>Ver Detalle</Button>
                        </span>
                        <span className="mr-1">
                            <Button className='my-1' variant="outlined" onClick={() => iniciarOrden(p)} size="small" color={"primary"}>Iniciar</Button>
                        </span>
                    </div>
                ]
                DataPacientes.push(data);
            });
        }

        return DataPacientes;
    }

    const DatatableOptions = {
        filter: true,
        filterType: "dropdown",
        responsive: "standard",
        print: true,
        download: true,
        selectableRows: 'none',
        customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={(_, page) => changePage(page)}
                        onChangeRowsPerPage={event => changeRowsPerPage(event.target.value)}
                        rowsPerPageOptions={[10, 15, 20]}
                        labelRowsPerPage="Filas por página:"
                    />
                </TableRow>
            </TableFooter>
        ),
        textLabels: {
            body: {
                noMatch: "No hay registros todavía",
                toolTip: "Ordenar",
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver Columnas",
                filterTable: "Filtrar Tabla",

            },
            filter: {
                all: "Todos",
                title: "Filtros",
                reset: "Quitar",
            },
            viewColumns: {
                title: "Mostrar Columnas",
                titleAria: "Mostrar/Esconder Columnas",
            },
            selectedRows: {
                text: "Fila(s) seleccionadas",
                delete: "Borrar",
                deleteAria: "Borrar Filas Seleccionadas",
            },
        }
    };

    const openDetalle = (orden) => {
        setOrdenSelected(orden);
        setOpenModal(true);
    }

    const openCerrar = () => {
        setOrdenSelected(null);
        setOpenModal(false);
    }
    let initialValues;
    if (ordenSelected != null) {
        console.log("ordenSelected",ordenSelected)
        initialValues = {
            descripcionMecanica: ordenSelected.descripcionMecanica,
            diagnostico: ordenSelected.diagnostico
        }
    }
    return (
        <>
        <Dialog open={openModal} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">DETALLE DE LA ORDEN</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        //validationSchema={validationSchema}
                        onSubmit={(values) => {
                        }}>
                        {({ errors, values }) => (
                            <div /*ref={context}*/>
                                <Form>
                                    <div className="form-group">
                                        
                                        <Field
                                            disabled
                                            id="descripcionMecanica"
                                            name="descripcionMecanica"
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextField}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Diagnostico</label>
                                        <Field
                                            disabled
                                            id="diagnostico"
                                            name="diagnostico"
                                            style={{ width: '455px', marginRight: '15px' }}
                                            as={TextareaAutosize}
                                            className="form-control"
                                        />
                                    </div>
                                    <DialogActions>
                                        <Button onClick={() => { openCerrar() }} color="secondary">
                                            Cancelar
                                            </Button>
                                    </DialogActions>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        <div className="px-3">
            <div className="row mb-3">
               {/*<div className='col-lg-2 my-lg-0 col-6 my-1'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            disableToolbar
                            autoOk
                            label={"Fecha Inicio"}
                            variant="inline"
                            format={"DD/MM/YYYY"}
                            value={props.startDate}
                           // onChange={(date) => props.handleFechaInicio(date)}
                        />
                    </MuiPickersUtilsProvider>
                </div> */} 
              {/* <div className='col-lg-2 my-lg-0 col-6 my-1'>
                    <DatePicker
                        disableToolbar
                        autoOk
                        label={"Fecha Fin"}
                        variant="inline"
                        minDate={props.startDate}
                        format={"DD/MM/YYYY"}
                        value={props.endDate}
                        onChange={(date) => props.handleFechaFin(date)}
                    />
                </div>
                <div className='col-lg-2 my-lg-0 col-6 my-1'>
                    <Dropdown
                        placeholder="Estado"
                        selection
                       // style={{ zIndex: 999 }}
                        onChange={(e, { value }) => props.handleOnChangeAsesor(value)}
                        options={estados}
                        noResultsMessage={"No hay resultados"}
                        closeOnChange={true}
                        value={props.AsesorSelected}
                    />
                </div>
                <div className="col-lg-1 col-sm-2 col-4" style={{ paddingTop: 10 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => props.cargarRecibos(props.startDate, props.endDate)}
                    >Obtener
                    </Button>
                </div>*/}
            </div>
            <div>
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"Listado de Ordenes"}
                        data={Data()}
                        columns={HeaderPacientes}
                        options={DatatableOptions}
                    />
                </MuiThemeProvider>
            </div>
        </div>
        </>
    );
}