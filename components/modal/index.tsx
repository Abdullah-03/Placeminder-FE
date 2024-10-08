import {Modal, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import React from "react";

interface CustomModalProps {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    label: string,
    setLabel: React.Dispatch<React.SetStateAction<string>>,
    error: string | null,
    onPress: () => void
}

export default function CustomModal({
                                        isModalOpen,
                                        setIsModalOpen,
                                        title,
                                        label,
                                        setLabel,
                                        error,
                                        onPress
                                    }: CustomModalProps) {
    return (
        <Modal visible={isModalOpen} transparent={true} onRequestClose={() => setIsModalOpen(false)}
               animationType={'fade'}>
            <TouchableOpacity style={{width: "100%", height: "100%"}} onPress={() => setIsModalOpen(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{title}</Text>
                        <TextInput value={label} placeholder='label name' onChangeText={text => setLabel(text)}
                                   style={styles.labelInput}/>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onPress}>
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}