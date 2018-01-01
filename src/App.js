import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'

// My modules
import { Colors } from 'MarvelRN/src/commons'
import { webservices } from 'MarvelRN/src/webservices';

// Views
import CharactersList from 'MarvelRN/src/sections/characters/CharactersList'
import CharacterDetail from 'MarvelRN/src/sections/characters/CharacterDetail'
import CharacterNew from 'MarvelRN/src/sections/characters/CharacterNew'


/*************** REDUX ***************/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from 'MarvelRN/src/redux/reducers' // Nuestros reducers

const reducer = combineReducers(reducers) // Combinamos reducers si tenemos más de 1
const store = createStore ( // Creamos el store con:
  reducer,                  // - Nuestros reducer
  applyMiddleware(thunk)    // - Nuestro middleware
)
/*************************************/


// Component
export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content') // iOS StatusBar light style
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key='root'>
            <Scene
              initial
              key={ 'CharactersList' }
              component={ CharactersList }
              title={ 'Characters List' }
              navigationBarStyle={ styles.navBar }
              navBarButtonColor={ Colors.navBarText }
            />
            <Scene
              //initial
              key={ 'CharacterDetail' }
              component={ CharacterDetail }
              title={ 'Character Detail' }
              navigationBarStyle={ styles.navBar }
              navBarButtonColor={ Colors.navBarText }
            />
            <Scene
              //initial
              key={ 'CharacterNew' }
              component={ CharacterNew }
              title={ 'Character New' }
              navigationBarStyle={ styles.navBar }
              navBarButtonColor={ Colors.navBarText }
            />
          </Scene>
        </Router>
      </Provider>
    );
  }

}

const styles = StyleSheet.create({

  navBar: {
    backgroundColor: Colors.navBar,
  },

});
