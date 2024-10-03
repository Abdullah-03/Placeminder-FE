import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import * as Location from 'expo-location';
import styles from './styles';

export default function AddLocationScreen() {
    const [searchLocation, setSearchLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);
    const [currentLocation, setcurrentLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState<string>();

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setcurrentLocation(location);
        })();
    }, []);

    return (
        currentLocation ?
            <SafeAreaView style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: searchLocation ? searchLocation.latitude : currentLocation.coords.latitude,
                        longitude: searchLocation ? searchLocation.longitude : currentLocation.coords.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    }}
                />
                <View style={styles.innerContainer}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        fetchDetails={true}
                        onPress={(_, details) => {
                            if (details) setSearchLocation({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng
                            });
                        }}
                        query={{
                            key: process.env.EXPO_PUBLIC_MAPS_API,
                            language: 'en',
                        }}
                    />
                </View>
            </SafeAreaView>
            :
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size={'large'}/>
            </SafeAreaView>
    );
}
