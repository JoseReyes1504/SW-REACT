import { FC, useState, useEffect } from "react";
import '../../Css/Arrastre.css'
import '../../Css/Animaciones.css'
import Page from "../../componentes/Page";
import { useAddFodaEntrysMutation, useDelFodaEntrysMutation, useFodaEntry_TypeMutation, useFoda_Type_CountMutation, useFoda_Type_DiscMutation, useGetFodaEntrysQuery } from "../../store/services/FodaServicesRtk";

export const Foda: FC = () => {

    interface Card {
        _id: string;
        foda: string;
        empresa: string;
        descripcion: string;
        tipo: string;
        categorias?: string[];
        valoracion?: number;
        observacion?: string;
        logs?: { fecha: Date, descripcion: string, usuario: string }[];
    }

    const ID = localStorage.getItem("ID");
    const Foda = localStorage.getItem("foda");
    const NameEmpresa = localStorage.getItem("nameEmpresa");

    const [NewFodaEntry] = useAddFodaEntrysMutation();
    const [UpdateFodaEntryMu] = useFodaEntry_TypeMutation();
    const [deleteFodaEntry] = useDelFodaEntrysMutation();
    const [SumContEntry] = useFoda_Type_CountMutation();
    const [RestContEntry] = useFoda_Type_DiscMutation();


    const { data, isLoading, error, refetch } = useGetFodaEntrysQuery(Foda || "");
    const [dataFodaEntrys, setDataFodaEntrys] = useState<Card[]>([]);

    useEffect(() => {
        if (data) {
            setDataFodaEntrys(data);
        }
    }, [data]);

    const [Zona, setZona] = useState({
        "color": "#DAFCFC",
        "Letra": "N",
    });


    const [tocar, setTocar] = useState(1);
    const [valora, setValora] = useState({
        "display": "none",
        "fill": "white"
    });


    const [descripcion, setDescripcion] = useState("");
    const [refresh, setRefresh] = useState(true);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target === document.activeElement) {
            newFoda();
        }
    };

    const getList = (list: string): Card[] => {
        return dataFodaEntrys.filter(item => item.tipo === list);
    }

    const dragginOver = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    }

    const startDrag = (event: React.DragEvent<HTMLDivElement>, item: Card) => {
        if (item._id) {
            event.dataTransfer.setData('CardID', item._id);
        }
    }

    function newFoda() {
        if (descripcion === "") {
            alert("Descripción vacia");
        } else {
            NewFodaEntry([descripcion, Foda || '']).unwrap()
                .then(Response => {
                    refetch();
                })
        }

        setDescripcion("");
        if (refresh === true) {
            setRefresh(false);
        } else {
            setRefresh(true);
        }
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
        const itemIndex = dataFodaEntrys.findIndex(item => item._id === itemID);
        const item = dataFodaEntrys[itemIndex];

        if (item) {
            const newItem = { ...item, tipo: list };
            const newState = [...dataFodaEntrys];
            newState[itemIndex] = newItem;
            setDataFodaEntrys(newState);
        }

        if (list === "F") {
            UpdateFodaEntryMu(["F", item?._id]);
            SumContEntry([Foda, "F"]);            

        } else if (list === "O") {
            UpdateFodaEntryMu(["O", item?._id]);
            SumContEntry([Foda, "O"]);   

        } else if (list === "D") {
            UpdateFodaEntryMu(["D", item?._id]);
            SumContEntry([Foda, "D"]);   

        }
        else if (list === "A") {
            UpdateFodaEntryMu(["A", item?._id]);
            SumContEntry([Foda, "A"]);   

        } else if (list === "B") {
            deleteFodaEntry(item?._id);
            RestContEntry([Foda, item.tipo]);
        } else {
            UpdateFodaEntryMu(["N", item?._id]);
        }
    }

    interface Props {
        Nlista: string,
    }

    function CardLista(props: Props) {
        return (
            <>
                {getList(props.Nlista).map(item => (
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            minHeight: "45px",
                            height: "auto",
                            marginTop: "2%",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "5px",
                            color: "#0A6376",
                            // backgroundColor: "red",
                            textAlign: "center",
                            cursor: "pointer",
                            fontSize: "18px",
                        }}
                        key={item._id} draggable onDragStart={(event: React.DragEvent<HTMLDivElement>) => startDrag(event, item)}>
                        <div className="valoracion" style={{ width: "8%", display: valora.display }}>
                            <p style={{ margin: "auto" }}>0</p>
                        </div>
                        <p style={{ width: "100%" }}>
                            {item.descripcion}
                        </p>
                        <div className="Arrows" style={{
                            display: valora.display,
                            flexDirection: "column",
                            width: "10%"
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="SVG2" height="24" viewBox="0 96 960 960" width="24"><path d="m280 656 200-200 200 200H280Z" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="SVG2" height="24" viewBox="0 96 960 960" width="24"><path d="M480 696 280 496h400L480 696Z" /></svg>
                        </div>
                    </div>
                ))}
            </>
        )
    }

    return (

        <Page>
            <div className="Foda1 MostrarDerecha">
                <div className="zone1 MostrarUno">
                    <div className="Letra1">
                        <p>F</p>
                    </div>
                    <div className="Icono1">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "#B56EC3" }} height="40" viewBox="0 96 960 960" width="40">
                            <path d="m826 471-46.666-46.666 40-40.334L672 236.666l-40.334 40L584 229l30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857 441l-31 30ZM346 952q-23 23-56.5 23T233 952L94.666 813.666q-19-19.251-19-47.292t19-47.04L134 680l47.666 47-40.333 40L289 914.667l40-40.333L376 922l-30 30Zm397-317.333L818.667 559 497 237.333 421.333 313 743 634.667Zm-280 280L539.334 838 218 516.666 141.333 593 463 914.667Zm4-243.333 109.334-109-82.668-82.668-109 109.334L467 671.334Zm43 290q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L94.666 640q-19-18.956-19-46.978 0-28.022 19-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999L337 542l110-110-72.334-72q-18.999-18.956-18.999-46.978 0-28.022 18.999-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999l321.668 321.668q18.999 19.251 18.999 47.292t-18.999 47.04L790 681.334q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L624 609 514 719l72.334 72.334q18.999 19.251 18.999 47.292t-18.999 47.04L510 961.334Z" />
                        </svg>
                    </div>
                    <div className="Contenido1" id="Fortalezas" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "F")}>
                        {dataFodaEntrys && !isLoading && !error && (
                            CardLista({ Nlista: "F" })
                        )}
                    </div>
                </div>

                <div className="zone1 MostrarDos">
                    <div className="Letra1">
                        <p>O</p>
                    </div>
                    <div className="Icono1">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "#D63A64" }} height="40" viewBox="0 96 960 960" width="40">
                            <path d="m768 432.666-45.333-103.333-106-47.333 106-46.667 45.333-100 45.333 100 106 46.667-106 47.333L768 432.666ZM768 1016l-45.333-100.666-106-46.667 106-46.667L768 718.001 813.333 822l106 46.667-106 46.667L768 1016ZM341.999 873.333l-94.666-204.667L40 575.333 247.333 482l94.666-203.999L437.333 482l206.666 93.333-206.666 93.333-95.334 204.667Zm0-163.333 45.334-92.667 94-42-94-42-45.334-92.667-44.666 92.667-94.667 42 94.667 42L341.999 710Zm0-134.667Z" />
                        </svg>
                    </div>
                    <div className="Contenido1" id="Oportunidades" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "O")}>
                        {dataFodaEntrys && !isLoading && !error && (
                            CardLista({ Nlista: "O" })
                        )}
                    </div>

                </div>

                <div className="zone1 MostrarTres">
                    <div className="Letra1">
                        <p>D</p>
                    </div>
                    <div className="Icono1">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "#EF5858" }} height="40" viewBox="0 96 960 960" width="40">
                            <path d="m40 936 440-760 440 760H40Zm115.333-66.666h649.334L480 309.333 155.333 869.334ZM482.784 818q14.216 0 23.716-9.617 9.5-9.617 9.5-23.833 0-14.216-9.617-23.716-9.617-9.5-23.833-9.5-14.217 0-23.716 9.617-9.5 9.617-9.5 23.833 0 14.216 9.617 23.716 9.616 9.5 23.833 9.5Zm-33.45-114H516V488h-66.666v216ZM480 589.333Z" />
                        </svg>
                    </div>
                    <div className="Contenido1" id="Debilidades" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "D")}>
                        {dataFodaEntrys && !isLoading && !error && (
                            CardLista({ Nlista: "D" })
                        )}
                    </div>

                </div>

                <div className="zone1 MostrarCuatro">
                    <div className="Letra1">
                        <p>A</p>
                    </div>
                    <div className="Icono1">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "#5DA6E9" }} height="40" viewBox="0 96 960 960" width="40">
                            <path d="M389.333 712.667 480 624l90.667 88.667L619.333 664l-90-88.667 90-89.333-48.666-48.667L480 526l-90.667-88.667L340.667 486l90 89.333-90 88.667 48.666 48.667ZM480 975.333q-139.667-35-229.833-161.5Q160 687.333 160 535.333v-240l320-120 320 120v240q0 152-90.167 278.5-90.166 126.5-229.833 161.5ZM480 906q111.334-36.333 182.334-139.667 71-103.333 71-231V341.666L480 246.333l-253.334 95.333v193.667q0 127.667 71 231Q368.666 869.667 480 906Zm0-330Z" />
                        </svg>
                    </div>
                    <div className="Contenido1" id="Amenazas" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, "A")}>
                        {dataFodaEntrys && !isLoading && !error && (
                            CardLista({ Nlista: "A" })
                        )}
                    </div>
                </div>


                <div className="zoneDatos1" id="Datos" style={{ backgroundColor: Zona.color }}>
                    <div className="SVG">
                        <span title="Entidades"><svg xmlns="http://www.w3.org/2000/svg" className="SVG1" onClick={() => Lista(1)} height="40" viewBox="0 96 960 960" width="40"><path d="M153.216 776Q139 776 129.5 766.383q-9.5-9.617-9.5-23.833 0-14.216 9.617-23.716 9.617-9.5 23.833-9.5 14.216 0 23.716 9.617 9.5 9.617 9.5 23.833 0 14.216-9.617 23.716-9.617 9.5-23.833 9.5Zm0-166.667q-14.216 0-23.716-9.617-9.5-9.617-9.5-23.833 0-14.216 9.617-23.716 9.617-9.5 23.833-9.5 14.216 0 23.716 9.617 9.5 9.617 9.5 23.833 0 14.216-9.617 23.716-9.617 9.5-23.833 9.5Zm0-166.667q-14.216 0-23.716-9.617-9.5-9.617-9.5-23.833 0-14.216 9.617-23.716 9.617-9.5 23.833-9.5 14.216 0 23.716 9.617 9.5 9.617 9.5 23.833 0 14.216-9.617 23.716-9.617 9.5-23.833 9.5ZM286.667 776v-66.666H840V776H286.667Zm0-166.667v-66.666H840v66.666H286.667Zm0-166.667V376H840v66.666H286.667Z" /></svg></span>
                        <span title="Zona para borrar"><svg xmlns="http://www.w3.org/2000/svg" className="SVG3" onClick={() => Lista(0)} height="40" viewBox="0 96 960 960" width="40"><path d="M267.333 936q-27.5 0-47.083-19.583t-19.583-47.083V315.999H160v-66.666h192V216h256v33.333h192v66.666h-40.667v553.335q0 27-19.833 46.833T692.667 936H267.333Zm425.334-620.001H267.333v553.335h425.334V315.999Zm-328 469.335h66.666V399.333h-66.666v386.001Zm164 0h66.666V399.333h-66.666v386.001ZM267.333 315.999v553.335-553.335Z" /></svg></span>
                    </div>
                    <div className="Datos" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, Zona.Letra)}  >
                        {dataFodaEntrys && !isLoading && !error && (
                            CardLista({ Nlista: Zona.Letra })
                        )}
                    </div>
                </div>


                <div className="Formularios1">
                    <div className="SVG">
                        <span title="Crear Entidad"><svg xmlns="http://www.w3.org/2000/svg" className="SVG1" height="40" viewBox="0 96 960 960" width="40"><path d="M186.666 936q-27 0-46.833-19.833T120 869.334V282.666q0-27 19.833-46.833T186.666 216h382.668v66.666H186.666v586.668h586.668V486.666H840v382.668q0 27-19.833 46.833T773.334 936H186.666Zm134.001-158v-66.666H640V778H320.667Zm0-124.667v-66.666H640v66.666H320.667Zm0-124.667V462H640v66.666H320.667ZM688 453.333V368h-85.333v-66.667H688V216h66.667v85.333H840V368h-85.333v85.333H688Z" /></svg></span>
                        <span title="Valoracion"><svg xmlns="http://www.w3.org/2000/svg" className="SVG2" style={{ fill: valora.fill }} onClick={() => Valoracion()} height="40" viewBox="0 96 960 960" width="40"><path d="M333.333 837.001 480 749l146.667 89.001-39-166.668 129.001-112-170.001-15L480 386.999l-66.667 156.334-170.001 15 129.001 112.334-39 166.334ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-353.333Z" /></svg></span>
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
            </div>
        </Page>
    );
};