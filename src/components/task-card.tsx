import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Task } from "../core/entity/task";

type TaskCardProps = {
  task: Task;
  onPressDone: (taskTitle: string) => Promise<void>;
  onPressDelete: (taskTitle: string) => Promise<void>;
  onPressTask: (taskTitle: string, taskDescription: string) => void;
};

export function TaskCard({
  task,
  onPressDelete,
  onPressDone,
  onPressTask,
}: TaskCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressTask(task.title, task.description)}
    >
      <Text style={styles.cardTxt}>{task.title}</Text>
      <View style={styles.buttonContainer}>
        {!task.done && (
          <Pressable
            style={{ ...styles.buttonBase, backgroundColor: "#22c55e" }}
            onPress={() => onPressDone(task.title)}
          >
            <Ionicons name="md-checkmark" style={styles.buttonTxt} />
          </Pressable>
        )}
        <Pressable
          style={{ ...styles.buttonBase, backgroundColor: "#ef4444" }}
          onPress={() => onPressDelete(task.title)}
        >
          <Ionicons name="trash" style={styles.buttonTxt} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3f3f46",
    width: "100%",
    height: 48,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    marginVertical: 8,
  },
  cardTxt: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 28,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    height: "100%",
  },
  buttonBase: {
    height: 48,
    width: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTxt: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 22,
  },
});
