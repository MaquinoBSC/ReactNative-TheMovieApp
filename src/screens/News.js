import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'; 
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { map } from 'lodash';
import { getNewsMoviesApi } from '../api/movies';
import usePreferences from '../hooks/usePreferences';
import { BASE_PATH_IMG } from '../utils/constants';


const {width}= Dimensions.get('window');


export default function News(){
    const [movies, setMovies]= useState(null);
    const [page, setPage]= useState(1);
    const [showBtnMore, setShowBtnMore]= useState(true);
    const { theme }= usePreferences();


    useEffect(()=> {
        getNewsMoviesApi(page).then((response)=> {
            const totalPages= response.total_pages;
            
            if(page < totalPages){
                if(!movies){
                    setMovies(response.results);
                }
                else{
                    setMovies([...movies, ...response.results]);
                }
            }
            else{
                setShowBtnMore(false);
            }
        });
    }, [page]);


    return(
        <ScrollView>
            <View style={styles.container}>
                {
                    map(movies, (movie, idx)=> (
                        <Movie key={idx} movie={movie} />
                    ))
                }
            </View>
            {
                showBtnMore && (
                    <Button 
                        mode="contained"
                        contentStyle={styles.loadMoreContainer}
                        style={styles.loadMore}
                        labelStyle={{ color: theme== 'dark' ? "#fff" : '#000'}}
                        onPress={()=> setPage(page + 1)}
                    > Cargar mas ... </Button>
                )
            }
        </ScrollView>
    )
}

function Movie(props){
    const { movie }= props;
    const { id, poster_path, title }= movie;
    const navigation= useNavigation();

    const onNavigation= ()=> {
        navigation.navigate('movie', { id });
    }

    return (
        <TouchableWithoutFeedback onPress={()=> onNavigation()}>
            <View style={styles.movie}>
                {
                    poster_path !== null ? (
                        <Image 
                            style={styles.image}
                            source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}` }}
                        />
                    ) : (
                        <Text style={{ width: 200, height: 200 }}>{title}</Text>
                    )
                }
                {/* <Text>{ title }</Text> */}
            </View>
        </TouchableWithoutFeedback>
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
    },
    loadMoreContainer: {
        paddingTop: 10,
        paddingBottom: 30,
    },
    loadMore: {
        backgroundColor: 'transparent',
    }
})