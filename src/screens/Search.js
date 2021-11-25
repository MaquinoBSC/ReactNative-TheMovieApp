import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { size } from 'lodash';
import { searchMoviesApi } from '../api/movies';


export default function Search(){
    const [movies, setMovies]= useState(null);
    const [search, setSearch]= useState("");
    console.log(movies);

    useEffect(()=> {
        if(size(search) > 2 ){
            searchMoviesApi(search).then((response)=> {
                setMovies(response.results);
            });
        }
    }, [ search ]);


    return(
        <SafeAreaView>
            <Searchbar
                placeholder="Busca tu pelicula" 
                iconColor={ Platform.OS == 'ios' && 'transparent'}
                icon="arrow-left"
                style={styles.input}
                onChangeText={(e)=> setSearch(e)}
            />
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    input: {
        marginTop: -3,
        backgroundColor: '#15212b',
    }
});