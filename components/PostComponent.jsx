import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PostComponent = ({ post }) => {
    const handleCommentPress = () => {
        console.log("Comment button pressed");
    };

    let user = post && post.user_id ? post.user_id : null;

    if (!user) {
        user = post
    }
    return (
        <View style={styles.feed}>
            <View style={styles.profileSection}>
                <View style={styles.profileInfo}>
                    <Image
                        style={styles.profilePic}
                        source={{ uri: user.pfp_link || 'https://via.placeholder.com/100' }}
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

                {/* Add the image below the post title */}
                {post.post_image_link && (  // Check if image_url exists
                    <Image
                        style={styles.postImage}
                        source={{ uri: post.post_image_link }} // Use post.image_url
                    />
                )}

                <Text style={styles.postContent}>
                    {post.post_content || "No content available."}
                </Text>

                <View style={styles.interactionSection}>
                    <Text style={styles.likes}>
                        <Pressable style={styles.tindot}>
                            <FontAwesome5 name="thumbs-up" size={24} />
                        </Pressable>
                        {post.post_points || 0}
                    </Text>
                    <Text style={styles.comments}>
                        <Pressable style={styles.tindot} onPress={handleCommentPress}>
                            <FontAwesome5 name="comment" size={24} />
                        </Pressable>
                        {post.comments || 0}
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
        flexDirection: 'column',
        marginBottom: 4,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    tindot: {
        marginLeft: 'auto',
    },
    dateContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    postDate: {
        color: '#6c757d',
        marginBottom: 5,
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
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
        width: '100%', 
        height: 500,
        borderRadius: 10, 
        marginBottom: 10, 
        marginTop: 10, 
        objectFit: 'contain', 

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
});

export default PostComponent;
