import { v4 as uuidv4 } from "uuid";
import { Columns, TaskItem } from '../types/index'

const ToDo: TaskItem[] = [
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
];
export const columsData: Columns[] = [
  { id: uuidv4(), name: "To Do", items: ToDo },
];

//  rgb(163 161 163) #a3a1a3

