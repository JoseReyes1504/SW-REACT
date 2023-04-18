import { FC, useState } from "react";
import '../Css/Foda.css'
import Page from "./Page";

interface Task {
    Id: number,
    Titulo: string,
    Contenido: string,
    List?: number
}

export const DragAndDrop: FC = () => {

    const [task, setTask] = useState<Task[]>([
        {
            Id: 1,
            Titulo: 'Tarea 1',
            Contenido: 'lorem',
            List: 1
        },
        {
            Id: 2,
            Titulo: 'Tarea 2',
            Contenido: 'lorem ipsund 2',
            List: 1
        },
        {
            Id: 3,
            Titulo: 'Tarea 3',
            Contenido: 'lorem ipsund 3',
            List: 1
        },
        {
            Id: 4,
            Titulo: 'Tarea 4',
            Contenido: 'lorem ipsund de forties ladius on mixico',
            List: 2
        },
        {
            Id: 5,
            Titulo: 'Tarea 5',
            Contenido: 'lorem ipsund de forties ladius',
            List: 2
        },
    ]);

    const getList = (list: number): Task[] => {
        return task.filter(item => item.List === list);
    }

    const startDrag = (event: React.DragEvent<HTMLDivElement>, item: Task) => {
        event.dataTransfer.setData('CardID', item.Id.toString());
        console.log(item);
    }

    const dragginOver = (evt: React.DragEvent<HTMLDivElement>) => {
        evt.preventDefault();
    }

    const OnDrop = (event: React.DragEvent<HTMLDivElement>, list: number) => {
        const itemID = event.dataTransfer.getData("CardID");
        const item = task.find(item => item.Id === parseInt(itemID));
        console.log(item);
        if (item) {
            item.List = list;
           
            const newState = task.map(tasks => {
                if (tasks.Id === parseInt(itemID)){
                    return item
                }
                return tasks;
            })
            setTask(newState);
        }
    }

    return (
        <>
            <Page>
                <h1>
                    Arrastrar y soltar &nbsp;
                </h1>
                <div className="drag-and-drop">
                    <div className="column column--1">
                        <h3>Tareas por hacer</h3>
                        <div className="dd-zone" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, 1)}>
                            {getList(1).map(item => (
                                <div className="dd-element" key={item.Id} draggable onDragStart={(event: React.DragEvent<HTMLDivElement>) => startDrag(event, item)}>
                                    <strong className="tittle">{item.Titulo}</strong>
                                    <p className="body">{item.Contenido}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="drag-and-drop">
                        <div className="column column--2">
                            <h3>Tareas hechas</h3>
                            <div className="dd-zone" draggable="true" onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragginOver(event)} onDrop={(event: React.DragEvent<HTMLDivElement>) => OnDrop(event, 2)}>
                                {getList(2).map(item => (
                                    <div className="dd-element" key={item.Id} draggable onDragStart={(event: React.DragEvent<HTMLDivElement>) => startDrag(event, item)}>
                                        <strong className="tittle">{item.Titulo}</strong>
                                        <p className="body">{item.Contenido}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        </>
    )
}