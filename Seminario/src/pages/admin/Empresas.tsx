import { FC, useState } from "react";
import '../../Css/TrabajandoCon.css';
import Page from "../../componentes/Page";
import { useNavigate } from "react-router-dom";
import { useAddEmpresaMutation, useEditEmpresaMutation } from "../../store/services/HomeServicesRTK";

interface EmpresasProps { }

export const Empresas: FC<EmpresasProps> = () => {

    const [createEmp, { isLoading, error }] = useAddEmpresaMutation();
    const [EditEmp] = useEditEmpresaMutation();

    const User = localStorage.getItem("Usuario");
    const UID = localStorage.getItem("UID");
    const NameEmpresa = localStorage.getItem("nameEmpresa");
    
    const Titulo = localStorage.getItem("Titulo");
    const Accion = localStorage.getItem("Accion");

    const navigate = useNavigate();

    const [Name, setName] = useState<string | null>(NameEmpresa);
    const [checked, setChecked] = useState<boolean>(true);


    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target === document.activeElement) {
            CrearEmpresa();
        }
    };


    function CrearEmpresa() {
        if (Name === "") {
            console.log("datos vacios");
        } else {
            if (Accion === "Agregar") {
                // console.log(User);
                createEmp(
                    {
                        "nombre": Name,
                        "user": User
                    }
                ).then(Response =>{
                    navigate("/home", { replace: true }); 
                })                
            } else if (Accion === "Editar") {
                EditEmp([UID, Name]).then(Response =>{
                    if(Response){
                        navigate("/home", { replace: true });
                    }                    
                });                                
            }
        }
    }

    return (
        <Page>
            <div className="PaginaPrincipal">
                <h1>{Titulo}</h1>
                <div className="Form">
                    <div className="box">
                        <label htmlFor="Nombre">Nombre Empresa</label>
                        <br />
                        <input type="text" onKeyDown={handleKeyDown} autoComplete="off" className="TextBox2" name="Nombre" id="txtNombre" value={Name || ''} onChange={(event) => setName(event.target.value)} />
                        <br />
                        <label htmlFor="Estado">Estado</label>
                        <br />

                        <div className="chkEstado">
                            <div className="round">
                                <input type="checkbox" id="checkbox-18" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                                <label htmlFor="checkbox-18"></label>
                            </div>
                        </div>
                        <input type="button" className="btnCrear" value={Titulo || ''} onClick={() => CrearEmpresa()} />
                    </div>
                </div>
            </div>
        </Page>
    );
};
