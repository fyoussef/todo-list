import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { storeTask } from "../core/usecases/store-task";
import { updateTask } from "../core/usecases/update-task";
import { getTasks } from "../core/usecases/get-tasks";

export default function AddTasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const disableAddBtn = title == "" || description == "";
  const searchParams = useLocalSearchParams();
  const ctx = {
    isUpdate: searchParams.taskTitle ? true : false,
    params: { taskTitle: searchParams.taskTitle },
  };
  const { push } = useRouter();

  useEffect(() => {
    if (ctx.isUpdate) {
      loadUpdateContext();
    }
  }, [ctx.isUpdate]);

  async function loadUpdateContext() {
    const tasks = await getTasks();
    const taskToUpdate = tasks.find((t) => t.title == searchParams.taskTitle);
    setTitle(taskToUpdate?.title ?? "");
    setDescription(taskToUpdate?.description ?? "");
  }

  async function handleSaveTask() {
    const input = { title, description };
    if (ctx.isUpdate) {
      await updateTask({
        oldTaskTitle: ctx.params.taskTitle as string,
        ...input,
      });
    } else {
      await storeTask(input);
    }
    Alert.alert(
      "Tudo certo!",
      `Sua tarefa foi ${
        ctx.isUpdate ? "atualizada" : "adicionada"
      }  com sucesso.`
    );
    if (ctx.isUpdate) {
      return push("/");
    }
    setTitle("");
    setDescription("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ctx.isUpdate ? "Editar" : "Adicionar"}</Text>
      <TextInput
        style={styles.taskTitleInput}
        placeholder="Título"
        placeholderTextColor={"#fb923c"}
        onChangeText={(value) => setTitle(value)}
        value={title}
      />
      <TextInput
        style={styles.taskContentInput}
        editable
        multiline={true}
        numberOfLines={8}
        placeholder="Descreva sua tarefa"
        placeholderTextColor={"#fb923c"}
        onChangeText={(value) => setDescription(value)}
        value={description}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Link href="/" style={styles.buttonTxt}>
            VOLTAR
          </Link>
        </TouchableOpacity>
        <Pressable
          style={
            disableAddBtn
              ? { ...styles.addButton, backgroundColor: "#404040" }
              : styles.addButton
          }
          onPress={handleSaveTask}
          disabled={disableAddBtn}
        >
          <Text style={styles.buttonTxt}>
            {ctx.isUpdate ? "EDITAR" : "ADICIONAR"} TAREFA
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 32,
  },
  title: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
  taskTitleInput: {
    width: "100%",
    height: 38,
    borderWidth: 0.5,
    borderColor: "#fb923c",
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    color: "#fff",
  },
  taskContentInput: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#fb923c",
    height: 164,
    borderRadius: 8,
    padding: 16,
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#fb923c",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: 38,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  buttonTxt: {
    color: "#fff",
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: 38,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
