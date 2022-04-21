import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationBreadcrumb from '../BreadCrumb/NavigationBreadCrumb';
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');

const PacientesBreadCrumb = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col" style={{ textAlign: 'left' }}>
                    <Switch>
                        <Route path={'/Pacientes/Detalle'} exact render={(routeProps) => (
                            <NavigationBreadcrumb
                                BreadcrumbItems={[
                                    { Click: () => { props.clickBreadCrumb("/Pacientes/inicio") }, Titulo: "Pacientes" },
                                    { Titulo: "Detalles" }
                                ]}
                            />
                        )} />
                        <Route path={'/Pacientes/Imagenes'} exact render={(routeProps) => (
                            <NavigationBreadcrumb
                                BreadcrumbItems={[
                                    { Click: () => { props.clickBreadCrumb("/Pacientes/inicio") }, Titulo: "Pacientes" },
                                    { Click: () => { props.clickBreadCrumb("/Pacientes/Detalle") }, Titulo: "Detalle" },
                                    { Titulo: "Imagenes" }
                                ]}
                            />
                        )} />
                        <Route path={props.match.url} component={(routeProps) => (
                            <NavigationBreadcrumb
                                BreadcrumbItems={[
                                    { Titulo: 'Pacientes' }
                                ]}
                            />
                        )} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default PacientesBreadCrumb;