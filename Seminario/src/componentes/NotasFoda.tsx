// import { FC, Ref, useRef } from 'react';
// import './Card.css';

// interface Props {
//   codigo: number;
//   Nombre: string;
//   Estado: string;
//   Tipo: number;
//   Drag?: any;
// }


// export const Card: FC<Props> = ({ Nombre, codigo, Estado, Tipo, Drag }) => {
  
// const startDrag = (event: React.DragEvent<HTMLDivElement>, item: Props) => {
//   if (item.codigo) {
//       event.dataTransfer.setData('CardID', item.codigo.toString());
//       console.log(item);
//   }
// }

//   return (
//     <div className={"Nota"} key={codigo} draggable onDragStart={(event: React.DragEvent<HTMLDivElement>) => startDrag(event, item)}>
//       <p>
//         {}
//       </p>
//     </div>
//   );
// };
