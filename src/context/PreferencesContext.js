import React, {createContext} from 'react';

const PreferencesContext= createContext({
    theme: '',//Estado del tema
    toggleTheme: ()=> {},//Funcion para modificar el tema
});

export default PreferencesContext;