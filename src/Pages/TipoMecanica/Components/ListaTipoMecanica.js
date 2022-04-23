import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import {Button } from '@material-ui/core';

export const ListaTipoMecanica = (props) => {

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

    const Headers = [
        {
            label:"Id Tipo Mecanica",
            name: "idTratamiento",
            options: {
                filter: true,
            }
        },
        {
            label:"Descripción",
            name: "descripcion",
            options: {
                filter: true,
            }
        },
        {
            label: "Estado",
            name: "estado",
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
                download:false
            }
        },
    ]

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
                noMatch: "No se han encontrado tipos de Mecanica",
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

    const Data = () => {
        let DataTipoMecanica = [];
        props.TipoMecanica.forEach(t => {
            let data = [
                        t.mecanicaId,
                        t.descripcion,
                        t.activo 
                        ? <p style={{ color: 'green' }}>Activo</p>
                        : <p style={{ color: 'red' }}>Inactivo</p>,
                <div>
                    <span className="mr-1">
                        <Button className='my-1' variant="outlined" onClick={() => props.openEditar(t)} size="small" color={"primary"}>Editar</Button>
                    </span>
                </div>
            ]
            DataTipoMecanica.push(data);
        });
        return DataTipoMecanica;
    }

    return (
        <div className="px-3">
            <div>
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"Listado de Tipo de Mecanica"}
                        data={Data()}
                        columns={Headers}
                        options={DatatableOptions}

                    />
                </MuiThemeProvider>
            </div>
        </div>
    );
}
