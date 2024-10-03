import {SafeAreaView, Text} from 'react-native';
import {useAppSelector} from "@/hooks/redux";
import styles from './styles'

export default function Index() {
    const locations = useAppSelector(state => state.locations.locations);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Home screen</Text>
            {locations.map(location => (
                <Text>{location.name}, {location.latitude}, {location.radius}</Text>
            ))}
        </SafeAreaView>
    );
}
