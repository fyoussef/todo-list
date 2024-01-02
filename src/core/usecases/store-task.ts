import { AsyncStorageAdapter } from "../adapters/async-storage-adapter";

type Input = {
  title: string;
  description: string;
  done?: boolean;
};

export async function storeTask(input: Input) {
  const asyncStorage = new AsyncStorageAdapter();
  await asyncStorage.store("task", { ...input, done: input.done ?? false });
}
