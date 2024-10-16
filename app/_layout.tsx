import {Stack} from 'expo-router/stack';
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import {GeofencingEventType} from "expo-location";
import {store} from '@/redux/store'
import {setLocation} from "@/redux/slices/locations";
import isWithinDistance from "@/utils/isWithinDistance";
import {useEffect} from "react";

const requestPermissions = async () => {
    const {status: foregroundStatus} = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
        const {status: backgroundStatus} = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
            // await Location.startGeofencingAsync('Geofencing', locations)
        }
    }
}

// @ts-ignore
TaskManager.defineTask('Geofencing', ({data: {eventType, region}, error}) => {
    if (error) {
        console.log(error.message);
        return;
    }
    if (eventType === GeofencingEventType.Enter) {
        console.log("You've entered region:", region);
        store.dispatch(setLocation(region.identifier))
    }
    else if (eventType === GeofencingEventType.Exit) {
         console.log("You've left region:", region);
         const locations = store.getState().locations.locations;
         Location.getCurrentPositionAsync().then((currentLocation) => {
             for (const location of locations) {
                 if (isWithinDistance(location.latitude, location.longitude, currentLocation.coords.latitude, currentLocation.coords.longitude, location.radius)) {
                     return;
                 }
             }
             store.dispatch(setLocation(undefined));
         })
    }
})


requestPermissions()
    .catch(() => console.log('Grant permissions to proceed'))


export default function Layout() {
    const locations = store.getState().locations.locations;

    useEffect(() => {
        Location.startGeofencingAsync('Geofencing', locations.map(l => ({identifier: l.name, ...l})))
            .catch(() => console.log('geofence failed'))
    }, [locations]);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    );
}
