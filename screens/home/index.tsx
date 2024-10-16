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
import * as Location from "expo-location";

export default function Index() {
    const locations = useAppSelector(state => state.locations.locations);
    let taskError = useAppSelector(state => state.locations.error);
    const dispatch = useAppDispatch();

    const place= useAppSelector(state => state.locations.currentLocation);
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
        if (task === '' || place === undefined)
            return

        dispatch(addTask({
            locationName: place.name,
            taskName: task
        }))
    }

    useEffect(() => {
        if (isTaskModalOpen) {
            setTask('')
            dispatch(clearError())
        }
    }, [isTaskModalOpen, dispatch]);

    useEffect(() => {
        Location.startGeofencingAsync('Geofencing', locations.map(l => ({identifier: l.name, ...l})))
            .catch(() => console.log('geofence failed'))
    }, [locations]);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background}]}>
            <Text
                style={{marginVertical: 20}}>{place ? `Currently at ${place.name}` : 'Wow! a new place to explore'}</Text>
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
                {(place && place.tasks.length !== 0) ? place.tasks.map(task => <Task task={task}/>) : null}

            </View>
            <CustomModal isModalOpen={isTaskModalOpen} setIsModalOpen={setIsTaskModalOpen} label={task}
                         setLabel={setTask} error={taskError} onPress={saveTask} title='Add a task'/>

        </SafeAreaView>
    );
}
