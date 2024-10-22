import React, { useEffect, useState } from "react";
import MapView, { Circle, PROVIDER_GOOGLE, Region } from "react-native-maps";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { addLocation } from "@/redux/slices/locations";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import styles from "./styles";
import CustomModal from "@/components/modal";

export default function AddLocationScreen() {
  const dispatch = useAppDispatch();
  const locationError = useAppSelector((state) => state.locations.error);
  const [searchLocation, setSearchLocation] = useState<Region>();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>();
  const [radius, setRadius] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (saving && !locationError && isModalOpen) {
      setIsModalOpen(false);
      setSaving(false);
    }
  }, [saving, locationError, isModalOpen]);

  const saveLocation = () => {
    if (searchLocation) {
      dispatch(
        addLocation({
          name: label,
          latitude: searchLocation.latitude,
          longitude: searchLocation.longitude,
          radius: radius,
          tasks: [],
        }),
      );
      setSaving(true);
    }
  };

  return currentLocation && !errorMsg ? (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        region={searchLocation}
        onRegionChangeComplete={(region) => setSearchLocation(region)}
      >
        <Circle
          center={{
            latitude:
              searchLocation?.latitude ?? currentLocation.coords.latitude,
            longitude:
              searchLocation?.longitude ?? currentLocation.coords.longitude,
          }}
          radius={radius}
        />
      </MapView>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(_, details) => {
            if (details)
              setSearchLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              });
          }}
          query={{
            key: process.env.EXPO_PUBLIC_MAPS_API,
            language: "en",
          }}
        />
      </View>
      <View style={styles.radiusBar}>
        <Pressable
          style={styles.radiusBarTopContainer}
          onPress={() => setIsModalOpen(true)}
        >
          <Text>Save Location</Text>
        </Pressable>
        <View style={styles.radiusBarBottomContainer}>
          <Pressable
            style={(pressed) =>
              pressed.pressed
                ? [styles.radiusBarIconContainer, { opacity: 0.5 }]
                : styles.radiusBarIconContainer
            }
            onPress={() => setRadius(radius > 50 ? radius - 50 : 50)}
          >
            <FontAwesome name="minus" size={28} color="black" />
          </Pressable>
          <View style={styles.radiusBarTextContainer}>
            <TextInput
              value={String(radius)}
              inputMode="numeric"
              onChangeText={(text) => setRadius(Number(text))}
            />
            <Text>meters</Text>
          </View>
          <Pressable
            style={styles.radiusBarIconContainer}
            onPress={() => setRadius(radius + 50)}
          >
            <FontAwesome name="plus" size={28} color="black" />
          </Pressable>
        </View>
      </View>
      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        label={label}
        onPress={saveLocation}
        error={locationError}
        setLabel={setLabel}
        title="Give this place a name"
      />
    </SafeAreaView>
  ) : !errorMsg ? (
    <SafeAreaView style={styles.center}>
      <ActivityIndicator size={"large"} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.center}>
      <Text>{locationError}</Text>
    </SafeAreaView>
  );
}
