import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Colors } from 'MarvelRN/src/commons'
import { Button, Input } from 'MarvelRN/src/widgets'

// Redux
import { connect } from 'react-redux';
import * as CharactersActions from 'MarvelRN/src/redux/actions/characters'

class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name        : '',
            nameError   : '',
            image       : null,
            imageError   : '',
        }

    }

    validateForm() {

        let valid = true
        let errors = {}

        if (!this.state.name) {
            errors.name = 'Choose a valid name'
            valid = false
        }

        if (!this.state.thumbnail) {
            errors.image = 'Choose a valid image'
            valid = false
        }
        
        this.setState({
            nameError: errors.name ? errors.name : '',
            imageError: errors.image ? errors.image : '',
        })

        return valid

    }

    onSelectImageTapped() {
        this.setState({
            thumbnail: {
                extension: "jpg",
                path: "https://news.marvel.com/wp-content/uploads/2016/09/561ecde9dfbf6-1"
            },
            imageError: ''
        })

    }

    onSubmit() {

        if (this.validateForm()) {
            const characterData = {
                name: this.state.name,
                thumbnail: this.state.thumbnail,
            }

            this.props.postCharacter(characterData)
        }
    }

    render() {
        const image = this.state.thumbnail ? { uri: this.state.thumbnail.path + '.' + this.state.thumbnail.extension } : null
        const thumbnail = this.state.thumbnail ? this.state.thumbnail : null
        const imageButtonText = this.state.image ?
            this.state.image.fileName : 'Choose image'
        return(
            <View style={ styles.container }>
                
                <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        style={styles.imageContainerBackground}
                        resizeMode={'cover'}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={ () => this.onSelectImageTapped() }
                    >
                        <Text style={styles.textButton}>{imageButtonText}</Text>
                    </TouchableOpacity>
                    <Text style={styles.imageError}>{ this.state.imageError }</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        inputStyle={styles.input}
                        labelStyle={styles.label}
                        errorStyle={styles.inputError}
                        onChangeText    = { (v) => this.setState({
                            name: v,
                            nameError: '',
                        })}
                        value           = { this.state.name }
                        error           = { this.state.nameError }
                        label           = { 'Name:' }
                        placeholder     = { 'Super López' }
                    />
                </View>

                <View>
                    <Button
                        containerStyle={styles.buttonContainer}
                        label={'Guardar'}
                        onPress={ () => this.onSubmit() }
                    />
                </View>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postCharacter: (data) => {
            dispatch(CharactersActions.postCharacter(data))
        },
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (CharacterNew)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },

    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: Colors.colorTerciario,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    imageError: {
        color: Colors.labelInput,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    inputContainer: {
        margin: 20,
    },

    label: {
        color: Colors.labelInput,
    },

    input: {
        color: Colors.textInput,
    },

    inputError: {
        color: Colors.labelInput,
    },

    buttonContainer: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: Colors.darkButton,
        backgroundColor: Colors.lightButton,
    },

    button: {
        padding: 10,
        borderColor: Colors.textInput,
        borderWidth: 1,
        borderRadius: 6,
    },

})
