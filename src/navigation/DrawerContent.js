import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props){
    const {navigation}= props;
    const [active, setActive]= useState("home");

    const data= usePreferences();
    console.log(data);

    const onChangeScreen= (screen)=> {
        setActive(screen);
        navigation.navigate(screen);
    }

    return(
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label="Inicio"
                    active={active === 'home' && true}
                    onPress={()=> onChangeScreen('home')}
                />
                <Drawer.Item
                    label="Peliculas populares"
                    active={active === 'popular' && true} 
                    onPress={()=> onChangeScreen('popular')}
                />
                <Drawer.Item
                    label="Nuevas peliculas"
                    active={active === 'news' && true}
                    onPress={()=> onChangeScreen('news')} 
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles= StyleSheet.create({

})