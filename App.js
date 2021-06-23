import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Provider as PaperProvider, Button} from 'react-native-paper';

export default function App(){

  let loading= false;
  

  return(
    <PaperProvider>
      <SafeAreaView>
        <Text>Hola</Text>
        <Button 
          loading={loading} 
          icon="fingerprint" 
          mode="contained" 
          onPress={()=> console.log("Presionado")}
        >
          Press Me
        </Button>
      </SafeAreaView>
    </PaperProvider>
  )
}