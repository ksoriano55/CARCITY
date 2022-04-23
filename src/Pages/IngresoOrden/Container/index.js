import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import {FormularioIngresoOrden} from "../Components/FormularioIngresoOrden";
import {ListadoIngresoOrden} from "../Components/ListadoIngresoOrden";
// Layout

import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

const Pacientes = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/inicio`} component={FormularioIngresoOrden}/>
                    <Route path={`${match.url}/listado`} component={ListadoIngresoOrden}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Pacientes;