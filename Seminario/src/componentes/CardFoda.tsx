import { FC, Ref, useRef } from 'react';
import "./FodaCard.css"
import { useNavigate } from "react-router-dom";


interface Props {
    _id: string;
    Nombre: string;
    Entradas: number;
    F: number;
    O: number;
    D: number;
    A: number;
    Estado: string;
}


export const FodaCard: FC<Props> = ({ Nombre, Entradas, F, O, D, A, Estado, }) => {

    //   const CardRef1 = useRef<HTMLButtonElement>(null);
    //   const navigate = useNavigate();

    //   function CargarLocalStorage(Titulo?: string) {
    //     localStorage.setItem("UID", CardRef1.current?.dataset.uid || "");
    //     localStorage.setItem("ID", CardRef1.current?.dataset.id || "");
    //     localStorage.setItem("nameEmpresa", CardRef1.current?.dataset.nameempresa || "");
    //     localStorage.setItem("Titulo", Titulo || "");
    //     }

    //   function CargarFoda() {
    //     CargarLocalStorage();
    //     console.log(localStorage.getItem("ID"));
    //     console.log(localStorage.getItem("nameEmpresa"));
    //     navigate("/Foda", { replace: true });
    //   }

    //   function CargarEmpresa() {
    //     CargarLocalStorage("Editar Empresa");
    //     console.log(localStorage.getItem("ID"));
    //     console.log(localStorage.getItem("nameEmpresa"));
    //     localStorage.setItem("Accion", "Editar");
    //     navigate("/Empresas", { replace: true });
    //   }

    return (
        <div className="CardFodaContent">
            <p>{Nombre}</p>
            <div className="BoxesCardFoda">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m826 471-46.666-46.666 40-40.334L672 236.666l-40.334 40L584 229l30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857 441l-31 30ZM346 952q-23 23-56.5 23T233 952L94.666 813.666q-19-19.251-19-47.292t19-47.04L134 680l47.666 47-40.333 40L289 914.667l40-40.333L376 922l-30 30Zm397-317.333L818.667 559 497 237.333 421.333 313 743 634.667Zm-280 280L539.334 838 218 516.666 141.333 593 463 914.667Zm4-243.333 109.334-109-82.668-82.668-109 109.334L467 671.334Zm43 290q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L94.666 640q-19-18.956-19-46.978 0-28.022 19-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999L337 542l110-110-72.334-72q-18.999-18.956-18.999-46.978 0-28.022 18.999-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999l321.668 321.668q18.999 19.251 18.999 47.292t-18.999 47.04L790 681.334q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L624 609 514 719l72.334 72.334q18.999 19.251 18.999 47.292t-18.999 47.04L510 961.334Z" /></svg>
                <p>F</p>
                <p>{F}</p>
            </div>
            <div className="BoxesCardFoda">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m826 471-46.666-46.666 40-40.334L672 236.666l-40.334 40L584 229l30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857 441l-31 30ZM346 952q-23 23-56.5 23T233 952L94.666 813.666q-19-19.251-19-47.292t19-47.04L134 680l47.666 47-40.333 40L289 914.667l40-40.333L376 922l-30 30Zm397-317.333L818.667 559 497 237.333 421.333 313 743 634.667Zm-280 280L539.334 838 218 516.666 141.333 593 463 914.667Zm4-243.333 109.334-109-82.668-82.668-109 109.334L467 671.334Zm43 290q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L94.666 640q-19-18.956-19-46.978 0-28.022 19-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999L337 542l110-110-72.334-72q-18.999-18.956-18.999-46.978 0-28.022 18.999-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999l321.668 321.668q18.999 19.251 18.999 47.292t-18.999 47.04L790 681.334q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L624 609 514 719l72.334 72.334q18.999 19.251 18.999 47.292t-18.999 47.04L510 961.334Z" /></svg>
                <p>O</p>
                <p>{O}</p>
            </div>
            <div className="BoxesCardFoda">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m826 471-46.666-46.666 40-40.334L672 236.666l-40.334 40L584 229l30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857 441l-31 30ZM346 952q-23 23-56.5 23T233 952L94.666 813.666q-19-19.251-19-47.292t19-47.04L134 680l47.666 47-40.333 40L289 914.667l40-40.333L376 922l-30 30Zm397-317.333L818.667 559 497 237.333 421.333 313 743 634.667Zm-280 280L539.334 838 218 516.666 141.333 593 463 914.667Zm4-243.333 109.334-109-82.668-82.668-109 109.334L467 671.334Zm43 290q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L94.666 640q-19-18.956-19-46.978 0-28.022 19-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999L337 542l110-110-72.334-72q-18.999-18.956-18.999-46.978 0-28.022 18.999-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999l321.668 321.668q18.999 19.251 18.999 47.292t-18.999 47.04L790 681.334q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L624 609 514 719l72.334 72.334q18.999 19.251 18.999 47.292t-18.999 47.04L510 961.334Z" /></svg>
                <p>D</p>
                <p>{D}</p>
            </div>
            <div className="BoxesCardFoda">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="m826 471-46.666-46.666 40-40.334L672 236.666l-40.334 40L584 229l30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857 441l-31 30ZM346 952q-23 23-56.5 23T233 952L94.666 813.666q-19-19.251-19-47.292t19-47.04L134 680l47.666 47-40.333 40L289 914.667l40-40.333L376 922l-30 30Zm397-317.333L818.667 559 497 237.333 421.333 313 743 634.667Zm-280 280L539.334 838 218 516.666 141.333 593 463 914.667Zm4-243.333 109.334-109-82.668-82.668-109 109.334L467 671.334Zm43 290q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L94.666 640q-19-18.956-19-46.978 0-28.022 19-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999L337 542l110-110-72.334-72q-18.999-18.956-18.999-46.978 0-28.022 18.999-47.022l75.668-76.334q19.251-18.999 47.292-18.999t47.04 18.999l321.668 321.668q18.999 19.251 18.999 47.292t-18.999 47.04L790 681.334q-18.956 18.999-46.978 18.999-28.022 0-47.022-18.999L624 609 514 719l72.334 72.334q18.999 19.251 18.999 47.292t-18.999 47.04L510 961.334Z" /></svg>
                <p>A</p>
                <p>{A}</p>
            </div>
            <div className="BoxesCardFoda">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="M446.667 856V609.333H200v-66.666h246.667V296h66.666v246.667H760v66.666H513.333V856h-66.666Z" /></svg>
            </div>
        </div>
    );
};
