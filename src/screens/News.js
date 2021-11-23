import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'; 
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { map } from 'lodash';
import { getNewsMoviesApi } from '../api/movies';


export default function News(props){
    const navigation= useNavigation();
    const [movies, setMovies]= useState(null);
    const [page, setPage]= useState(1);

    useEffect(()=> {
        getNewsMoviesApi(page).then((response)=> {
            setMovies(response.results);
        });
    }, []);


    return(
        <ScrollView>
            {
                map(movies, (movie, idx)=> (
                    <Movie key={idx} movie={movie} />
                ))
            }
        </ScrollView>
    )
}

function Movie(props){
    const { movie }= props;
    const { title }= movie;

    return (
        <View>
            <Text>{ title }</Text>
        </View>
    )
}