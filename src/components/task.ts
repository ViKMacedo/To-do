export enum TaskSituation {
  Completed = "Completed ",
  Uncompleted = "Uncompleted",
}
export interface Task {
  id: string;
  title: string;
  description: string;
  situation: TaskSituation;
  complete: boolean;
}