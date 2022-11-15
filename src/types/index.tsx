export type TaskItem = {
  id: string;
  desc: string;
};
export type Columns = {
  id: string;
  name: string;
  items: TaskItem[];
};