import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Spinner from 'react-native-spinkit'
// My modules
import { Colors } from 'MarvelRN/src/commons'

// My Views
import CharactersCell from './CharactersCell'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'MarvelRN/src/redux/actions/characters'

class CharactersList extends Component {

    constructor (props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentWillMount() {
        //this.props.fetchCharactersList()
        this.props.fetchInitCharactersList()
    }

    onSelectItem(character) {
        this.props.updateSelectedCharacter(character)
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

    renderFooter () {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner
                    isVisible={this.props.isFetching}
                    size={50}
                    type={'FadingCircleAlt'}
                    color={Colors.darkBackground}
                />
                </View>
        )
    }

    onEndReached() {
        if (this.props.list.length < this.props.total && !this.props.isFetching) {
            let newOffset = this.props.offset + this.props.step
            this.props.fetchCharactersListOffset(newOffset)
        }
    }

    render() {
        return(
            <View
                style={ styles.container }
            >
                <FlatList
                    data                = {this.props.list}
                    renderItem          = { ( { item, index } ) => this.renderItem(item, index) }
                    onEndReached        = { () => this.onEndReached() }
                    ListFooterComponent = { () => this.renderFooter() }
                    // Para forzar el repintado en el FlatList
                    extraData           = {this.props}
                    // Esto quita uno de los warning
                    keyExtractor        = { (item, index) => item.id }
                />

            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        list: state.characters.list,
        total: state.characters.total,
        offset: state.characters.offset,
        step: state.characters.step,
        character: state.characters.item,
        isFetching: state.characters.isFetching,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchInitCharactersList: () => {
            dispatch(CharactersActions.fetchInitCharactersList())
        },
        fetchCharactersListOffset: (offset) => {
            dispatch(CharactersActions.updateCharactersListOffset(offset))
            dispatch(CharactersActions.fetchCharactersListOffset())
        },
        /*
        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        },
        */
        updateSelectedCharacter: (character) => {
            dispatch(CharactersActions.updateSelectedCharacter(character))
        },
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (CharactersList)

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    spinnerContainer: {
        backgroundColor: Colors.lightBackground,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
    }

})
