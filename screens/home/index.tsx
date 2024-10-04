import {Pressable, SafeAreaView, Text, useColorScheme, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import styles from './styles'
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {GeofencingEventType} from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import isWithinDistance from "@/utils/isWithinDistance";
import {addTask, clearError, LocationInterface} from "@/redux/slices/locations";
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
    const locations = useAppSelector(state => state.locations.locations);
    let taskError = useAppSelector(state => state.locations.error);
    const dispatch = useAppDispatch();

    const [place, setPlace] = useState<LocationInterface | null>();
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
        if (task === '' || place === null)
            return

        dispatch(addTask({
            // @ts-ignore
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
        const requestPermissions = async () => {
            const {status: foregroundStatus} = await Location.requestForegroundPermissionsAsync();
            if (foregroundStatus === 'granted') {
                const {status: backgroundStatus} = await Location.requestBackgroundPermissionsAsync();
                if (backgroundStatus === 'granted') {
                    await Location.startGeofencingAsync('Geofencing', locations)
                }
            }
        }
        requestPermissions().then(() => {
            // @ts-ignore
            TaskManager.defineTask('Geofencing', ({data: {eventType, region}, error}) => {
                if (error) {
                    console.log(error.message);
                    return;
                }
                if (eventType === GeofencingEventType.Enter) {
                    console.log("You've entered region:", region);
                } else if (eventType === GeofencingEventType.Exit) {
                    console.log("You've left region:", region);
                }

                async function getPlace() {
                    let currentLocation = await Location.getCurrentPositionAsync({});
                    for (const location of locations) {
                        if (isWithinDistance(location.latitude, location.longitude, currentLocation.coords.latitude, currentLocation.coords.longitude, location.radius)) {
                            setPlace(location);
                            return;
                        }
                    }
                    setPlace(null);
                }

                getPlace().catch(() => console.log('Failed to get location'));
            })
        })
            .catch(() =>
                console.log('Grant permissions to proceed')
            )
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
