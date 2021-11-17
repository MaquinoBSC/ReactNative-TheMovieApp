import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { BASE_PATH_IMG } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

const { width }= Dimensions.get('window');
const ITEM_WIDTH= Math.round(width * 0.3);


export default function CarouselMulti(props){
    const { data }= props;

    return (
        <Carousel
            layout={'default'}
            data={data}
            renderItem={(item)=> <RenderItem data={item} />}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH} 
        />
    )
}


function RenderItem(){
    const navigation= useNavigation();

    return (
        <View>
            <Title>Hola</Title>
        </View>
    )
}