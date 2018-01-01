import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

// My modules
import { Colors } from 'MarvelRN/src/commons'

// My Views
import CharactersCell from './CharactersCell'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'MarvelRN/src/redux/actions/characters'

class CharactersList extends Component {

    componentWillMount() {
        this.props.fetchCharactersList()
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
                    data        = {this.props.list}
                    renderItem  = { ( { item, index } ) => this.renderItem(item, index) }
                    // Para forzar el repintado en el FlatList
                    extraData   = {this.props}
                    // Esto quita uno de los warning
                    keyExtractor= { (item, index) => item.id }
                />

            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        list: state.characters.list,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (CharactersList)

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

})
