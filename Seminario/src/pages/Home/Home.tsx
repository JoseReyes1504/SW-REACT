import { FC, useState, useEffect, Key } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../componentes/Card";
import Page from "../../componentes/Page";
import '../../Css/Animaciones.css';
import { useGetEmpresasQuery } from "../../store/services/HomeServicesRTK";

interface Card {
  _id: string;
  codigo: string,
  nombre: string,
  status: string
}

export const Home: FC = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("Usuario");

  const { data, isLoading, error } = useGetEmpresasQuery(user);

  function CardList() {
    return (
      <div className="ListaCards">
        {data.map((datos: { _id: string; nombre: string; status: string; }) => (
          <Card
            key={datos._id}
            _id={datos._id}
            Nombre={datos.nombre}
            Estado={datos.status}
            Tipo={0}
          />
        ))}
      </div>
    );
  }

  function CargarEmpresas() {
    localStorage.setItem("ID", "");
    localStorage.setItem("nameEmpresa", "");
    localStorage.setItem("Titulo", "Crear Empresa");
    localStorage.setItem("Accion", "Agregar");

    navigate("/Empresas", { replace: true });
  }

  return (
    <Page>
      {!data || data.length === 0 ? (
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="ArrowSignal" height="48" viewBox="0 96 960 960" width="48"><path d="m248 810-42-42 412-412H240v-60h480v480h-60V398L248 810Z" /></svg>
          <span title="Agregar Empresa"><svg xmlns="http://www.w3.org/2000/svg" onClick={() => CargarEmpresas()} className="SVGAdd" height="48" viewBox="0 96 960 960" width="48"><path d="M80 936V216h390v165h410v340h-60V441H470v105h80v60h-80v105h80v60h-80v105h195v60H80Zm60-60h105V771H140v105Zm0-165h105V606H140v105Zm0-165h105V441H140v105Zm0-165h105V276H140v105Zm165 495h105V771H305v105Zm0-165h105V606H305v105Zm0-165h105V441H305v105Zm0-165h105V276H305v105Zm508 635v-87h-88v-60h88v-88h60v88h87v60h-87v87h-60ZM655 606v-60h60v60h-60Zm0 165v-60h60v60h-60Z" /></svg></span>

          <h1 style={{ color: "white" }}>No hay datos</h1>
        </div>
      ) : (
        <div className="PaginaPrincipal mostrarAbajo">
          <span title="Agregar Empresa"><svg xmlns="http://www.w3.org/2000/svg" onClick={() => CargarEmpresas()} className="SVGAdd" height="48" viewBox="0 96 960 960" width="48"><path d="M80 936V216h390v165h410v340h-60V441H470v105h80v60h-80v105h80v60h-80v105h195v60H80Zm60-60h105V771H140v105Zm0-165h105V606H140v105Zm0-165h105V441H140v105Zm0-165h105V276H140v105Zm165 495h105V771H305v105Zm0-165h105V606H305v105Zm0-165h105V441H305v105Zm0-165h105V276H305v105Zm508 635v-87h-88v-60h88v-88h60v88h87v60h-87v87h-60ZM655 606v-60h60v60h-60Zm0 165v-60h60v60h-60Z" /></svg></span>
          <h1 style={{ color: "white" }} className="TituloPagina">Empresas</h1>
          {data && !isLoading && !error && (
            CardList()
          )}
        </div>
      )}

    </Page>
  );
};
