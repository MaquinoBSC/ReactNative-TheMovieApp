import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'; 
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { map } from 'lodash';
import { getNewsMoviesApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';


const {width}= Dimensions.get('window');


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
            <View style={styles.container}>
                {
                    map(movies, (movie, idx)=> (
                        <Movie key={idx} movie={movie} />
                    ))
                }
            </View>
        </ScrollView>
    )
}

function Movie(props){
    const { movie }= props;
    const { id, poster_path, title }= movie;

    return (
        <View style={styles.movie}>
            {
                poster_path ? (
                    <Image 
                        style={styles.image}
                        source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}` }}
                    />
                ) : (
                    <Text>{title}</Text>
                )
            }
            <Text>{ title }</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    movie: {
        width: width / 2,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%'
    }
})