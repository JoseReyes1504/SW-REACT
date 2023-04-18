import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, SignIn } from "./SignServices";
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/Slices/secSlice';

import '../../Css/login.css'

export const SignOn: FC = () => {    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: '',
        password: '',
        usuario: ''
    });

    const [Styles, setStyles] = useState({
        "btnSignOn": "white",
        "btnSignIn": "white",
        "btnSignOnName": "Entrar",
        "btnSignInName": "Registrar",
        "Color": "black"
    });

    const [Boton, setBoton] = useState(1);
    const [Accion, setAccion] = useState("Entrar");

    const Captura = (name: string, value: string) => {
        setState({ ...state, [name]: value });
        // console.log(state);
    }

    function Entrar() {
        if (Accion === "Entrar") {        
            Login(state.email, state.password).then(Response => {                
                if(Response.error){                      
                    alert("Correo o Contraseña incorrectas");
                }else{
                    console.log(Response.Token);
                    const newToken = Response.Token;
                    localStorage.setItem("Token", newToken);
                    dispatch(setToken(newToken));
                    localStorage.setItem("Usuario", Response.Usuario);
                    navigate("/Presentacion", { replace: true });
                }
            });

        } else if (Accion === "Registrar") {
            SignIn(state.email, state.password, state.usuario);
        }
    }

    function CrearCuenta() {
        setBoton(Boton + 1);
        if (Boton == 1) {
            setAccion("Registrar");
            setStyles({
                btnSignOn: " #58d68d ",
                btnSignIn: " #3496db",
                btnSignOnName: "Crear Cuenta",
                btnSignInName: "Login",
                Color: "white",
            });
            setState({
                email: "",
                password: "",
                usuario: ''
            })
        } else if (Boton >= 2) {
            setAccion("Entrar");
            setStyles({
                btnSignOn: "white",
                btnSignIn: "white",
                btnSignOnName: "Entrar",
                btnSignInName: "Registrar",
                Color: "black",
            });
            setBoton(1);
        }
    }

    return (
        <div className="ContenedorLogin">
            <div className="ContenedorImagen">
            </div>
            <div className="ContenedorFormulario">
                <div className="Box">
                    {Accion === "Entrar" && (
                        <p className="Eslogan">Todavía no tienes cuenta?</p>
                    )}
                    <input type="submit" className="BotonSign" id="btnLogin" style={{ backgroundColor: Styles.btnSignIn, color: Styles.Color }} onClick={() => CrearCuenta()} value={Styles.btnSignInName} />

                    <h1 className="h1">{Accion === "Entrar" ? "LOGIN" : "Registro"}</h1>


                    <div className="Formulario">
                        {Accion === "Registrar" && (
                            <>
                                <label className="labels">Usuario</label>
                                <input className="TextBox" autoComplete="off" value={state.usuario} type="text" onChange={(event) => Captura('usuario', event.target.value)} />
                            </>
                        )}
                        <label className="labels">Correo</label>
                        <input className="TextBox" autoComplete="off" value={state.email} type="email" onChange={(event) => Captura('email', event.target.value)} />
                        <label className="labels">Contraseña</label>
                        <input type="password" autoComplete="off" className="TextBox" value={state.password} onChange={(event) => Captura('password', event.target.value)} />
                        <div className="row">
                        </div>
                    </div>
                    <div className="Botones">
                        <input type="submit" className="BotonSignOn" id="btnLogin" style={{ backgroundColor: Styles.btnSignOn, color: Styles.Color }} value={Styles.btnSignOnName} onClick={() => Entrar()} />
                    </div>

                </div>
            </div>
        </div>
    );
};
