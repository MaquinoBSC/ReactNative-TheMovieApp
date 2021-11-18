import React from 'react';
import { StyleSheet} from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';


export default function ModalVideo(props){
    const { show, setShow }= props;


    return (
        <Modal visible={show} contentContainerStyle={styles.modal}>
            <Title>
                Hola Modal
            </Title>
            <IconButton icon="close" style={styles.close} onPress={ ()=> setShow(false) } />
        </Modal>
    )
}

const styles= StyleSheet.create({
    modal: {
        backgroundColor: '#000',
        height: '120%',
        alignItems: 'center',
    },
    close: {
        backgroundColor: '#1ea1f2',
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        bottom: 100,
    }
})