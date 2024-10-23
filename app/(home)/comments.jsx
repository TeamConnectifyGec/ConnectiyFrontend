
// screens/Comments.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Button, Pressable } from 'react-native';
import { getToken } from '../../utils/tokenStorage';
import axios from 'axios';

const CommentsScreen = ({ route, navigation }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { postId } = route.params; // Get the postId passed as a parameter

    useEffect(() => {
        // Fetch comments for the post when the component mounts
        // This is just a placeholder for the real API call
        const fetchComments = async () => {
            // // Fetch comments for the postId
            // const fetchedComments = [
            //     { id: '1', text: 'Great post!' },
            //     { id: '2', text: 'Very informative.' },
            //     { id: '3', text: 'Thanks for sharing.' }
            // ];
            // setComments(fetchedComments);
            // console.log(fetchedComments);
            const token = await getToken();
            try{

              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              const response = await axios.get('https://connectify-backend-seven.vercel.app/api/search/comments',{post_id: postId}, config); 
      
              setComments(response.data);
            } catch(error){
              console.error('Error fetching user communities count:', error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleAddComment = () => {
        if (newComment.trim()) {
            // Add the new comment to the list (placeholder)
            setComments([...comments, { id: Date.now().toString(), text: newComment }]);
            setNewComment('');
        }
    };

    const renderCommentItem = ({ item }) => (
        <View style={styles.commentItem}>
            <Text>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backText}>Back</Text>
            </Pressable>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={renderCommentItem}
                style={styles.commentsList}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <Button title="Send" onPress={handleAddComment} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    commentsList: {
        flex: 1,
    },
    commentItem: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#D9D9D9',
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        height: 40,
    },
    backButton: {
        marginBottom: 10,
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
    },
});

export default CommentsScreen;
