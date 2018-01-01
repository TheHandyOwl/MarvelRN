import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

// My modules
import { AsyncCalls, Colors } from 'MarvelRN/src/commons'

// My Views
import CharactersCell from './CharactersCell'

// Redux
import { connect } from 'react-redux'

class CharactersList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
        }
    }

    componentWillMount() {
        AsyncCalls.fetchCharacters()
            .then( response => {
                console.log("fetchCharacters fetch response: ", response)
                this.setState( { list: response.data.results } )
            })
            .catch( error => {
                console.log("fetchCharacters fetch error:", error)
                this.setState( { list: [] } )
            })
    }

    onSelectItem(character) {
        console.log("Pulsaron id:", character.id, "-", character.name)
        Actions.CharacterDetail( { title: character.name } )

    }

    renderItem(item, index) {
        return (
            <CharactersCell
                item={item}
                onSelectItem={ (character) => this.onSelectItem(character) }
            />
        )
    }

    render() {
        return(
            <View
                style={ styles.container }
            >
                <FlatList
                    data        = {this.state.list}
                    renderItem  = { ( { item, index } ) => this.renderItem(item, index) }
                    // Para forzar el repintado en el FlatList
                    extraData   = {this.state}
                    // Esto quita uno de los warning
                    keyExtractor= { (item, index) => item.id }
                />

            </View>
        )
    }

}

const mapStateToProps = (state) => {
        console.log("state:", state)
        return {
        list: state.characters.list,
    }
}

export default connect (mapStateToProps, null) (CharactersList)

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

})
