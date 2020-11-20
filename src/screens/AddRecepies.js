import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from '../components/Header';
const { createClient } = require('contentful/dist/contentful.browser.min.js')


export default function AddRecepies({ navigation }) {
    const [recepieName, setRecepieName] = useState('Krofna')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('So nutela')

    const client = createClient({
        accessToken: 'ifHWeGF8pXXoSfB2KAM24_LvyWwMAOB43Y_h4DlhMyw',
        space: '2fngjewoe4tk'
    })

    const enableButton = recepieName && description ? false : true;

    const postRecepie = () => {
        client.getSpace('2fngjewoe4tk')
            .then(space => space.getEnvironment('master'))
            .then(env => env.createEntry('Recepies', {
                fields: {
                    title: {
                        "en-US": recepieName
                    },
                    description: {
                        "en-US": description
                    }
                }
            }))
            .than(entry => console.log(entry))
            .catch(err => console.log('Error: ', err))
    }
    return (
        <View style={styles.constainer}>
            <Header navigation={navigation} />
            <View>
                <Text>Recepie name</Text>
                <TextInput value={recepieName} style={styles.textInputStyle} onChangeText={setRecepieName} />
                <Text>Image</Text>
                <TextInput value={imageUrl} style={styles.textInputStyle} onChangeText={setImageUrl} />
                <Text>Description</Text>
                <TextInput value={description} style={styles.textInputStyle} onChangeText={setDescription} />
                <View style={styles.button}>
                    <Button disabled={enableButton} title="Submit recepie on contentful" color="#f194ff" onPress={() => postRecepie()} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        padding: 20
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    button: {
        marginTop: 20,
    }
})
