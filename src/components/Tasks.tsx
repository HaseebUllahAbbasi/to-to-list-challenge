import React, { FC, useState } from "react";
import { columsData } from "../data";
import { Columns, TaskItem } from '../types/index'
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
const onDragEnd = (
  result: DropResult,
  data: Columns[],
  setColumns: {
    (value: React.SetStateAction<Columns[]>): void;
    (arg0: any[]): void;
  }
) => {

  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    const Pickedindex = source.index;
    const DroppedIndex = destination.index;
    const SourceIndex = data.findIndex(
      (item: { id: any }) => item.id === sourceId
    );
    const DestIndex = data.findIndex(
      (item: { id: any }) => item.id === destinationId
    );
    const NewItem = data[SourceIndex].items.splice(Pickedindex, 1);
    data[DestIndex].items.splice(DroppedIndex, 0, NewItem[0]);
    setColumns([...data]);
  }
  else {
    const colId = source.droppableId;
    const Pickedindex = source.index;
    const SourceIndex = data.findIndex(
      (item: { id: any }) => item.id === colId
    );
    const removed = data[SourceIndex].items.splice(Pickedindex, 1);
    data[SourceIndex].items.splice(destination.index, 0, removed[0]);
    setColumns([...data])

  }

};
const onDelete = (
  Pickedindex: number,
  data: Columns[],
  setColumns: {
    (value: React.SetStateAction<Columns[]>): void;
    (arg0: any[]): void;
  },
  ColName: string,
  ColIndex: number
) => {
  data[ColIndex].items.splice(Pickedindex, 1);
  setColumns([...data]);
};

const onComplete = (
  Pickedindex: number,
  data: { items: any[] }[],
  setColumns: {
    (value: React.SetStateAction<Columns[]>): void;
    (arg0: any[]): void;
  },
  ColName: string,
  ColIndex: number
) => {
  if (ColName === "Completed") {
    alert("Already Completed ");
    return;
  }
  const NewItem = data[ColIndex].items.splice(Pickedindex, 1);
  data[1].items.splice(0, 0, NewItem[0]);
  setColumns([...data]);
};

const Tasks: FC = () => {
  const MySwal = withReactContent(Swal);

  const [columns, setColumns] = useState<Columns[]>([...columsData]);
  const [taskText, setTaskText] = useState<string>("");
  return (

    <div className="container">
      <div className="text-center display-2 my-2 mb-4" style={{ color: "white", fontWeight: "bolder" }}>
        To Do List Challenge
      </div>
      <div className="container row">
        <div className="col-md-6 col-xs-12 mb-3">
          <input
            className="form-control"
            // style={{ width: "" }}

            value={taskText}
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
                    const data = [...columns];
                    const newTask: TaskItem = {

                      id: uuidv4(),
                      text: result.value
                    }
                    data[0].items.splice(0, 0, newTask);
                    setColumns([...data]);

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
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="d-flex justify-content-around   flex-wrap">
          {columns.map((colItem, ColIndex) => (
            <div className="my-2" key={ColIndex}>
              <div>
                <h2 className="text-center" style={{ color: "white" }}>{colItem.name}</h2>
                <Droppable droppableId={colItem.id} key={colItem.id}>
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

                        {colItem.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (

                                  <div
                                    hidden={!item.text.includes(taskText)}
                                    className="card mx-2 mb-3 mt-2"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                    style={{
                                      userSelect: "none",
                                      paddingTop: "10px",
                                      borderRadius: "10px",
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      minWidth: "120px",


                                      backgroundColor: snapshot.isDragging
                                        ? "#F5E0B7"
                                        : "#E8EDDF",
                                      color: "black",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div
                                      className="card-body display-6 text-center"
                                      style={{ padding: 10, minHeight: "110px", fontSize: "2rem", }}
                                    >
                                      {item.text
                                      }
                                    </div>
                                    <div className="card-footer d-flex  justify-content-around   flex-wrap">
                                      <button
                                        title="Delete"
                                        className="btn d-block btn-danger"
                                        onClick={() => {
                                          Swal.fire({
                                            title: 'Are you sure?',
                                            text: "do you  want to delete !",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#d33',
                                            cancelButtonColor: '#3085d6 ',
                                            confirmButtonText: 'Yes, delete it!'
                                          }).then((result) => {
                                            if (result.isConfirmed) {

                                              onDelete(
                                                index,
                                                columns,
                                                setColumns,
                                                colItem.name,
                                                ColIndex
                                              );
                                              Swal.fire(
                                                'Deleted!',
                                                'Task Deleted',
                                                'success'
                                              )
                                            }
                                          })
                                        }}
                                      >
                                        <span role="img" aria-label="Remove">
                                          ❌
                                        </span>
                                      </button>
                                      <button
                                        title="Edit Task"
                                        className="btn btn-warning"
                                        onClick={() => {

                                          MySwal.fire(
                                            {
                                              title: 'Modify Task 📝',
                                              input: 'text',
                                              inputValue: item.text,
                                              inputAttributes:
                                              {
                                                autocapitalize: 'off'
                                              },
                                              showCancelButton: true,
                                              confirmButtonText: 'Edit',
                                              showLoaderOnConfirm: true,
                                              allowOutsideClick: () => !Swal.isLoading()
                                            }
                                          )
                                            .then((result) => {
                                              if (result.isConfirmed) {
                                                const data = [...columns];
                                                data[ColIndex].items[index].text = result.value;
                                                setColumns([...data]);
                                                Swal.fire({
                                                  title: `Task Modified`,
                                                  text: (result.value),
                                                })

                                              }
                                            })


                                        }}
                                      >
                                        <span role="img" aria-label="Edit">
                                          📝
                                        </span>
                                      </button>
                                      <button
                                        className="btn btn-success"
                                        title="Complete"
                                        onClick={() => {
                                          onComplete(
                                            index,
                                            columns,
                                            setColumns,
                                            colItem.name,
                                            ColIndex
                                          );
                                        }}
                                      >
                                        ✔
                                      </button>
                                    </div>
                                  </div>

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

          ))}
        </div>
      </DragDropContext>

    </div>
  )
}
export default Tasks;