import React, { Component } from 'react';
import { Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux'

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

  renderAddCharacterButton() {
    return (
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={ () => Actions.CharacterNew() }>
          {'Add character'}
        </Text>
      </TouchableOpacity>
    )
  }

  renderMoreInfoButton(item) {
    const detailUrl = item && item.urls ?
        item.urls
          .filter( url => url.type == "detail" )
          .map(item => item.url)[0]
          .toString()
          .replace("http:","https:")
      : null

     return ( detailUrl ?
        <TouchableOpacity style={styles.addButton}>
          <Text
            style={styles.addButtonText}
            onPress={ () => Linking.openURL(detailUrl) }>
            {'More info'}
          </Text>
        </TouchableOpacity>
        : null
      )
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
              renderRightButton={ () => this.renderAddCharacterButton() }
            />
            <Scene
              //initial
              key={ 'CharacterDetail' }
              component={ CharacterDetail }
              title={ 'Character Detail' }
              navigationBarStyle={ styles.navBar }
              navBarButtonColor={ Colors.navBarText }
              renderRightButton={ () => this.renderMoreInfoButton(store.getState().characters.item) }
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

  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  addButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
