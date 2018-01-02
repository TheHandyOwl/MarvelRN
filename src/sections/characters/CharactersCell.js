import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Colors } from 'MarvelRN/src/commons'

export default class CharactersCell extends Component {

    static defaultProps = {
        item: {},
        onSelectItem: () => {},
    }

    render () {
        console.log("item:", item)
        const item      = this.props && this.props.item ? this.props.item : {}
        const name      = item && item.name ? item.name : ''
        const image     = item && item.thumbnail.path && item.thumbnail.extension ?
            {
                uri: item.thumbnail.path.replace('http://', 'https://') +
                '.' +
                item.thumbnail.extension
            } : require('MarvelRN/src/resources/placeholder.png')
        const comics = item && item.comics.available ?
                        'Comics: ' + item.comics.available : ''
        const series = item && item.series.available ?
                        'Series: ' + item.series.available : ''
        const stories = item && item.stories.available ?
                        'Stories: ' + item.stories.available : ''

        return (
            <TouchableOpacity
                onPress={ () => this.props.onSelectItem(item) }
            >
                <Image
                    style   = { styles.image }
                    source  = { image }
                />
                <View style = { styles.textContainer }>
                    <Text style={styles.textBox}>
                        {name}
                        {'\n'}
                        {comics ? comics : ''}
                        {comics && series ? ' - ' : ''}
                        {series ? series + '' : ''}
                        {(comics || series) && stories ? ' - ' : ''}
                        {stories ? stories : ''}
                        {comics || series || stories ? '' : 'No info available'}
                    </Text>
                </View>
            </TouchableOpacity>
        )

    }

}

const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 200,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.blackShadowBG,
    },

    textBox: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center',
    },

})
