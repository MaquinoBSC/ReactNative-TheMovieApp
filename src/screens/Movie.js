import React from 'react';
import {View, Text} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Movie(){
    const route= useRoute();
    const { id }= route.params;

    return(
        <View>
            <Text>Estamos en Movie</Text>
        </View>
    )
}