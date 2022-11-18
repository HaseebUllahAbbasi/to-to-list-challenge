export type TaskItem = {
  id: string;
  text: string;
  completed: boolean,

};
export type Columns = {
  id: string;
  name: string;
  items: TaskItem[];
};