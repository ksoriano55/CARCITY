import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import {InicioSesion} from "../Components/InicioSesion";


const SignIn = ({match}) => (
    <Fragment>
        <Route path={`${match.url}/inicio`} component={InicioSesion}/>
    </Fragment>
);

export default SignIn;