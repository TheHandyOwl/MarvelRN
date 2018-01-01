import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Colors } from 'MarvelRN/src/commons'

// Redux
import { connect } from 'react-redux'

class CharacterDetail extends Component {

    render() {
        console.log("props:", this.props)
        const { character } = this.props
        const name = character ? character.name : ''
        return(
            <View style={ styles.container }>
                <Text>Nombre: {name}</Text>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}

export default connect (mapStateToProps, null) (CharacterDetail)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

})
