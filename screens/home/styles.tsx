import { StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newTask: {
        width: '90%',
        backgroundColor: Colors.grey,
        borderRadius: 10,
        marginBottom: 10,
    }
});

export default styles