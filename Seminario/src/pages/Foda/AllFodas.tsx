import { FC, useState, useEffect, useRef, MutableRefObject } from "react";
// import { NewFodaEntry, getFodaAll } from "./FodaServices";
import '../../Css/FodaAll.css'
import '../../Css/Animaciones.css'
import '../../componentes/FodaCard.css'
import Page from "../../componentes/Page";
import { useNavigate } from "react-router-dom";
import { useAddFodaMutation, useFoda_EstadoMutation, useGetFodaQuery } from "../../store/services/FodaServicesRtk";

export const AllFoda: FC = () => {
    const navigate = useNavigate()
    const P = useRef<any>(null);
    const E = useRef<any>(null);
    const F = useRef<any>(null);
    const C = useRef<any>(null);

    const user = localStorage.getItem("Usuario");

    const { data, isLoading, error, refetch } = useGetFodaQuery(user || "");
    const [createFoda] = useAddFodaMutation();
    const [updateFoda] = useFoda_EstadoMutation();

    const [FodaData, setFodaData] = useState<FodaCard[]>([]);
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (data) {
            setFodaData(data);
            // console.log(FodaData);
        }
    }, [data]);

    const [fullScreen, setFullScreen] = useState(1);


    function FullScreen(Ref: any) {
        const element = Ref.current;
        setFullScreen(fullScreen + 1);
        // console.log(element);
        if (fullScreen == 1) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }

        }
        else if (fullScreen >= 2) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setFullScreen(1);
        }
    }

    const ID = localStorage.getItem("UID");
    
    interface FodaCard {
        _id?: string;
        nombre: string;
        owner: {
            id: string,
            usuario: string,
            email: string
        },
        empresa: {
            id: string,
            nombre?: string
        },
        estado: string,
        entradas: number,
        observacion?: string,
        Fcantidad: number,
        Dcantidad: number,
        Ocantidad: number,
        Acantidad: number
    }


    const [Zona, setZona] = useState({
        "color": "#DAFCFC",
        "Letra": "N",
    });


    const [tocar, setTocar] = useState(1);
    const [valora, setValora] = useState({
        "display": "none",
        "fill": "white"
    });


    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target === document.activeElement) {
            newFoda();
        }
    };


    const getList = (list: string): FodaCard[] => {
        return FodaData.filter(item => item.estado === list);
    }

    const dragginOver = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    }

    const startDrag = (event: React.DragEvent<HTMLDivElement>, item: FodaCard) => {
        if (item._id) {
            event.dataTransfer.setData('CardID', item._id);
        }
    }

    function newFoda() {
        if (descripcion === "") {
            console.log("Descripción vacia");
        } else {
            createFoda([ID, descripcion, user]).unwrap()
                .then((payload => {
                    refetch();
                }))
                ;
        }
        setDescripcion("");
    }

    function Lista(Funcion: Number) {
        if (Funcion === 1) {
            setZona({
                Letra: "N",
                color: "#DAFCFC",
            })
        }
        else {
            setZona({
                Letra: "B",
                color: "#e74c3c",

            })
        }
    }

    function Valoracion() {
        setTocar(tocar + 1);
        if (tocar == 1) {
            setValora({
                display: "flex",
                fill: "#F7DC6F"
            });
        } else if (tocar >= 2) {
            setValora({
                display: "none",
                fill: "white"
            });
            setTocar(1);
        }
    }

    const OnDrop = (event: React.DragEvent<HTMLDivElement>, list: string) => {
        const itemID = event.dataTransfer.getData("CardID");
        const itemIndex = FodaData.findIndex(item => item._id === itemID);
        const item = FodaData[itemIndex];

        if (item) {
            const newItem = { ...item, estado: list };
            const newState = [...FodaData];
            newState[itemIndex] = newItem;
            setFodaData(newState);
        }

        if (list === "P") {
            updateFoda([item._id, item.empresa.id, "P"]);
        }
        else if (list === "E") {
            updateFoda([item._id, item.empresa.id, "E"]);
        } else if (list === "F") {
            updateFoda([item._id, item.empresa.id, "F"]);
        }
        else if (list === "C") {
            updateFoda([item._id, item.empresa.id, "C"]);
        } else if (list === "B") {
            // Delete(item?._id);            
        } else {
            updateFoda([item._id, item.empresa.id, "N"]);
        }
    }

    function AbrirFoda(id: string) {
        localStorage.setItem("foda", id);
        console.log(localStorage.getItem("foda"));
        navigate("/foda", { replace: true });
    }

    interface Props {
        Nlista: string,
    }

    function CardLista(props: Props) {
        return (
            <>
                {getList(props.Nlista).map(item => (
                    <div className="CardFodaContent" style={{position: "relative", width: "95%", height: "120px", margin: "2% auto", boxShadow: "#71A1E5 0px 2px 8px 0px", backgroundColor: "transparent", border: "2px dashed #181818",     color: "#17B4C0", display: "flex", flexWrap: "wrap", borderRadius: "15px", cursor: "move", }}
                        key={item._id} draggable onDragStart={(event: React.DragEvent<HTMLDivElement>) => startDrag(event, item)}>
                        <div className="Top" style={{ width: "100%", height: "17%" }} >
                            <p style={{ textTransform: "uppercase", letterSpacing: 1, width: "100%", height: "0%" }}>{item.nombre}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{position: "absolute", top: "25%", right: "2%", fill: "#f5b041", cursor: "pointer"}} onClick={() => AbrirFoda(item._id || '')} height="24" viewBox="0 96 960 960" width="24"><path d="M200 936q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840 296v268q-19-9-39-15.5t-41-9.5V296H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510 236q0-13-8.5-21.5T480 206q-13 0-21.5 8.5T450 236q0 13 8.5 21.5T480 266Zm240 750q-83 0-141.5-58.5T520 816q0-83 58.5-141.5T720 616q83 0 141.5 58.5T920 816q0 83-58.5 141.5T720 1016Zm-20-80h40V836h100v-40H740V696h-40v100H600v40h100v100Z" /></svg>
                        </div>

                        <div className="BoxesCardFoda" style={{width: "25%",height: "65%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{ margin: "0%" }}>F</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" height="40" viewBox="0 96 960 960" width="40"><path d="m826 471-46.666-46.666 40-40.334L672 236.666l-40.334 40L584 229l30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857 441l-31 30ZM346 952q-23 23-56.5 23T233 952L94.666 813.666q-19-19.251-19-47.292t19-47.04L134 680l47.666 47-40.333 40L289 914.667l40-40.333L376 922l-30 30Zm397-317.333L818.667 559 497 237.333 421.333 313 743 634.667Zm-280 280L539.334 838 218 516.666 141.333 593 463 914.667Zm4-243.333 109.334-109-82.668-82.668-109 109.334L467 671.334Zm43 290q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L94.666 640q-19-18.956-19-46.978 0-28.022 19-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999L337 542l110-110-72.334-72q-18.999-18.956-18.999-46.978 0-28.022 18.999-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999l321.668 321.668q18.999 19.251 18.999 47.292t-18.999 47.04L790 681.334q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L624 609 514 719l72.334 72.334q18.999 19.251 18.999 47.292t-18.999 47.04L510 961.334Z" /></svg>
                            <p style={{ margin: "0px 0%" }}>{item.Fcantidad}</p>
                        </div>
                        <div className="BoxesCardFoda" style={{width: "25%",height: "65%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{ margin: "0%" }}>O</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" height="40" viewBox="0 96 960 960" width="40"><path d="m768 432.666-45.333-103.333-106-47.333 106-46.667 45.333-100 45.333 100 106 46.667-106 47.333L768 432.666ZM768 1016l-45.333-100.666-106-46.667 106-46.667L768 718.001 813.333 822l106 46.667-106 46.667L768 1016ZM341.999 873.333l-94.666-204.667L40 575.333 247.333 482l94.666-203.999L437.333 482l206.666 93.333-206.666 93.333-95.334 204.667Zm0-163.333 45.334-92.667 94-42-94-42-45.334-92.667-44.666 92.667-94.667 42 94.667 42L341.999 710Zm0-134.667Z" /></svg>
                            <p style={{ margin: "0px 0%" }}>{item.Ocantidad}</p>
                        </div>
                        <div className="BoxesCardFoda" style={{width: "25%",height: "65%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{ margin: "0%" }}>D</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" height="40" viewBox="0 96 960 960" width="40"><path d="m40 936 440-760 440 760H40Zm115.333-66.666h649.334L480 309.333 155.333 869.334ZM482.784 818q14.216 0 23.716-9.617 9.5-9.617 9.5-23.833 0-14.216-9.617-23.716-9.617-9.5-23.833-9.5-14.217 0-23.716 9.617-9.5 9.617-9.5 23.833 0 14.216 9.617 23.716 9.616 9.5 23.833 9.5Zm-33.45-114H516V488h-66.666v216ZM480 589.333Z" /></svg>
                            <p style={{ margin: "0px 0%" }}>{item.Dcantidad}</p>
                        </div>
                        <div className="BoxesCardFoda" style={{width: "25%",height: "65%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{ margin: "0%" }}>A</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" height="40" viewBox="0 96 960 960" width="40"><path d="M389.333 712.667 480 624l90.667 88.667L619.333 664l-90-88.667 90-89.333-48.666-48.667L480 526l-90.667-88.667L340.667 486l90 89.333-90 88.667 48.666 48.667ZM480 975.333q-139.667-35-229.833-161.5Q160 687.333 160 535.333v-240l320-120 320 120v240q0 152-90.167 278.5-90.166 126.5-229.833 161.5ZM480 906q111.334-36.333 182.334-139.667 71-103.333 71-231V341.666L480 246.333l-253.334 95.333v193.667q0 127.667 71 231Q368.666 869.667 480 906Zm0-330Z" /></svg>
                            <p style={{ margin: "0px 0%" }}>{item.Acantidad}</p>
                        </div>
                    </div>
                ))}
            </>
        )
    }

    return (

        <Page>
            <div className="AllFoda">
                <div className="Foda MostrarDerecha">
                    <div className="zone MostrarUno" ref={P}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="full" onClick={() => FullScreen(P)} height="24" viewBox="0 96 960 960" width="24"><path d="M120 936V616h80v184l504-504H520v-80h320v320h-80V352L256 856h184v80H120Z" /></svg>
                        <div className="Letra">
                            <p>P</p>
                            <p style={{ transform: "rotate(-90deg)", textDecoration: "none", fontSize: "25px", marginTop: 130, letterSpacing: 1 }}>planificación</p>
                        </div>
                        <div className="AllContent">
                            <div className="Icono">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" style={{ marginTop: 10 }} height="24" viewBox="0 96 960 960" width="24"><path d="M756 936 537 717l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701 215q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841 355q0 59-40.5 99.5T701 495q-12 0-24-2t-23-7L204 936Z" /></svg>
                            </div>
                            <div className="Contenido" id="Amenazas" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "P")}>

                                {FodaData && !isLoading && !error && (
                                    CardLista({ Nlista: "P" })
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="zone MostrarDos" ref={E}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="full" onClick={() => FullScreen(E)} height="24" viewBox="0 96 960 960" width="24"><path d="M120 936V616h80v184l504-504H520v-80h320v320h-80V352L256 856h184v80H120Z" /></svg>
                        <div className="Letra">
                            <p>E</p>
                            <p style={{ transform: "rotate(-90deg)", textDecoration: "none", fontSize: "25px", marginTop: 110, letterSpacing: 1 }}>Ejecución</p>
                        </div>
                        <div className="AllContent">
                            <div className="Icono">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" style={{ marginTop: 10 }} height="24" viewBox="0 96 960 960" width="24"><path d="M204 738q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240 578q0 26 6 51t18 49l-60 60Zm277 278L321 856l160-160 56 56-64 64h7q100 0 170-70.5T720 574q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" /></svg>
                            </div>
                            <div className="Contenido" id="Amenazas" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "E")}>

                                {FodaData && !isLoading && !error && (
                                    CardLista({ Nlista: "E" })
                                )}

                                {/* <CardLista Nlista={"E"}></CardLista> */}
                            </div>
                        </div>

                    </div>

                    <div className="zone MostrarTres" ref={F}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="full" onClick={() => FullScreen(F)} height="24" viewBox="0 96 960 960" width="24"><path d="M120 936V616h80v184l504-504H520v-80h320v320h-80V352L256 856h184v80H120Z" /></svg>
                        <div className="Letra">
                            <p>F</p>
                            <p style={{ transform: "rotate(-90deg)", textDecoration: "none", fontSize: "25px", marginTop: 110, letterSpacing: 1 }}>finalizado</p>
                        </div>
                        <div className="AllContent">
                            <div className="Icono">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" style={{ marginTop: 10 }} height="24" viewBox="0 96 960 960" width="24"><path d="m344 996-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" /></svg>
                            </div>
                            <div className="Contenido" id="Amenazas" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "F")}>
                                {FodaData && !isLoading && !error && (
                                    CardLista({ Nlista: "F" })
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="zone MostrarCuatro" ref={C}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="full" onClick={() => FullScreen(C)} height="24" viewBox="0 96 960 960" width="24"><path d="M120 936V616h80v184l504-504H520v-80h320v320h-80V352L256 856h184v80H120Z" /></svg>
                        <div className="Letra">
                            <p>C</p>
                            <p style={{ transform: "rotate(-90deg)", textDecoration: "none", fontSize: "25px", marginTop: 120, letterSpacing: 1 }}>cancelado</p>
                        </div>
                        <div className="AllContent">
                            <div className="Icono">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#17B4C0" style={{ marginTop: 10 }} height="24" viewBox="0 96 960 960" width="24"><path d="m376 736 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56ZM160 896q-33 0-56.5-23.5T80 816V336q0-33 23.5-56.5T160 256h640q33 0 56.5 23.5T880 336v480q0 33-23.5 56.5T800 896H160Zm0-80h640V336H160v480Zm0 0V336v480Z" /></svg>
                            </div>
                            <div className="Contenido" id="Amenazas" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "C")}>
                                {FodaData && !isLoading && !error && (
                                    CardLista({ Nlista: "C" })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Foda2">
                    <div className="Formularios">
                        <div className="SVG">
                            <span title="Crear Foda"><svg xmlns="http://www.w3.org/2000/svg" className="SVG1" height="40" viewBox="0 96 960 960" width="40"><path d="M186.666 936q-27 0-46.833-19.833T120 869.334V282.666q0-27 19.833-46.833T186.666 216h382.668v66.666H186.666v586.668h586.668V486.666H840v382.668q0 27-19.833 46.833T773.334 936H186.666Zm134.001-158v-66.666H640V778H320.667Zm0-124.667v-66.666H640v66.666H320.667Zm0-124.667V462H640v66.666H320.667ZM688 453.333V368h-85.333v-66.667H688V216h66.667v85.333H840V368h-85.333v85.333H688Z" /></svg></span>
                            {/* <span title="Valoracion"><svg xmlns="http://www.w3.org/2000/svg" className="SVG2" style={{ fill: valora.fill }} onClick={() => Valoracion()} height="40" viewBox="0 96 960 960" width="40"><path d="M333.333 837.001 480 749l146.667 89.001-39-166.668 129.001-112-170.001-15L480 386.999l-66.667 156.334-170.001 15 129.001 112.334-39 166.334ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-353.333Z" /></svg></span> */}
                        </div>

                        <div className="BoxForm"
                            style={{
                                width: "80%",
                                height: "70%",
                                margin: "auto"

                            }}>
                            <input type="text" onKeyDown={handleKeyDown} value={descripcion} onChange={(event) => setDescripcion(event.target.value)} style={{
                                width: "100%",
                                height: "40%",
                                border: "none",
                                color: "#0A6174",
                                fontSize: "25px",
                                textAlign: "center",
                                backgroundColor: "transparent",
                                borderBottom: "2px solid #0A6174",
                                outline: "none",
                                marginBottom: "2%",
                            }} />
                            <input type="button" value="Agregar" onClick={() => newFoda()} className="btnAgregar" />
                        </div>
                    </div>

                    <div className="zoneDatos" id="Datos" style={{ backgroundColor: Zona.color }}>
                        <div className="SVG">
                            <span title="Información"><svg xmlns="http://www.w3.org/2000/svg" className="SVG2" onClick={() => Lista(1)} height="40" viewBox="0 96 960 960" width="40"><path d="M448.667 776h66.666V536h-66.666v240Zm31.321-316q15.012 0 25.179-9.966 10.166-9.967 10.166-24.7 0-15.3-10.155-25.65-10.155-10.35-25.166-10.35-15.012 0-25.179 10.35-10.166 10.35-10.166 25.65 0 14.733 10.155 24.7Q464.977 460 479.988 460Zm.189 516q-82.822 0-155.666-31.5t-127.178-85.833Q143 804.333 111.5 731.44 80 658.546 80 575.667q0-82.88 31.5-155.773Q143 347 197.333 293q54.334-54 127.227-85.5Q397.454 176 480.333 176q82.88 0 155.773 31.5Q709 239 763 293t85.5 127Q880 493 880 575.823q0 82.822-31.5 155.666T763 858.544q-54 54.21-127 85.833Q563 976 480.177 976Zm.156-66.666q139 0 236.001-97.334 97-97.333 97-236.333t-96.875-236.001q-96.876-97-236.459-97-138.667 0-236 96.875Q146.666 436.417 146.666 576q0 138.667 97.334 236 97.333 97.334 236.333 97.334ZM480 576Z" /></svg></span>
                            <span title="Zona para borrar"><svg xmlns="http://www.w3.org/2000/svg" className="SVG3" onClick={() => Lista(0)} height="40" viewBox="0 96 960 960" width="40"><path d="M267.333 936q-27.5 0-47.083-19.583t-19.583-47.083V315.999H160v-66.666h192V216h256v33.333h192v66.666h-40.667v553.335q0 27-19.833 46.833T692.667 936H267.333Zm425.334-620.001H267.333v553.335h425.334V315.999Zm-328 469.335h66.666V399.333h-66.666v386.001Zm164 0h66.666V399.333h-66.666v386.001ZM267.333 315.999v553.335-553.335Z" /></svg></span>
                        </div>
                        <div className="Datos" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, Zona.Letra)}  >
                            {FodaData && !isLoading && !error && (
                                CardLista({ Nlista: Zona.Letra })
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </Page>
    );
};


const CardContentFoda = {
    postion: "relative",
    width: "95%",
    height: "120px",
    margin: "2% auto",
    boxShadow: "#71A1E5 0px 2px 8px 0px",
    backgroundColor: "transparent",
    border: "2px dashed #181818",    
    color: "#17B4C0",
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "15px",
    cursor: "move",
};
const BoxesCard = {
    width: "25%",
    height: "65%",    
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const SVG = {
    position: "absolute",
    top: "25%",
    right: "2%",
    fill: "#f5b041",
    cursor: "pointer",
    ':hover': {
        fill: "#3496db"
    },
}