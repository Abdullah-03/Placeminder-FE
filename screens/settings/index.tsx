import {SafeAreaView} from "react-native";
import Card from '@/components/card'
import styles from "./styles";

export default function Settings() {
    return (
        <SafeAreaView style={styles.container}>
            <Card title="Locations" navigateTo="/locations" iconName="building"/>
            <Card title="Tasks" navigateTo="/tasks" iconName="list-ul"/>
        </SafeAreaView>

    )
};