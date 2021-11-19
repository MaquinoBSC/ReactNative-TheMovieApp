import React, { useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPopularMovieApi } from '../api/movies';

export default function Popular(){
    const navigation= useNavigation();
    const [movies, setMovies]= useState(null);
    console.log(movies);

    useEffect(()=> {
        getPopularMovieApi(1).then((response)=> {
            setMovies(response.results);
        })
    }, []);

    return(
        <View>
            <Text>Estamso en Popular</Text>
        </View>
    )
}