import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import {FormularioPaciente} from "../Components/FormularioPaciente";
import DetallePaciente from "../Components/DetallePaciente";
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

                    <Route path={`${match.url}/inicio`} component={FormularioPaciente}/>

                    <Route path={`${match.url}/Detalle`} component={DetallePaciente}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Pacientes;