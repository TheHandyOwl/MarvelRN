import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Colors } from 'MarvelRN/src/commons'

export default class CharacterNew extends Component {

    render() {
        return(
            <View style={ styles.container }>
                <Text>{this.props.title}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})
