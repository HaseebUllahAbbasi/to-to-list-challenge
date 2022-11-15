import { v4 as uuidv4 } from "uuid";
import { Columns, TaskItem } from '../types/index'

const ToDo: TaskItem[] = [
  {
    id: uuidv4(),
    desc:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown "
  },

  {
    id: uuidv4(),
    desc:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown "
  },
];
const columsData: Columns[] = [
  { id: uuidv4(), name: "To Do", items: ToDo },
  { id: uuidv4(), name: "Progress", items: [] },
  { id: uuidv4(), name: "Completed", items: [] }
];