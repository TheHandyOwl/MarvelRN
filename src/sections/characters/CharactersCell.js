import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors } from 'MarvelRN/src/commons'

export default class CharactersCell extends Component {

    static defaultProps = {
        item: {},
        onSelectItem: () => {},
    }

    render () {
        const item = this.props && this.props.item ? this.props.item : {}
        return (
            <TouchableOpacity style={{
                        height: 100,
                        backgroundColor: Colors.colorSecundario,
                        marginVertical: 10
                    }}
                onPress={ () => this.props.onSelectItem(item) }
            >
                <Text>{'Index:'}.- {item.id}</Text>
                <Text>{'Name'}.- {item.name}</Text>
                <Text>{'Thumbnail'}.- {
                        item.thumbnail.path + '.' + item.thumbnail.extension
                    }
                </Text>
            </TouchableOpacity>
        )

    }

}