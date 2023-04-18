import { FC, useState } from 'react';

interface Props {
    translate: string,
    mensaje: string,
}

export const MSJ: FC<Props> = ({translate, mensaje}) => {

    const [tocarB, setTocarB] = useState(1);

    const [MSJS, setMSJS] = useState({
        "Translate": "-120px",
        "Mensaje": "mensaje"
    });

     function MostrarMSJ() {
        setTocarB(tocarB + 1);
        if (tocarB == 1) {
            setMSJS({ Translate: translate, Mensaje: mensaje });
        } else if (tocarB >= 2) {
            setMSJS({ Translate: "-120px", Mensaje: "mensaje" });
            setTocarB(1);
        }
    }

    return (
        <div className="Mensaje" onClick={() => MostrarMSJ()}
            style={{
                position: "fixed",
                top: "10",
                right: "5",
                margin: "1%",
                width: "400px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#96CEB3",
                borderRadius: "15px",
                transition: "all 800ms",
                zIndex: 5,
                transform: "translateY(" + MSJS.Translate + ")",
            }}>
            <p id="MSJ">{MSJS.Mensaje}</p>
        </div>
    )
}
