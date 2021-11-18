import React, { useState, useEffect } from 'react';
import {View, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IconButton, Text, Title } from 'react-native-paper';
import ModalVideo from '../components/ModalVideo';
import { getMovieByIdApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';

export default function Movie(){
    const route= useRoute();
    const { id }= route.params;
    const [movie, setMovie]= useState({});
    const [showVideo, setShowVideo]= useState(false);

    useEffect(()=> {
        getMovieByIdApi(id).then((response)=> {
            setMovie(response);
        });
    }, []);

    return(
        <>
            <ScrollView>
                <MovieImage posterPath={movie.poster_path} />
                <MovieTrailer setShow={setShowVideo} />
            </ScrollView>
            <ModalVideo show={showVideo} setShow={setShowVideo} />
        </>
    )
}


function MovieImage(props){
    const { posterPath }= props;

    return (
        <View style={styles.viewPoster}>
            <Image style={styles.poster} source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }} />
        </View>
    )
}


function MovieTrailer(props){
    const { setShow }= props;

    return (
        <View style={styles.viewPlay}>
            <IconButton icon="play" color="#000" size={30} style={styles.play} onPress={()=> setShow(true)} />
        </View>
    )
}


const styles= StyleSheet.create({
    viewPoster: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        textShadowRadius: 10
    },
    poster: {
        width: '100%',
        height: 500,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    viewPlay: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    play: {
        backgroundColor: '#fff',
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100,
    }
})