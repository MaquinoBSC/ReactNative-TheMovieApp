import React, { useState, useEffect } from 'react';
import {View, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IconButton, Text, Title } from 'react-native-paper';
import { lowerFirst, map } from 'lodash';
import { Rating } from 'react-native-ratings';
import ModalVideo from '../components/ModalVideo';
import { getMovieByIdApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

export default function Movie(){
    const route= useRoute();
    const { id }= route.params;
    const [movie, setMovie]= useState({});
    const [showVideo, setShowVideo]= useState(false);

    useEffect(()=> {
        getMovieByIdApi(id).then((response)=> {
            setMovie(response);
        });
    }, []);


    return(
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MovieImage posterPath={movie.poster_path} />
                <MovieTrailer setShow={setShowVideo} />
                <MovieTitle movie={movie} />
                <MovieRating voteCount={movie.vote_count} voteAverage={movie.vote_average} />
                <Text style={styles.overview}>{ movie.overview }</Text>
                <Text style={[styles.overview, {marginBottom: 20}]}>Fecha de lanzamiento: { movie.release_date }</Text>
            </ScrollView>
            <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
        </>
    )
}


function MovieImage(props){
    const { posterPath }= props;

    return (
        <View style={styles.viewPoster}>
            <Image style={styles.poster} source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }} />
        </View>
    )
}


function MovieTrailer(props){
    const { setShow }= props;

    return (
        <View style={styles.viewPlay}>
            <IconButton icon="play" color="#000" size={30} style={styles.play} onPress={()=> setShow(true)} />
        </View>
    )
}


function MovieTitle(props){
    const {movie}= props;

    return (
        <View style={styles.info}>
            <Title> {movie.title} </Title>
            <View style={styles.viewGenres}>
                {
                    map(movie.genres, (genre)=> {
                        return (
                            <Text key={genre.id} style={styles.genre}> { genre.name } </Text>
                        )
                    })
                }
            </View>
        </View>
    )
}


function MovieRating(props){
    const { voteCount, voteAverage= null}= props;
    const media= voteAverage/2;
    const { theme }= usePreferences();
    console.log("la media: ", media);

    return (
        <View style={styles.viewRating}>
            <Rating 
                type="custom"
                ratingImage={ theme === 'dark' ? starDark : starLight}
                startingValue={media}
                ratingColor="#ffc220"
                ratingBackgroundColor={ theme === 'dark' ? '#192734' : '#f0f0f0'}
                imageSize={20}
                style={{marginRight: 15}}
            />
            <Text style={{fontSize: 16, marginRight: 5}}>{media}</Text>
            <Text style={{fontSize: 12, color: '#8797a5'}}>{voteCount} votos</Text>
        </View>
    )
}


const styles= StyleSheet.create({
    viewPoster: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        textShadowRadius: 10
    },
    poster: {
        width: '100%',
        height: 500,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    viewPlay: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    play: {
        backgroundColor: '#fff',
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    info:{
        marginHorizontal: 30
    },
    viewGenres: {
        flexDirection: 'row',
    },
    genre: {
        marginRight: 10,
        color: '#8697a5',
    },
    viewRating: {
        marginHorizontal: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    overview: {
        marginHorizontal: 30,
        marginTop: 20,
        textAlign: 'justify',
        color: '#8697a5'
    }
})