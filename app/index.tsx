import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

export default function App() {
    const [searchLocation, setSearchLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={searchLocation ? {
                    latitude: searchLocation.latitude,
                    longitude: searchLocation.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                } : undefined}
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
                        key: 'AIzaSyC-QXb1OpjIBw8R9TPkZ3Tppr2qiayn2cg',
                        language: 'en',
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

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
    }
});
