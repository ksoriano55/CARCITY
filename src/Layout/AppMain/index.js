import { Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';

const Pacientes = lazy(() => import('../../Pages/Pacientes/Container'));
const ListaTratamientos = lazy(() => import('../../Pages/Tratamientos/Container'));
const Inicio = lazy(() => import('../../Pages/Inicio/Container'));
const InicioSesion = lazy(() => import('../../Pages/InicioSesion/Container'));
const Colores = lazy(() => import('../../Pages/Colores/Container'));
const TipoMecanica = lazy(() => import('../../Pages/TipoMecanica/Container'));
const Clientes = lazy(() => import('../../Pages/Clientes/Container'));

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

            {/* Pacientes */}

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
                <Route path="/Pacientes" component={Pacientes} />
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
          
            {/* Lista Tratamientos */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Cargando lista de Tratamientos
                            <small>Espere un segundo porfavor!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/listaTratamiento" component={ListaTratamientos} />
            </Suspense>
      
            <Route exact path="/" render={() => (
              
               <Redirect to={ruta}/>
           )} />
            <ToastContainer />
        </Fragment>
    )
};

export default AppMain;