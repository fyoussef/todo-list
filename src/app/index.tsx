import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getTasks } from "../core/usecases/get-tasks";
import { TaskCard } from "../components/task-card";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task } from "../core/entity/task";
import { taskPerformed } from "../core/usecases/task-performed";
import { removeTask } from "../core/usecases/remove-task";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchTasks() {
    const tasks = await getTasks();
    if (!tasks) return;
    setTasks(Array.isArray(tasks) ? tasks : [tasks]);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function onPressDone(taskTitle: string) {
    Alert.alert("Parabéns!", "Esta tarefa foi concluída com sucesso!");
    const tasks = await taskPerformed(taskTitle);
    setTasks(tasks);
  }

  async function onPressDelete(taskTitle: string) {
    Alert.alert("Atenção!", "Tem certeza que deseja deletar este item?", [
      {
        text: "Sim, tenho certeza",
        onPress: async () => {
          Alert.alert("Tarefa apagada!");
          const newTasks = await removeTask(taskTitle);
          setTasks(newTasks);
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  function onPressTask(taskTitle: string, taskDescription: string) {
    Alert.alert(taskTitle, taskDescription);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tasks<Text style={styles.titleExclamation}>!</Text>
      </Text>
      <SafeAreaView style={styles.taskList}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPressDone={onPressDone}
              onPressDelete={onPressDelete}
              onPressTask={onPressTask}
            />
          )}
          keyExtractor={(item) => item.title}
          ListEmptyComponent={
            <Text style={styles.emptyResultText}>
              Você não possui tarefas pendentes...
            </Text>
          }
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.addButton}>
        <Link href="/add-task" style={styles.addButtonTxt}>
          ADICIONAR
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: (StatusBar.currentHeight || 0) + 32,
  },
  title: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
  titleExclamation: {
    color: "#fb923c",
  },
  emptyResultText: {
    fontSize: 18,
    color: "#6b7280",
    fontWeight: "500",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#fb923c",
    alignItems: "center",
    justifyContent: "center",
    width: 124,
    height: 38,
    borderRadius: 4,
    alignSelf: "center",
  },
  addButtonTxt: {
    color: "#fff",
    fontWeight: "700",
  },
  taskList: {
    flex: 1,
    maxHeight: 380,
  },
});
