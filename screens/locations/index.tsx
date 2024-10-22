import { SafeAreaView, Text } from "react-native";
import { useAppSelector } from "@/hooks/redux";
import Card from "@/components/card";
import styles from "./styles";

export default function Locations() {
  const locations = useAppSelector((state) => state.locations.locations);

  return (
    <SafeAreaView style={styles.container}>
      {locations.length > 0 ? (
        locations.map((location) => <Card title={location.name} />)
      ) : (
        <Text>'No locations yet'</Text>
      )}
    </SafeAreaView>
  );
}
