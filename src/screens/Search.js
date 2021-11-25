import React, { useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import { searchMoviesApi } from '../api/movies';

export default function Search(){
    const [movies, setMovies]= useState(null);

    useEffect(()=> {
        searchMoviesApi("batman").then((response)=> {
            setMovies(response.results);
        });
    }, []);


    return(
        <View>
            <Text>Estamos en Search</Text>
        </View>
    )
}