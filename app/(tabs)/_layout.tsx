import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{tabBarActiveTintColor: 'blue'}}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color}/>,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="addLocation"
                options={{
                    title: 'Add Location',
                    tabBarIcon: ({color}) => <FontAwesome size={28} name="plus" color={color}/>,
                    headerShown: false

                }}
            />
        </Tabs>
    );
}