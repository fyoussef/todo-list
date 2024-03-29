import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageAdapter {
  async get(
    schema: string
  ): Promise<{ [k: string]: any } | { [k: string]: any }[] | undefined> {
    try {
      const value = await AsyncStorage.getItem(schema);
      if (!value) return;
      return JSON.parse(value);
    } catch (error) {
      console.log("Error to get value", error);
    }
  }

  async store(schema: string, value: { [k: string]: any }): Promise<void> {
    try {
      const data = await this.get(schema);
      if (data && Array.isArray(data)) {
        data.push(value);
        await AsyncStorage.setItem(schema, JSON.stringify(data));
      } else {
        await AsyncStorage.setItem(schema, JSON.stringify([value]));
      }
    } catch (error) {
      console.log("Error to store value", error);
    }
  }

  async storeMany(schema: string, data: { [k: string]: any }[]): Promise<void> {
    try {
      await AsyncStorage.setItem(schema, JSON.stringify(data));
    } catch (error) {
      console.log("Error to store value", error);
    }
  }

  async update(
    schema: string,
    id: string,
    data: { [k: string]: any }
  ): Promise<void> {
    const tasks = await this.get(schema);
    if (!tasks) return;
    let newTasks: any[] = [];
    if (Array.isArray(tasks)) {
      const result = tasks.filter((task) => task.title != id);
      newTasks.push(...result);
      newTasks.push(data);
    } else {
      newTasks.push(tasks);
      newTasks.push(data);
    }
    await this.storeMany(schema, newTasks);
  }
}
