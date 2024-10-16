import {Pressable, SafeAreaView, Text, useColorScheme, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import styles from './styles'
import {useEffect, useState} from "react";
import {addTask, clearError} from "@/redux/slices/locations";
import Task from "@/components/task";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomModal from "@/components/modal";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming
} from "react-native-reanimated";
import {Colors} from "@/constants/Colors";

export default function Index() {
    let taskError = useAppSelector(state => state.locations.error);
    const dispatch = useAppDispatch();

    const currentLocation= useAppSelector(state => state.locations.currentLocation);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [task, setTask] = useState<string>('');

    const animatedHorizontalPadding = useSharedValue(0)
    const animatedVerticalPadding = useSharedValue(0)

    const theme = useColorScheme()

    const animatedStyles = useAnimatedStyle(() => ({
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 90 + animatedHorizontalPadding.value,
        paddingVertical: 30 + animatedVerticalPadding.value,
        minWidth: '100%',
    }))

    function saveTask() {
        if (task === '' || currentLocation === undefined)
            return

        dispatch(addTask({
            locationName: currentLocation.name,
            taskName: task
        }))
    }

    useEffect(() => {
        if (isTaskModalOpen) {
            setTask('')
            dispatch(clearError())
        }
    }, [isTaskModalOpen, dispatch]);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background}]}>
            <Text
                style={{marginVertical: 20}}>{currentLocation ? `Currently at ${currentLocation.name}` : 'Wow! a new place to explore'}</Text>
            <View style={{flex: 1}}>
                <Pressable style={styles.newTask}
                           onPress={() => {
                               setIsTaskModalOpen(true)
                               animatedHorizontalPadding.value = withSequence(
                                   withTiming(10),
                                   withTiming(0),
                               )
                               animatedVerticalPadding.value = withSequence(
                                   withTiming(4),
                                   withTiming(0),
                               )
                           }}
                >
                    <Animated.View style={animatedStyles}>
                        <FontAwesome name='plus' size={20} color={Colors.light.background} />
                        <Text style={{color: theme === 'dark' ? Colors.dark.text : Colors.light.background}}>Add a new task!</Text>
                    </Animated.View>
                </Pressable>
                {(currentLocation && currentLocation.tasks.length !== 0) ? currentLocation.tasks.map(task => <Task task={task} locationName={currentLocation.name}/>) : null}

            </View>
            <CustomModal isModalOpen={isTaskModalOpen} setIsModalOpen={setIsTaskModalOpen} label={task}
                         setLabel={setTask} error={taskError} onPress={saveTask} title='Add a task'/>

        </SafeAreaView>
    );
}
