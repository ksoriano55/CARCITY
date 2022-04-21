import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';
import { MainNav, ConfiguracionesNav } from './NavItems';

const Nav = () => {

    const GeneralNav = [];
    const ConfiguracionNav = [
        {
            icon: 'pe-7s-display2',
            label: 'Catalogos',
            content: [],

        },
        {
            icon: 'pe-7s-shield',
            label: 'Seguridad',
            content: []
        }];
    return (
        <>
            {
                MainNav.forEach((menu) => {
                    GeneralNav.push(menu);
                })
            }

            {
                ConfiguracionNav.forEach((confi) => {
                    ConfiguracionesNav.filter(x=>x.label === confi.label).forEach((config) => {
                        config.content.forEach((menu) => {
                            confi.content.push(menu)
                        })
                    })
                })
            }
            <Fragment>
                <h5 className="app-sidebar__heading">GENERAL</h5>
                <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">CONFIGURACIONES</h5>
                <MetisMenu content={ConfiguracionesNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
            </Fragment>
        </>
    );

}

export default withRouter(Nav);