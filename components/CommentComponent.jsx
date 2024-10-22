import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Comment = ({ comment }) => {
    const handleLikePress = () => {
        // Handle like button press
        console.log('Like button pressed');
    };

    return (
        <View style={styles.commentContainer}>
            <View style={styles.header}>
                <Image
                    style={styles.profilePic}
                    source={{ uri: comment.pfp_link || 'default_profile_pic_url' }}
                />
                <Text style={styles.username}>{comment.username || 'Unknown User'}</Text>
                <Text style={styles.date}>{new Date(comment.createdAt).toLocaleString()}</Text>
            </View>
            <Text style={styles.commentText}>{comment.text}</Text>
            <Pressable style={styles.likeButton} onPress={handleLikePress}>
                <FontAwesome5 name="thumbs-up" size={20} />
                <Text style={styles.likesCount}>{comment.likes || 0}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 14,
        flex: 1,
    },
    date: {
        fontSize: 12,
        color: '#6c757d',
    },
    commentText: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 10,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likesCount: {
        marginLeft: 5,
    },
});

export default Comment;
