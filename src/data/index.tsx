import { v4 as uuidv4 } from "uuid";
import { ToDo, TaskItem } from '../types/index'

const ToDoData: TaskItem[] = [
  {
    id: uuidv4(),
    text:
      "Apply OAuth with GitHub and Google"
    ,
    completed: false,
  },

  {
    id: uuidv4(),
    text:
      "Help Teammate to remove CORS error from Backend",
    completed: false,

  },
  {
    id: uuidv4(),
    text:
      "Improve  Icons quality on the Footer Component",
    completed: false,

  },
  {
    id: uuidv4(),
    text:
      "Create Issue on the Form handling from front End",
    completed: false,

  },

];
export const columsData: ToDo =
  { id: uuidv4(), name: "To Do", items: ToDoData };

