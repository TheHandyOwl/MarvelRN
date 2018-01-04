import React, { Component } from 'react'
import { Alert, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Colors } from 'MarvelRN/src/commons'
import { Button } from 'MarvelRN/src/widgets'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'MarvelRN/src/redux/actions/characters'

class CharacterDetail extends Component {

    onSectionListItemSelected(item) {
        console.log("Sorry but Alert component makes simulator lazy -> Info to display:", item.name)
        // Sorry for that, but the simulator works very slowly when an alert is displayed
        /*
        Alert.alert(
            'Info',
            item.name,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
                //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ]
          )
          */
    }

    onDelete(id) {
        this.props.deleteCharacter(id)
    }

    render() {
        const { character } = this.props
        const id        = character ? character.id : ''
        const name      = character ? character.name : ''
        const image     = character &&
                character.thumbnail.path &&
                character.thumbnail.extension ?
                {
                    uri: character.thumbnail.path.replace('http://', 'https://') +
                    '.' +
                    character.thumbnail.extension
                } : require('MarvelRN/src/resources/placeholder.png')

        // Section List Data
        const comicsList = character && character.comics.items ?
                character.comics.items : []
        const seriesList = character && character.series.items ?
                character.series.items : []
        const storiesList = character && character.stories.items ?
                character.stories.items : []

        // Section List Headers
        const comics = character && character.comics.available ?
                'Comics: ' + character.comics.available :
                'Comics: ' + 'No comics available'
        const series = character && character.series.available ?
                'Series: ' + character.series.available :
                'Series: ' + 'No series available'
        const stories = character && character.stories.available ?
                'Stories: ' + character.stories.available :
                'Stories: ' + 'No stories available'

        return(
            <View style={ styles.container }>
                <View style={styles.imageContainer}>
                    <Image
                        style   = { styles.image }
                        source  = { image }
                    />
                    <Button
                        containerStyle={styles.buttonContainer}
                        labelStyle={styles.textButton}
                        label={'Borrar'}
                        onPress={ () => this.onDelete(id) }
                        isFetching={this.props.isFetching}
                        spinnerColor={Colors.darkBackground}
                    />
                </View>
                <SectionList
                    sections={[
                        {title: comics, data: comicsList},
                        {title: series, data: seriesList},
                        {title: stories, data: storiesList},
                    ]}
                    renderItem={({item}) => <TouchableOpacity onPress={ ()  => this.onSectionListItemSelected(item) }><Text style={styles.item}>{item.name}</Text></TouchableOpacity>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
        isFetching: state.characters.isFetching,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteCharacter: (id) => {
            dispatch(CharactersActions.deleteCharacter(id))
        },
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (CharacterDetail)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    imageContainer: {
        backgroundColor: Colors.lightBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: 350,
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        margin: 20,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: Colors.transparentButton,
    },

    textButton: {
        color: Colors.darkTextButton,
    },

    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.background,
        backgroundColor: Colors.sectionListTitleBackground,
    },
    
    item: {
        padding: 10,
        fontSize: 14,
    },

})
