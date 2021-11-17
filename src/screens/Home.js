import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { map } from 'lodash';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';
import { getNewsMoviesApi, getAllGenresApi, getGenresApi } from '../api/movies';


export default function Home(){
    const [newMovies, setNewMovies]= useState(null);
    const [genresList, setGenresList]= useState([]);
    const [genreSelected, setGenreSelected]= useState(28);
    const [genreMovies, setGenreMovies]= useState(null);

    useEffect(async() => {
      const data= await getNewsMoviesApi();
      setNewMovies(data.results);
    }, []);

    useEffect(async() => {
        const response= await getAllGenresApi();
        setGenresList(response.genres);
    }, []);

    useEffect(()=> {
        getGenresApi(genreSelected).then((response)=> {
            setGenreMovies(response.results);
        });
    }, [genreSelected]);


    const onChangeGenre= (newGenreId)=> {
        setGenreSelected(newGenreId);
    }

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
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
                    {
                        map(genresList, (genre)=> (
                            <Text 
                                key={genre.id} 
                                style={[styles.genre, {color: genre.id !== genreSelected ? "#8697a5" : "#fff"}]}
                                onPress={()=> onChangeGenre(genre.id)}    
                                >
                                { genre.name }
                            </Text>
                        ))
                    }
                </ScrollView>
                {
                    genreMovies && (
                        <CarouselMulti data={genreMovies} />
                    )
                }
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
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 10
    },
    genre: {
        marginRight: 20,
        fontSize: 16
    }
});