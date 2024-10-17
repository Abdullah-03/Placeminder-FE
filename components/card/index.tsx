import {router} from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Colors} from "@/constants/Colors";
import {Pressable, Text, View} from "react-native";
import styles from "./styles";
import {IconProps} from "@expo/vector-icons/build/createIconSet";

interface CardProps {
    title: string;
    navigateTo?: string;
    iconName?: keyof typeof FontAwesome.glyphMap;
}

export default function Card({title, navigateTo, iconName}: CardProps) {
    return (
        <Pressable
            style={({pressed}) => [{opacity: pressed ? 0.7: 1},styles.container]}
            onPress={() => navigateTo ? router.push('/locations') : null}
        >
            { iconName ? <FontAwesome name={iconName} size={28} color={Colors.blue}/> : null}
            <View style={styles.textContainer}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
    )
}