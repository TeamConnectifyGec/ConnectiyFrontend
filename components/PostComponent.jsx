import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getToken } from "../utils/tokenStorage";

const PostComponent = ({ post }) => {
  const navigation = useNavigation();
  const [likes, setLikes] = useState(post.likeCount);
  const [userLiked, setUserLiked] = useState(post.userLiked);
  const [commentCount, setCommentCount] = useState(post.commentCount);

  let user = post && post.user_id ? post.user_id : null;

  if (!user) {
    user = post;
  }

  const handleLikePress = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(
        "https://connectify-backend-seven.vercel.app/api/post/like",
        { postId: post._id },
        config
      );
      setLikes(userLiked ? likes - 1 : likes + 1);
      setUserLiked(!userLiked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentPress = () => {
    navigation.navigate("Comments", { postId: post._id });
  };

  return (
    <View style={styles.feed}>
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <Image
            style={styles.profilePic}
            source={{ uri: user.pfp_link || "https://via.placeholder.com/100" }}
          />
          <Text style={styles.profileName}>
            {user.username || "Unknown Author"}
          </Text>
          <Pressable style={styles.tindot}>
            <FontAwesome5 name="ellipsis-v" size={24} />
          </Pressable>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.postDate}>
            {new Date(post.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.postFrame}>
        <Text style={styles.postTitle}>{post.post_title || "Untitled"}</Text>

        {post.post_image_link && (
          <Image
            style={styles.postImage}
            source={{ uri: post.post_image_link }}
          />
        )}

        <Text style={styles.postContent}>
          {post.post_content || "No content available."}
        </Text>

        <View style={styles.interactionSection}>
          <Text style={styles.likes}>
            <Pressable style={styles.tindot} onPress={handleLikePress}>
              <FontAwesome5
                name={userLiked ? "thumbs-up" : "thumbs-o-up"}
                size={24}
              />
            </Pressable>
            {likes}
          </Text>
          <Text style={styles.comments}>
            <Pressable style={styles.tindot} onPress={handleCommentPress}>
              <FontAwesome5 name="comment-o" size={24} />
            </Pressable>
            <Text style={styles.actionText}>{commentCount}</Text>
          </Text>
          <Text style={styles.shares}>
            <Pressable style={styles.tindot}>
              <FontAwesome5 name="share-alt" size={24} />
            </Pressable>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feed: {
    backgroundColor: "#fff",
    marginBottom: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profileSection: {
    flexDirection: "column",
    marginBottom: 4,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  tindot: {
    marginLeft: "auto",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  postDate: {
    color: "#6c757d",
    marginBottom: 5,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  postFrame: {
    marginTop: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postImage: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    objectFit: "contain",
  },
  postContent: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 10,
  },
  interactionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 8,
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  shares: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
  },
});

export default PostComponent;
