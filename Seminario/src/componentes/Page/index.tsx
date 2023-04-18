import { PropsWithChildren, useState } from 'react';
import '../../Css/sidebar.css'
import '../Page/page.css'
import { Navigate, useNavigate } from "react-router-dom";

interface IPageProps {
  useAbsoluteCenter?: boolean;
  showNavBar?: boolean;
  pageTitle?: string;
}
const Page = ({
  children,
  useAbsoluteCenter = false,
  showNavBar = true,
  pageTitle = "...",
}: PropsWithChildren<IPageProps>) => {
  let className = ['page'];
  if (useAbsoluteCenter) {
    className.push('absoluteCenter');
  }
  if (showNavBar) {
    className.push('withNavBar');
  }
  const navigate = useNavigate();

  const [Styles, setStyles] = useState({
    "Abrir": "-80%",
    "Abrir2": "-4.5%",
    "Rotate": "0deg%",
  });

  const [Abrir, setAbrir] = useState('-80%');
  const [Abrir2, setAbrir2] = useState('-4.5%');
  const [Rotate, setRotate] = useState('0deg');
  const [tocar, setTocar] = useState(1);

  function AbrirSideBar() {
    setTocar(tocar + 1);
    if (tocar == 1) {
      setStyles({
        Abrir: "0%",
        Abrir2: "12.2%",
        Rotate: "90deg",
      });

    } else if (tocar == 2) {
      setStyles({
        Abrir: "-80%",
        Abrir2: "-4.5%",
        Rotate: "0deg",
      });
      setTocar(1);
    }
  }

  function Ruta(NombreRuta: string) {
    navigate(NombreRuta, { replace: true });    
  }


  return (
    <>

      <div className="Sidebar" style={{ transform: 'translate(' + Styles.Abrir + ')' }}>
        <div className="Top">
          <div className="titulo">
            <h1>FODA CENTER</h1>
          </div>
          <svg className="svgSidebar" onClick={() => AbrirSideBar()} style={{ transform: "rotate(" + Styles.Rotate + ")" }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path d="M6 36V33H42V36ZM6 25.5V22.5H42V25.5ZM6 15V12H42V15Z" />
          </svg>
        </div>
        <div className="Enlaces">
          <nav id="menu">
            <ul>
              <li><a onClick={() => Ruta("/home")} ><i className="fas fa-sign-out-alt"></i>&nbsp;Inicio</a></li>
              <li><a onClick={() => Ruta("/Fodas")} ><i className="fas fa-sign-out-alt"></i>&nbsp;Foda</a></li>
              <li><a onClick={() => Ruta("/SignOn")}><i className="fas fa-sign-out-alt"></i>&nbsp;Salir</a></li>
              {/* <li><a  onClick={() => Ruta("/Cerr")} ><i className="fas fa-sign-out-alt"></i>&nbsp;Salir</a></li> */}
            </ul>
          </nav>
        </div>
      </div>
      <div className="Contenedor" style={{ transform: 'translate(' + Styles.Abrir2 + ')' }}>
        <main>
          {children}
        </main>
      </div>

      {/* <footer>
          <div>Todo los Derechos Reservados 2023 &copy;</div>
        </footer>       */}
    </>
  );
}

export default Page;
