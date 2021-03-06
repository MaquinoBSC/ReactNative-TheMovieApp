import React, {useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import Youtube from 'react-native-youtube';
import { WebView } from 'react-native-webview';
import { getVideoMovieApi } from '../api/movies';


export default function ModalVideo(props){
    const { show, setShow, idMovie }= props;
    const [video, setVideo]= useState(null);
    console.log(video);

    useEffect(()=> {
        getVideoMovieApi(idMovie).then((response)=> {
            let idVideo= '';

            response.results.forEach((video)=> {
                if(video.site=== 'YouTube' && !idVideo){
                    idVideo= video.key;
                }
            });
            setVideo(idVideo);
        });
    }, []);


    return (
        <Modal visible={show} contentContainerStyle={styles.modal}>
            {
                Platform.OS == 'ios' ? (
                    <Youtube videoId={video} style={styles.video} />
                    ) : (
                    // <Youtube videoId={video} style={styles.video} apiKey="961810363999-h8j43og304bvdd8kri5nhtrdpvvv3plc.apps.googleusercontent.com" />
                    <WebView style={{ width: 500}} source={{ uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0`}} />
                )
            }
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
    },
    video: {
        alignSelf: 'stretch',
        height: 300,
    }
})