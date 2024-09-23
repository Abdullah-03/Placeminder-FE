import { Text, View } from "react-native";
import {useAppSelector} from "@/app/hooks";

export default function Index() {
    const locationState = useAppSelector((state) => state.locations);
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <Text>{locationState.locations[0].name}</Text>
        </View>
  );
}
