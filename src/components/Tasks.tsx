import React, { FC, useState } from "react";
import { columsData } from "../data";
import { TaskItem, ToDo } from '../types/index'
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Task from "./Task";

/**
 *  Handling the Dragging Event and checking valid point to be dragged
 *  then Changing Data Accordingly
 * **/
const onDragEnd = (
  result: DropResult,
  data: ToDo,
  setData: {
    (value: React.SetStateAction<ToDo>): void;
    (arg0: any): void;
  }
) => {

  if (!result.destination) return;
  const { source, destination } = result;

  const Pickedindex = source.index;
  const removed = data.items.splice(Pickedindex, 1);
  data.items.splice(destination.index, 0, removed[0]);
  setData({ ...data })
};
/**
 * Deleting the Selected Task
 * */



const Tasks: FC = () => {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState<ToDo>({ ...columsData });
  const [searchText, setTaskText] = useState<string>("");



  return (

    <div className="container">
      <div className="text-center display-2 my-2 mb-4" style={{ color: "white", fontWeight: "bolder" }}>
        To Do List Challenge
      </div>
      <div className="container row">
        <div className="col-md-6 col-xs-12 mb-3">
          <input
            className="form-control"

            value={searchText}
            placeholder={"Search"}
            onChange={(e) => setTaskText(e.target.value)}
          />

        </div>
        <div className="col-md-6 col-xs-12 text-center">
          <button
            className="btn btn-dark"
            style={{ backgroundColor: "yellow", color: "black" }}
            onClick={() => {
              MySwal.fire(
                {
                  title: 'Enter Task 🔆',
                  input: 'text',
                  inputAttributes:
                  {

                    autocapitalize: 'off'
                  },
                  showCancelButton: true,
                  confirmButtonText: 'Add',
                  showLoaderOnConfirm: true,
                  allowOutsideClick: () => !Swal.isLoading()
                }
              )
                .then((result) => {
                  if (result.value === "") {
                    Swal.fire({
                      title: `Task was not added`,
                      text: "Please Enter the task again",
                    })
                    return;
                  }

                  if (result.isConfirmed) {
                    const newData = { ...data };
                    const newTask: TaskItem = {
                      id: uuidv4(),
                      text: result.value,
                      completed: false,

                    }
                    newData.items.splice(0, 0, newTask);
                    setData(newData);

                    Swal.fire({
                      title: `Task Added`,
                      text: (result.value),
                    })
                  }
                })
            }}
          >
            Lets Add Task &nbsp;
            <span role="img" aria-label="add">
              ➕
            </span>
          </button>
        </div>
      </div>

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, data, setData)}
      >
        <div className="d-flex justify-content-around   flex-wrap">
          (
          <div className="my-2" key={0}>
            <div>
              <h2 className="text-center" style={{ color: "white" }}>{data.name}</h2>
              <Droppable droppableId={data.id} key={data.id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#FFAE03"
                          : "lightyellow",
                        padding: "15px",
                        borderRadius: "10px",
                        maxWidth: "400px",
                        minWidth: "250px",
                        minHeight: "250px"
                      }}
                    >

                      {data.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (

                                <Task data={data} index={index} provided={provided} snapshot={snapshot} ToDoItemData={item} setData={setData} searchText={searchText} />

                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>

            </div>
          </div>

          )
        </div>
      </DragDropContext>

    </div>
  )
}
export default Tasks;