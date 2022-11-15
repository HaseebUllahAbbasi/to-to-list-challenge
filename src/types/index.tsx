export type TaskItem = {
  id: string;
  text: string;
};
export type Columns = {
  id: string;
  name: string;
  items: TaskItem[];
};