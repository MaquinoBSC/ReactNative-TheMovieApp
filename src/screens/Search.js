import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView, Image, Platform, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { size, map } from 'lodash';
import { searchMoviesApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';


const { width }= Dimensions.get('window');

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
            <ScrollView>
                <View style={styles.container}>
                    {
                        map(movies, (movie, idx)=> (
                            <Movie key={idx} movie={movie} />
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


function Movie(props){
    const { movie }= props;
    const { id, poster_path, title }= movie;
    const navigation= useNavigation();

    const goMovie= ()=> {
        navigation.navigate('movie', { id });
    }

    return (
        <TouchableWithoutFeedback onPress={()=> goMovie()}>
            <View style={styles.movie}>
                {
                    poster_path ? (
                        <Image
                            style={styles.image}
                            source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
                        />
                    ) : (
                        <Text>{ title }</Text>
                    )
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles= StyleSheet.create({
    input: {
        marginTop: -3,
        backgroundColor: '#15212b',
        paddingVertical: 0,
    },
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
        height: '100%',
    }
});