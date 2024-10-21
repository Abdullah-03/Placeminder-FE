import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Colors} from "@/constants/Colors";
import {useAppSelector} from "@/hooks/redux";
import Card from "@/components/card";
import styles from "./styles";

export default function DropdownComponent () {
    const [locationIndex, setLocationIndex] = useState(0);
    const locations = useAppSelector(state => state.locations.locations);

    let data = locations.map((location, index) => ({label: location.name, value: index + 1}));
    data = [{label: "All Locations", value: 0}, ...data]

    let tasks;
    if (locationIndex === 0) {
        tasks = locations.map(location => location.tasks.map(task => <Card title={task.name}/>));
    } else {
        tasks = locations[locationIndex - 1].tasks.map(task => <Card title={task.name}/>)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={styles.taskContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Text>View tasks for: </Text>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={data[locationIndex]}
                        onChange={item => {
                            setLocationIndex(item.value);
                        }}
                        renderLeftIcon={() => (
                            <FontAwesome
                                style={styles.icon}
                                color={Colors.blue}
                                name="home"
                                size={20}
                            />
                        )}
                    />
                </View>
                {tasks}
            </View>
        </SafeAreaView>
    );
};