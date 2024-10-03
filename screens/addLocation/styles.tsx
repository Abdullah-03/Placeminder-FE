import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        position: 'absolute',
        top: '10%',
        width: '94%',
        marginHorizontal: '3%',
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles