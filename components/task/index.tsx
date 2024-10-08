import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import Checkbox from 'expo-checkbox'
import {useState} from "react";

export  default  function Task({ task }: { task: string }) {
    const [checked, setChecked] = useState(false);

    return (
        <Pressable style={styles.container} onPress={()=>setChecked(!checked)}>
            <Checkbox style={styles.checkbox} value={checked} onValueChange={() => setChecked(!checked)} />
            <Text>{task}</Text>
        </Pressable>
    )
}