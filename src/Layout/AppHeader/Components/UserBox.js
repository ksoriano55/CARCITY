import React, {Fragment} from 'react';

import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    faSignOutAlt,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const UserBox = () =>{

    let history = useHistory();
  const logOut = () => {
        localStorage.removeItem("Token")
        history.push("/InicioSesion/Inicio");
    }
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            {/*<NavItem className="nav-item-header">
                                                Mi cuenta
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Cambiar Contraseña</NavLink>
                                            </NavItem>*/}
                                            <NavItem className="nav-item-header">
                                                Sesion
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={()=>logOut()}>
                                                    Cerrar Sesión
                                                    <div className="ml-auto badge badge-success">Nuevo</div>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {localStorage.getItem("Usuario")}
                                </div>
                                {/*<div className="widget-subheading">
                                    Administrador
        </div>*/}
                            </div>

                            <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" color="info"
                                        id="Tooltip-1"
                                        onClick={()=>logOut()}>
                                    <FontAwesomeIcon className="mr-2 ml-2" icon={faSignOutAlt}></FontAwesomeIcon>
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Salir
                                </UncontrolledTooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

export default UserBox;