import { AsyncStorageAdapter } from "../adapters/async-storage-adapter";
import { Task } from "../entity/task";

export async function removeTask(taskTitle: string) {
  const asyncStorage = new AsyncStorageAdapter();
  const tasks = await asyncStorage.get("task");
  const newTasks = tasks?.filter((t: Task) => t.title != taskTitle);
  await asyncStorage.storeMany("task", newTasks);
  return newTasks;
}
