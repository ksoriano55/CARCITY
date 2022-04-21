import React, { useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { setPacienteSelected } from 'reducers/Paciente'
import { useDispatch } from 'react-redux'
import { isLogged } from '../../../Utils/IsLogged';

export const ListadoPacientes = (props) => {
    let history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!isLogged())
        {
            history.push("/InicioSesion/Inicio");
        }   
    }, [history])

    const RedirectDetalle = (Expediente, pacienteSelected) => {
        dispatch(setPacienteSelected(pacienteSelected));
        history.push("/Pacientes/Detalle");
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
            label: "No. Expediente",
            name: "NumExpediente",
            options: {
                filter: true,
            }
        },
        {
            label: "Identidad",
            name: "identidad",
            options: {
                filter: true,
            }
        },
        {
            label: "Nombre",
            name: "nombre",
            options: {
                filter: true,
            }
        },
        {
            label: "Teléfono",
            name: "telefono",
            options: {
                filter: true,
            }
        },
        {
            label: "Sucursal",
            name: "nombreSucursal",
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
        props.pacientes.forEach(p => {
            let data = [
                p.numExpediente,
                p.identidad,
                p.nombre + " " + p.apellido,
                p.telefono,
                p.nombreSucursal,
                <div>
                    <span className="mr-1">
                        <Button className='my-1' variant="outlined" onClick={() => props.editar(p)} size="small" color={"primary"}>Editar</Button>
                    </span>
                    <span className="mr-1">
                        <Button className='my-1' variant="outlined" onClick={() => RedirectDetalle(p.numExpediente, p)} size="small" color={"primary"}>Detalles</Button>
                    </span>
                </div>
            ]
            DataPacientes.push(data);
        });
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

    return (
        <div className="px-3">
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Listado de Pacientes"}
                    data={Data()}
                    columns={HeaderPacientes}
                    options={DatatableOptions}
                />
            </MuiThemeProvider>
        </div>
    );
}