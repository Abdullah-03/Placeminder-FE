import {SafeAreaView, Text, View} from 'react-native';
import {useAppSelector} from "@/hooks/redux";
import styles from './styles'
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {GeofencingEventType} from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import isWithinDistance from "@/utils/isWithinDistance";

export default function Index() {
    const locations = useAppSelector(state => state.locations.locations);
    const [place, setPlace] = useState<string>();

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
                            setPlace(location.name);
                            return;
                        }
                    }
                    setPlace('');
                }

                getPlace().catch(()=> console.log('Failed to get location'));
            })
        })
            .catch(() =>
                console.log('Grant permissions to proceed')
            )
    }, [locations]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{marginVertical: 20}}>{place ? `Currently at ${place}` : 'Wow! a new place to explore'}</Text>
            <View style={{flex: 1}}>
                {locations.map(l => <Text>{l.name}</Text>)}
            </View>
        </SafeAreaView>
    );
}
