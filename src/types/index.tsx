export type TaskItem = {
  id: string;
  text: string;
  completed: boolean,

};
export type ToDo = {
  id: string;
  name: string;
  items: TaskItem[];
};