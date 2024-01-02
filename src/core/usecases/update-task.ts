import { Alert } from "react-native";
import { AsyncStorageAdapter } from "../adapters/async-storage-adapter";
import { Task } from "../entity/task";

type Input = {
  oldTaskTitle: string;
  title: string;
  description: string;
};

export async function updateTask(input: Input): Promise<Task[]> {
  const asyncStorage = new AsyncStorageAdapter();
  await asyncStorage.update("task", input.oldTaskTitle, input);
  const tasks = await asyncStorage.get("task");
  return tasks as Task[];
}
