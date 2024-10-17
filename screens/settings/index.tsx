import {Pressable, SafeAreaView, Text, View} from "react-native";
import Card from '@/components/card'
import styles from "./styles";

export default function Settings() {
    return (
        <SafeAreaView style={styles.container}>
            <Card title="Locations" navigateTo="locations" iconName="building"/>
        </SafeAreaView>

    )
};