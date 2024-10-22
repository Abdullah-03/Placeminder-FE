import {StyleSheet} from 'react-native';
import {Colors} from "@/constants/Colors";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: '90%',
        alignItems: 'center',
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 10
    },
    textContainer: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontWeight: '500'
    }

})

export default styles;