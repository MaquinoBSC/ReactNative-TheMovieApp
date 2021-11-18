import React, { useState, useEffect } from 'react';
import {View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getMovieByIdApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';

export default function Movie(){
    const route= useRoute();
    const { id }= route.params;
    const [movie, setMovie]= useState({});

    useEffect(()=> {
        getMovieByIdApi(id).then((response)=> {
            setMovie(response);
        });
    }, []);

    return(
        <>
            <ScrollView>
                <MovieImage posterPath={movie.poster_path} />
            </ScrollView>
        </>
    )
}


function MovieImage(props){
    const { posterPath }= props;
    console.log(posterPath);

    return (
        <View style={styles.viewPoster}>
            <Image style={styles.poster} source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }} />
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
    }
})