import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getToken } from '../../../utils/tokenStorage';

const Post = ({ item }) => {
  const navigation = useNavigation();
  const [likes, setLikes] = useState(item.post_points);
  const [userLiked, setUserLiked] = useState(item.userLiked);
  const [commentCount, setCommentCount] = useState(item.commentCount);

  const handleLikePress = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.error('No token found');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.post('https://connectify-backend-seven.vercel.app/api/post/like', { postId: item._id }, config);
      setLikes(userLiked ? likes - 1 : likes + 1);
      setUserLiked(!userLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentPress = () => {
    navigation.navigate('Comments', { postId: item._id });
  };

  return (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.post_title}</Text>
      {item.post_image_link && <Image source={{ uri: item.post_image_link }} style={styles.postImage} />}
      {item.post_content && <Text style={styles.postContent}>{item.post_content}</Text>}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
          <FontAwesome name={userLiked ? "thumbs-up" : "thumbs-o-up"} size={20} />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCommentPress}>
          <FontAwesome name="comment-o" size={20} />
          <Text style={styles.actionText}>{commentCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  postContent: {
    fontSize: 16,
    color: '#555',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
  },
});

export default Post;
