import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const comments = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comments</Text>
            {/* Example comment display */}
            <Text style={styles.comment}>This is a great post!</Text>
            <Text style={styles.comment}>I totally agree!</Text>
            <Text style={styles.comment}>Looking forward to the Olympics!</Text>
            
            <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
                <Text style={styles.goBackText}>Go Back</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    comment: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    goBack: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#6200EE',
        borderRadius: 5,
    },
    goBackText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default comments;
