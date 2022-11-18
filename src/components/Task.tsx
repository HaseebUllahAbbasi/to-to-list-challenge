import React, { FC } from "react"
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd"
import Swal from 'sweetalert2'

import { TaskItem, ToDo } from "../types"


/**
 * Deleting the Selected Task
 * */

const onDelete = (
  Pickedindex: number,
  data: ToDo,
  setData: {
    (value: React.SetStateAction<ToDo>): void;
    (arg0: any[]): void;
  },
) => {
  data.items.splice(Pickedindex, 1);
  setData({ ...data });
};

/**
 * Completing the Task  if not  Completed
 * 
 * */
const onComplete = (
  Pickedindex: number,
  data: ToDo,
  setData: {
    (value: React.SetStateAction<ToDo>): void;
    (arg0: any[]): void;
  },
  completed: boolean
) => {

  if (completed)
    data.items[Pickedindex].completed = false;
  else
    data.items[Pickedindex].completed = true;
  setData({ ...data });
};


type TaskProps = {
  ToDoItemData: TaskItem,
  searchText: string,
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot,
  index: number,
  data: ToDo,
  setData: {
    (value: React.SetStateAction<ToDo>): void;
    (arg0: any): void;
  }

}

const Task: FC<TaskProps> = ({ ToDoItemData: item, searchText, provided, snapshot, index, setData, data: columns }) => {

  return (
    <div
      hidden={!item.text.includes(searchText)}
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
          : item.completed === true ? "#E5D4CE" : "#E8EDDF",
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
                  setData,
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

            Swal.fire(
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
                  const newData = columns;
                  newData.items[index].text = result.value;
                  setData({ ...newData });
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
        {
          item.completed === false ?
            <button
              className="btn btn-success"
              title="Complete"
              onClick={() => {

                Swal.fire({
                  title: 'Are you sure?',
                  text: item.completed === true ? "do you  want to Add To Task Again !" : "do you  want to Complete !",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: 'green',
                  cancelButtonColor: '#3085d6 ',
                  confirmButtonText: 'Yes, Complete it!'
                }).then((result) => {
                  if (result.isConfirmed) {

                    onComplete(
                      index,
                      columns,
                      setData,
                      item.completed,
                    );
                    Swal.fire(
                      'Completed',
                      'Task Completed',
                      'success'
                    )
                  }
                })
              }}
            >
              ✔
            </button> :
            <button
              className="btn btn-dark"
              title="Add To Task Again"
              onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: item.completed === true ? "do you  want to Add To Task Again !" : "do you  want to Complete !",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: 'black',
                  cancelButtonColor: '#3085d6 ',
                  confirmButtonText: 'Yes, Complete it!'
                }).then((result) => {
                  if (result.isConfirmed) {

                    onComplete(
                      index,
                      columns,
                      setData,
                      item.completed,
                    );
                    Swal.fire(
                      'Completed',
                      'Task Completed',
                      'success'
                    )
                  }
                })

              }}
            >

              <span role="img" aria-label="Add Again">
                ➕
              </span>
            </button>

        }
      </div>
    </div >



  )

}
export default Task;
