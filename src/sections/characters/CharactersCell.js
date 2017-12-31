import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { Colors } from 'MarvelRN/src/commons'

export default class CharactersCell extends Component {

    static defaultProps = {
        item: {},
    }

    render () {
        const item = this.props && this.props.item ? this.props.item : {}
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

}