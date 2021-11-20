import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { map } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { getPopularMovieApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import noImage from '../assets/jpg/default-imgage.png';

export default function Popular(){
    const navigation= useNavigation();
    const [movies, setMovies]= useState(null);

    useEffect(()=> {
        getPopularMovieApi(1).then((response)=> {
            setMovies(response.results);
        })
    }, []);

    return(
        <ScrollView>
            {
                map(movies, (movie, index)=> (
                    <Movie key={index} movie={movie} />
                ))
            }
        </ScrollView>
    )
}


function Movie(props){
    const { movie }= props;
    const { poster_path }= movie;
    return (
        <View style={styles.movie}>
            <View style={styles.left}>
                <Image 
                    style={styles.image} 
                    source={
                        poster_path ? { uri: `${BASE_PATH_IMG}/w500${poster_path}` } : noImage
                    } 
                />
            </View>
            <View>
                <Text>RIGHT</Text>
            </View>
        </View>
    )
}


const styles= StyleSheet.create({
    movie: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        marginRight: 20,
    },
    image: {
        width: 100,
        height: 150,
    }
});