import React, { FC } from "react"
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd"
import Swal from 'sweetalert2'

import { TaskItem, Columns } from "../types"


/**
 * Deleting the Selected Task
 * */

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

/**
 * Completing the Task  if not  Completed
 * 
 * */
const onComplete = (
  Pickedindex: number,
  data: Columns[],
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


  // const NewItem = data[ColIndex].items.splice(Pickedindex, 1);
  // data[1].items.splice(0, 0, NewItem[0]);
  setColumns([...data]);
};


type TaskProps = {
  item: TaskItem,
  searchText: string,
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot,
  index: number,
  columns: Columns[],
  setColumns: {
    (value: React.SetStateAction<Columns[]>): void;
    (arg0: any[]): void;
  }
  colItem: Columns,
  ColIndex: number,
}

const Task: FC<TaskProps> = ({ item, searchText, provided, snapshot, index, setColumns, columns, colItem, ColIndex }) => {

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
        {
          colItem.name !== "Completed" &&
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

        }
      </div>
    </div>



  )

}
export default Task;
