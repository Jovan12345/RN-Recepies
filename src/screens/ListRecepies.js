import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, Image, View, Button } from 'react-native';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { client } from '../apis/contentfullCliet';

import Header from '../components/Header';

export default function ListRecepies({ navigation }) {
    const [recepies, setRecepies] = useState([])

    const contentfulToReactnative = {
        renderMark: {
            [MARKS.UNDERLINE]: (text) => {
                return <Text style={{ textDecorationLine: 'underline' }}>{text}</Text>;
            },
            [MARKS.BOLD]: (text) => {
                return <Text style={{ fontWeight: "bold" }}>{text}</Text>;
            },
            [MARKS.ITALIC]: (text) => {
                return <Text style={{ fontStyle: 'italic' }}>{text}</Text>;
            },
            [MARKS.CODE]: (text) => {
                return <Text>{text}</Text>;
            },
        },
        renderNode: {
            [INLINES.HYPERLINK]: (node) => {
                return null;
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                return null;
            },
            [BLOCKS.PARAGRAPH]: (_node, children) => {
                return <Text>{children}</Text>;
            },
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                return null;
            },
            [BLOCKS.HEADING_1]: (_node, children) => <Text>{children}</Text>,
            [BLOCKS.HEADING_2]: (_node, children) => <Text>{children}</Text>,
            [BLOCKS.HEADING_3]: (_node, children) => <Text>{children}</Text>,
            [BLOCKS.HEADING_4]: (_node, children) => <Text>{children}</Text>,
            [BLOCKS.HEADING_5]: (_node, children) => <Text>{children}</Text>,
            [BLOCKS.HEADING_6]: (_node, children) => <Text>{children}</Text>,
            [BLOCKS.UL_LIST]: (_node, children) => {
                return (
                    <View>
                        {children.map((child, i) => {
                            return child;
                        })}
                    </View>
                );
            },
            [BLOCKS.OL_LIST]: (_node, children) => {
                return children.map((child, i) => {
                    return child;
                });
            },
            [BLOCKS.LIST_ITEM]: (_node, child) => {
                return <View>{child}</View>;
            },
            [BLOCKS.QUOTE]: (_node, child) => {
                return <Text>{child}</Text>;
            },
            [BLOCKS.HR]: (_node, child) => {
                return <Text>{child}</Text>;
            },
        },
    };

    useEffect(() => {
        client.getEntries()
            .then(response => setRecepies(response.items))
            .catch(console.error)
    }, [])

    return (
        <View>
            <Header navigation={navigation} />
            {recepies ?
                <FlatList
                    data={recepies}
                    keyExtractor={item => item.sys.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.fields.title}</Text>
                            <Image style={styles.imgStyle} source={{ uri: 'http:' + item.fields.featuredImage.fields.file.url }} />
                            <Text>{item.fields.description}</Text>
                            {documentToReactComponents(item.fields.richText, contentfulToReactnative)}
                        </View>
                    )}
                />
                :
                <Text>Loading</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'grey'
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: 'red'
    },
    imgStyle: {
        width: 170,
        height: 170,
    }
});