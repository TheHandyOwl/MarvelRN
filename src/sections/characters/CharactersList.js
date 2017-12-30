import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

// My modules
import { AsyncCalls, Colors } from 'MarvelRN/src/commons'


export default class CharactersList extends Component {

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

    renderItem(item, index) {
        return (
            <View style={{
                        height: 100,
                        backgroundColor: Colors.colorTerciario,
                        marginVertical: 10
                    }}>
                <Text>{'Index:'}.- {item.id}</Text>
                <Text>{'Name'}.- {item.name}</Text>
                <Text>{'Thumbnail'}.- {
                        item.thumbnail.path + '.' + item.thumbnail.extension
                    }
                </Text>
            </View>
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

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

})
