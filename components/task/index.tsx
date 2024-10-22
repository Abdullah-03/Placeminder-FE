import { Pressable, Text } from "react-native";
import styles from "./styles";
import Checkbox from "expo-checkbox";
import { TaskInterface, toggleTaskCompletion } from "@/redux/slices/locations";
import { useAppDispatch } from "@/hooks/redux";

interface TaskProps {
  task: TaskInterface;
  locationName: string;
}

export default function Task({ task, locationName }: TaskProps) {
  const dispatch = useAppDispatch();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        dispatch(toggleTaskCompletion({ locationName, taskName: task.name }))
      }
    >
      <Checkbox
        style={styles.checkbox}
        value={task.isCompleted}
        onValueChange={() =>
          dispatch(toggleTaskCompletion({ locationName, taskName: task.name }))
        }
      />
      <Text>{task.name}</Text>
    </Pressable>
  );
}
