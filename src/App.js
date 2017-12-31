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

// Component
export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content') // iOS StatusBar light style
  }

  render() {
    return (
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
    );
  }

}

const styles = StyleSheet.create({

  navBar: {
    backgroundColor: Colors.navBar,
  },

});