import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { Button } from '@material-ui/core';

export const ListadoUsuarios = (props) => {

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
            label: "Código Usuario",
            name: "codigoUsuario",
            options: {
                filter: true,
            }
        },
        {
            label: "Nombre Usuario",
            name: "nombre",
            options: {
                filter: true,
            }
        },
        {
            label: "Es Mecanico",
            name: "esMecanico",
            options: {
                filter: true,
            }
        },
        {
            label: "Estado",
            name: "esActivo",
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
            }
        },
    ]

    const Data = () => {
        let DataUsuarios = [];
        props.usuarios.forEach(p => {
            let data = [
                p.codigoUsuario,
                p.nombre + " " + p.apellido,
                p.esMecanico 
                ? <p style={{ color: 'green' }}>Si</p>
                : <p style={{ color: 'red' }}>No</p>,
                p.esActivo 
                ? <p style={{ color: 'green' }}>Activo</p>
                : <p style={{ color: 'red' }}>Inactivo</p>,
                <div>
                    <span className="mr-1">
                        <Button className='my-1' variant="outlined" size="small" onClick={() => props.openEditar(p)} color={"primary"}>Editar</Button>
                    </span>
                    <span className="mr-1">
                        <Button className='my-1' variant="outlined" size="small" onClick={() => props.abrirModalRestablecerPassword(p)} color={"primary"}>Resetear</Button>
                    </span>
                </div>
            ]
            DataUsuarios.push(data);
        });
        return DataUsuarios;
    }

    const DatatableOptions = {
        filter: true,
        filterType: "dropdown",
        responsive: "standard",
        print: false,
        download: false,
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
                    title={"Listado de Usuarios"}
                    data={Data()}
                    columns={Headers}
                    options={DatatableOptions}
                />
            </MuiThemeProvider>
        </div>
    );
}