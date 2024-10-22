import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FeedScreen = () => {
    const router = useRouter();
    
    // Updated function to navigate back
    const handleCommentPress = () => {
        // Navigate back to the previous page
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Header with Search Bar */}
            <View style={styles.header}>
                <Text style={styles.title}>Connectify</Text>
                
                <View style={styles.icon1}>
                    <Pressable>
                        <FontAwesome5 name="bars" size={24} />
                    </Pressable>
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="#000000"
                />
            </View>

            <View style={styles.feed}>
                <View style={styles.profileSection}>
                    <Image
                        style={styles.profilePic}
                        source={{ uri: 'your_profile_pic_url' }}
                    />
                    <Text style={styles.profileName}>Boomer</Text>
                    <Pressable style={styles.tindot}>
                        <FontAwesome5 name="ellipsis-v" size={24} />
                    </Pressable>
                    <Text style={styles.postDate}>27 Mar 2024 7:30 PM</Text>
                </View>

                <View style={styles.postFrame}>
                    <Text style={styles.postTitle}>Should Football Be a Bigger Part of the Olympics?</Text>
                    <Text style={styles.postContent}>
                        Football is the world’s most popular sport, yet it often feels like an afterthought at the Olympics...
                    </Text>

                    <View style={styles.interactionSection}>
                        <Text style={styles.likes}>
                            <Pressable style={styles.tindot}>
                                <FontAwesome5 name="thumbs-up" size={24} />
                            </Pressable>
                            33K
                        </Text>
                        <Text style={styles.comments}>
                            <Pressable style={styles.tindot} onPress={handleCommentPress}>
                                <FontAwesome5 name="comments" size={24} />
                            </Pressable>
                            11K
                        </Text>
                        <Text style={styles.shares}>
                            <Pressable style={styles.tindot}>
                                <FontAwesome5 name="share-alt" size={24} />
                            </Pressable>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Roboto',
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    feed: {
        backgroundColor: "#ffffff",
        flex: 1,
        position: 'relative',
        top: 70,
        borderRadius: 20,
        borderWidth: 1,
        maxHeight: 450
    },
    icon1: {
        position: 'relative',
        left: 190,
        top: -15
    },
    tindot: {
        position: 'relative',
        top: -42,
        left: 190,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        flex: 1,
        margin: -50,
        marginLeft: -20,
        padding: 10,
        marginRight: -20,
        maxHeight: 150,
        borderWidth: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: -30,
        marginLeft: 20
    },
    searchBar: {
        height: 40,
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        marginTop: -30,
        paddingHorizontal: 10,
        fontSize: 15,
        position: 'relative',
        right: 140,
        width: 330,
        marginBottom: -100
    },
    profileSection: {
        position: 'absolute',
        left: 13,
        top: 75,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 19.5,
        borderWidth: 1,
        marginTop: -80,
        marginLeft: 10,
        borderColor: '#A98CE6',
    },
    profileName: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: '500',
        marginTop: -85,
        color: '#000000',
    },
    postDate: {
        fontSize: 8,
        color: '#000000',
        position: 'absolute',
        right: -190,
        top: 0,
    },
    postFrame: {
        position: 'absolute',
        top: 100,
        left: 13,
        width: 329,
        height: 300,
        backgroundColor: '#FEFFFF',
        borderRadius: 10,
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
        padding: 10,
    },
    postTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 8,
    },
    postContent: {
        fontSize: 12,
        color: '#000000',
        marginBottom: 16,
    },
    interactionSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        bottom: -200,
    },
    likes: {
        fontSize: 15,
        color: '#000000',
    },
    comments: {
        fontSize: 15,
        color: '#000000',
    },
    shares: {
        fontSize: 15,
        color: '#000000',
    },
});

export default FeedScreen;