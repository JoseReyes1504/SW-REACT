import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../componentes/Page";
import '../../Css/index.css'
import '../../Css/Animaciones.css'

export const Presentacion: FC = () => {
    const navigate = useNavigate();    
    return (
        <Page>
            <div className="ContenedorPrincipal">
                <div className="Seccion1 mostrarArriba">
                    <div className="ContenedorBoxes MostrarCuatro">
                        <div className="Entidad">
                            <div className="BoxesFoda">
                                <p>Fortalezas</p>
                                <p className="Descripcion">Una fortaleza es una característica interna que permite a una empresa tener una ventaja competitiva en el mercado, y su identificación y capitalización es esencial para el éxito a largo plazo de la empresa.</p>                                
                            </div>
                            <div className="Boxes">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m826 471-46.666-46.666 40-40.334L672 236.666l-40.334 40L584 229l30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857 441l-31 30ZM346 952q-23 23-56.5 23T233 952L94.666 813.666q-19-19.251-19-47.292t19-47.04L134 680l47.666 47-40.333 40L289 914.667l40-40.333L376 922l-30 30Zm397-317.333L818.667 559 497 237.333 421.333 313 743 634.667Zm-280 280L539.334 838 218 516.666 141.333 593 463 914.667Zm4-243.333 109.334-109-82.668-82.668-109 109.334L467 671.334Zm43 290q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L94.666 640q-19-18.956-19-46.978 0-28.022 19-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999L337 542l110-110-72.334-72q-18.999-18.956-18.999-46.978 0-28.022 18.999-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999l321.668 321.668q18.999 19.251 18.999 47.292t-18.999 47.04L790 681.334q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L624 609 514 719l72.334 72.334q18.999 19.251 18.999 47.292t-18.999 47.04L510 961.334Z" /></svg>

                            </div>
                        </div>
                        <div className="Entidad">
                            <div className="BoxesFoda">
                                <p>Oportunidades</p>
                                <p className="Descripcion"> Una oportunidad es un factor externo que una empresa puede aprovechar para su beneficio, y su identificación y capitalización puede ser esencial para el crecimiento y éxito a largo plazo de la empresa.</p>
                            </div>

                            <div className="Boxes">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m768 432.666-45.333-103.333-106-47.333 106-46.667 45.333-100 45.333 100 106 46.667-106 47.333L768 432.666ZM768 1016l-45.333-100.666-106-46.667 106-46.667L768 718.001 813.333 822l106 46.667-106 46.667L768 1016ZM341.999 873.333l-94.666-204.667L40 575.333 247.333 482l94.666-203.999L437.333 482l206.666 93.333-206.666 93.333-95.334 204.667Zm0-163.333 45.334-92.667 94-42-94-42-45.334-92.667-44.666 92.667-94.667 42 94.667 42L341.999 710Zm0-134.667Z" /></svg>

                            </div>
                        </div>

                    </div>

                    <div className="ContenedorBoxes MostrarDos">
                        <div className="arrow-down" style={{marginLeft: -70}} >F</div>
                        <div className="arrow-down" style={{marginLeft: 0}} >O</div>
                        <div className="arrow-down" style={{marginLeft: -70}} >D</div>
                        <div className="arrow-down" style={{marginLeft: 0}} >A</div>
                        <input type="button" className="Empezar" value="Empezar Analisis" onClick={() => navigate("/home", { replace: true })} />
                    </div>

                    <div className="ContenedorBoxes MostrarCuatro">
                        <div className="Entidad">
                            <div className="Boxes">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m40 936 440-760 440 760H40Zm115.333-66.666h649.334L480 309.333 155.333 869.334ZM482.784 818q14.216 0 23.716-9.617 9.5-9.617 9.5-23.833 0-14.216-9.617-23.716-9.617-9.5-23.833-9.5-14.217 0-23.716 9.617-9.5 9.617-9.5 23.833 0 14.216 9.617 23.716 9.616 9.5 23.833 9.5Zm-33.45-114H516V488h-66.666v216ZM480 589.333Z" /></svg>
                            </div>
                            <div className="BoxesFoda">
                                <p>Debilidades</p>
                                <p className="Descripcion">Una  debilidad es una característica interna que coloca a una empresa en desventaja en comparación con sus competidores, y su identificación y abordaje es importante para mejorar el desempeño y mantener una ventaja competitiva en el mercado.</p>
                            </div>
                        </div>
                        <div className="Entidad">
                            <div className="Boxes">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="M389.333 712.667 480 624l90.667 88.667L619.333 664l-90-88.667 90-89.333-48.666-48.667L480 526l-90.667-88.667L340.667 486l90 89.333-90 88.667 48.666 48.667ZM480 975.333q-139.667-35-229.833-161.5Q160 687.333 160 535.333v-240l320-120 320 120v240q0 152-90.167 278.5-90.166 126.5-229.833 161.5ZM480 906q111.334-36.333 182.334-139.667 71-103.333 71-231V341.666L480 246.333l-253.334 95.333v193.667q0 127.667 71 231Q368.666 869.667 480 906Zm0-330Z" /></svg>
                            </div>
                            <div className="BoxesFoda">
                                <p>Amenazas</p>
                                <p className="Descripcion">Una  amenaza se refiere a un factor externo que puede afectar negativamente a una empresa y ponerla en riesgo. avances tecnológicos, nuevos competidores en el mercado, cambios en la regulación gubernamental o cambios en los patrones de consumo de los clientes.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Seccion2">
                    <div className="Boxes2">

                    </div>
                    <div className="Boxes2">

                    </div>
                    <div className="Boxes2">

                    </div>
                    <div className="Boxes2">

                    </div>
                </div>
                <div className="Seccion3">
                    <div className="Boxes3">

                    </div>
                    <div className="Boxes3">

                    </div>
                    <div className="Boxes3">

                    </div>
                    <div className="Boxes3">

                    </div>
                </div>
                <div className="Seccion4">
                    <div className="Boxes4">

                    </div>
                    <div className="Boxes4">

                    </div>
                    <div className="Boxes4">

                    </div>
                </div>
            </div>
        </Page>

    );
};
