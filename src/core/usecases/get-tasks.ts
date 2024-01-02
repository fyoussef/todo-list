import { AsyncStorageAdapter } from "../adapters/async-storage-adapter";

type Output = {
  title: string;
  description: string;
  done: boolean;
};

export async function getTasks(): Promise<Output[]> {
  const asyncStorage = new AsyncStorageAdapter();
  const tasks = await asyncStorage.get("task");
  return tasks as Output[];
}
