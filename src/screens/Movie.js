import React, { useState, useEffect } from 'react';
import {View, Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getMovieByIdApi } from '../api/movies';

export default function Movie(){
    const route= useRoute();
    const { id }= route.params;
    const [movie, setMovie]= useState(null);

    useEffect(()=> {
        getMovieByIdApi(id).then((response)=> {
            setMovie(response);
        });
    }, []);

    return(
        <View>
            <Text>Estamos en Movie</Text>
        </View>
    )
}