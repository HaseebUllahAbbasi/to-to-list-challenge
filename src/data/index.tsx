import { v4 as uuidv4 } from "uuid";
import { Columns, TaskItem } from '../types/index'

const ToDo: TaskItem[] = [
  {
    id: uuidv4(),
    text:
      "Apply OAuth with GitHub and Google"
  },

  {
    id: uuidv4(),
    text:
      "Help Teammate to remove CORS error from Backend"
  },
  {
    id: uuidv4(),
    text:
      "Improve  Icons quality on the Footer Component"
  },
];
export const columsData: Columns[] = [
  { id: uuidv4(), name: "To Do", items: ToDo },
  { id: uuidv4(), name: "Completed", items: [] }
];