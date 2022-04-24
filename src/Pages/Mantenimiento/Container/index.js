import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

import {TabsMantenimiento} from "../Components/Tabs";

// Layout
import AppHeader from '../../../Layout/AppHeader';
import AppSidebar from '../../../Layout/AppSidebar';

const Mantenimiento = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/inicio`} component={TabsMantenimiento}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Mantenimiento;