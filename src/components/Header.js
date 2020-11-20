import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

export default function Header({navigation}) {
    return (
        <View style={styles.container}>
            <Feather name="menu" size={25} style={styles.iconStyle} onPress={() => navigation.openDrawer()}/>
            <Text style={styles.textStyle}>RecepiesBook</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    iconStyle:{
        padding: 10
    },
    textStyle: {
        fontSize: 25,
        padding: 10
    }
})
