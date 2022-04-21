import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// COMPONENTS
import {Colores} from '../Components/Colores';

import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';
const Components = ({match}) => (
   
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/inicio`} component={Colores}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Components;

