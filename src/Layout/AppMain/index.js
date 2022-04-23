import { Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
const Inicio = lazy(() => import('../../Pages/Inicio/Container'));
const InicioSesion = lazy(() => import('../../Pages/InicioSesion/Container'));
const Colores = lazy(() => import('../../Pages/Colores/Container'));
const TipoMecanica = lazy(() => import('../../Pages/TipoMecanica/Container'));
const Clientes = lazy(() => import('../../Pages/Clientes/Container'));
const IngresoOrden = lazy(() => import('../../Pages/IngresoOrden/Container'));

const AppMain = () => {
    let ruta= "/Home/Inicio";
    return (
        <Fragment>

            {/* Inicio */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Cargando..
                            <small>Espere un momento por favor!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/Home" component={Inicio} />
            </Suspense>

            {/* Colores */}

             <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Cargando..
                            <small>Espere un momento por favor!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/Colores" component={Colores} />
            </Suspense>

            {/* Tipo Mecanica */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Cargando..
                            <small>Espere un momento por favor!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/tipoMecanica" component={TipoMecanica} />
            </Suspense>

             {/* Clientes */}

             <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Cargando..
                            <small>Espere un momento por favor!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/clientes" component={Clientes} />
            </Suspense>

             {/* Ingreso Orden */}

             <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Cargando..
                            <small>Espere un momento por favor!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/ingresoOrden" component={IngresoOrden} />
            </Suspense>
          
            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Cargando
                            <small>Espere un momento por favor!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/InicioSesion" component={InicioSesion} />
            </Suspense>
      
            <Route exact path="/" render={() => (
              
               <Redirect to={ruta}/>
           )} />
            <ToastContainer />
        </Fragment>
    )
};

export default AppMain;