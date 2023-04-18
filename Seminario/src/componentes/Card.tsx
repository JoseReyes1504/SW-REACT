import { FC, Ref, useRef } from 'react';
import './Card.css';
import {useNavigate } from "react-router-dom";


interface Props {
  _id: string  
  Nombre: string;
  Estado: string;
  Tipo: number;
  clase?: any;
}


export const Card: FC<Props> = ({ Nombre, Estado, _id }) => {

  const CardRef1 = useRef<any>(null);
  const navigate = useNavigate();

  function CargarLocalStorage(Titulo?: string) {
    localStorage.setItem("UID", CardRef1.current?.dataset.uid || "");    
    localStorage.setItem("nameEmpresa", CardRef1.current?.dataset.nameempresa || "");
    localStorage.setItem("Titulo", Titulo || "");
    }

  function CargarFoda() {
    CargarLocalStorage();    
    navigate("/Fodas", { replace: true });
  }

  function CargarEmpresa() {
    CargarLocalStorage("Editar Empresa");    
    localStorage.setItem("Accion", "Editar");
    navigate("/Empresas", { replace: true });
  }

  return (
    <div className="ListaCards">
      <div className="Empresas" key={_id}>
        <span title="Editar Empresa"> <svg xmlns="http://www.w3.org/2000/svg" className='SVGEdit' onClick={() => CargarEmpresa()} height="40" viewBox="0 96 960 960" width="40"><path d="M186.666 869.334h48l410.335-410.336-47.999-47.999-410.336 410.335v48Zm600.001-458.335L644.668 269.666 691.334 223q19-19 46.833-19 27.834 0 46.833 19l48 48q19 18.999 19.333 46.499.334 27.5-18.666 46.5l-47 47Zm-47.333 47.666L261.999 936H120V794.001l477.335-477.335 141.999 141.999Zm-118.333-23.666-23.999-24 47.999 47.999-24-23.999Z" /></svg></span>
        {/* <div className="contenedorImagen">
          <div className="Imagen"></div>
        </div> */}

        <div className="datos">
          <h1>{Nombre}</h1>
          <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="M120 936V379.333h163.333V216h393.334v326.667H840V936H528.667V772.667h-97.334V936H120Zm66.666-66.666h96.667v-96.667h-96.667v96.667Zm0-163.334h96.667v-96.667h-96.667V706Zm0-163.333h96.667V446h-96.667v96.667ZM350 706h96.667v-96.667H350V706Zm0-163.333h96.667V446H350v96.667Zm0-163.334h96.667v-96.667H350v96.667ZM513.333 706H610v-96.667h-96.667V706Zm0-163.333H610V446h-96.667v96.667Zm0-163.334H610v-96.667h-96.667v96.667Zm163.334 490.001h96.667v-96.667h-96.667v96.667Zm0-163.334h96.667v-96.667h-96.667V706Z" /></svg>
          {/* <p className='Codigo'>{_id}</p> */}
          <p>{Estado}</p>
          <div className="boton">
            <input ref={CardRef1 || ''} type="button" className='btnCard' value="FODA" data-nameempresa={Nombre} data-uid={_id} onClick={() => CargarFoda()} />
          </div>
        </div>
      </div>
    </div>
  );
};
