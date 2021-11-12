import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import { getNewsMoviesApi, getAllGenresApi } from '../api/movies';


export default function Home(){
    const [newMovies, setNewMovies]= useState(null);
    const [genreMovies, setGenreMovies]= useState(null);


    useEffect(async() => {
      const data= await getNewsMoviesApi();
      setNewMovies(data.results);
    }, []);

    useEffect(async() => {
        const response= await getAllGenresApi();
        setGenreMovies(response);
    }, []);

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                newMovies && (
                    <View style={styles.news}>
                        <Title style={styles.newsTitle}>Nuevas Películas</Title>
                        <CarouselVertical data={newMovies} />
                    </View>
                )
            }

            <View style={styles.genres}>
                <Title style={styles.genresTitle}>Peliculas por genero</Title>
            </View>
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    news: {
        marginVertical: 10,
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    genres: {
        marginTop: 20,
        marginBottom: 50,

    },
    genresTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    }
});