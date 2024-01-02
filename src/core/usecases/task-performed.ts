import { AsyncStorageAdapter } from "../adapters/async-storage-adapter";
import { Task } from "../entity/task";

export async function taskPerformed(taskTitle: string): Promise<Task[]> {
  const asyncStorage = new AsyncStorageAdapter();
  const tasks = await asyncStorage.get("task");
  const newTasks = tasks?.map((task: any) => {
    if (task.title == taskTitle) {
      task.done = true;
    }
    return task;
  });
  await asyncStorage.storeMany("task", newTasks);
  return newTasks as Task[];
}
