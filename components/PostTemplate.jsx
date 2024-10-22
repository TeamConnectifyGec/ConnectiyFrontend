import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Post = ({ post }) => {
    const handleCommentPress = () => {
        // Handle comment button press
        console.log('Comment button pressed');
    };

    return (
        <View style={styles.feed}>
            <View style={styles.profileSection}>
                <Image
                    style={styles.profilePic}
                    source={{ uri: post.pfp_link || 'default_profile_pic_url' }}
                />
                <Text style={styles.profileName}>{<post className="username"></post> || 'Unknown Author'}</Text>
                <Pressable style={styles.tindot}>
                    <FontAwesome5 name="ellipsis-v" size={24} />
                </Pressable>
                <Text style={styles.postDate}>{new Date(post.createdAt).toLocaleString()}</Text>
            </View>

            <View style={styles.postFrame}>
                <Text style={styles.postTitle}>{post.post_title}</Text>
                <Text style={styles.postContent}>{post.post_content}</Text>

                <View style={styles.interactionSection}>
                    <Text style={styles.likes}>
                        <Pressable style={styles.tindot}>
                            <FontAwesome5 name="thumbs-up" size={24} />
                        </Pressable>
                        {post.post_points || 0}
                    </Text>
                    <Text style={styles.comments}>
                        <Pressable style={styles.tindot} onPress={handleCommentPress}>
                            <FontAwesome5 name="comments" size={24} />
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
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
    },
    tindot: {
        marginHorizontal: 10,
    },
    postDate: {
        color: '#6c757d',
    },
    postFrame: {
        marginTop: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postContent: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 10,
    },
    interactionSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    likes: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    comments: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shares: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Post;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// const PostTemplate = ({ postId }) => {
//     const [post, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await axios.get(`http://your-api-url.com/api/posts/${postId}`);
//                 setPost(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPost();
//     }, [postId]);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (error) {
//         return <Text style={styles.error}>{error}</Text>;
//     }

//     return (
//         <View style={styles.postFrame}>
//             {post.image ? (
//                 <Image
//                     source={{ uri: post.image }}
//                     style={styles.postImage}
//                 />
//             ) : null}
//             <Text style={styles.title}>{post.title}</Text>
//             <Text style={styles.date}>{new Date(post.date).toLocaleString()}</Text>
//             <Text style={styles.content}>{post.content}</Text>
//             <View style={styles.tagsContainer}>
//                 {post.tags.map((tag, index) => (
//                     <View style={styles.tag} key={index}>
//                         <Text style={styles.tagText}>{tag}</Text>
//                     </View>
//                 ))}
//             </View>
//             <View style={styles.likesContainer}>
//                 <Image
//                     source={{ uri: 'thumbs_up_icon.png' }}
//                     style={styles.icon}
//                 />
//                 <Text style={styles.likesCount}>{post.likes}K</Text>
//                 <Image
//                     source={{ uri: 'comments_icon.png' }}
//                     style={styles.icon}
//                 />
//                 <Text style={styles.commentsCount}>{post.comments}K</Text>
//                 <Image
//                     source={{ uri: 'share_icon.png' }}
//                     style={styles.icon}
//                 />
//             </View>
//             <Image
//                 source={{ uri: post.profileImage }}
//                 style={styles.profilePic}
//             />
//             <Text style={styles.userName}>{post.userName}</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     postFrame: {
//         width: '90%',
//         marginHorizontal: '5%',
//         borderRadius: 10,
//         backgroundColor: '#FEFFFF',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         padding: 10,
//         marginBottom: 20,
//     },
//     postImage: {
//         width: '100%',
//         height: 200,
//         borderRadius: 10,
//         marginBottom: 10,
//     },
//     title: {
//         fontFamily: 'Roboto',
//         fontWeight: '700',
//         fontSize: 16,
//         lineHeight: 20,
//         color: '#000',
//         marginBottom: 5,
//     },
//     date: {
//         fontFamily: 'Roboto',
//         fontSize: 10,
//         lineHeight: 12,
//         color: '#000',
//         marginBottom: 10,
//     },
//     content: {
//         fontFamily: 'Roboto',
//         fontSize: 14,
//         lineHeight: 18,
//         color: '#000',
//         marginBottom: 10,
//     },
//     tagsContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginBottom: 10,
//     },
//     tag: {
//         backgroundColor: '#D9D9D9',
//         borderRadius: 4,
//         paddingHorizontal: 6,
//         paddingVertical: 2,
//         marginRight: 5,
//         marginBottom: 5,
//     },
//     tagText: {
//         fontFamily: 'Roboto',
//         fontSize: 10,
//         color: '#000',
//     },
//     likesContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     icon: {
//         width: 25,
//         height: 25,
//         marginRight: 5,
//     },
//     likesCount: {
//         fontFamily: 'Roboto',
//         fontSize: 14,
//         color: '#000',
//         marginRight: 15,
//     },
//     commentsCount: {
//         fontFamily: 'Roboto',
//         fontSize: 14,
//         color: '#000',
//         marginRight: 15,
//     },
//     profilePic: {
//         width: 39,
//         height: 39,
//         borderColor: '#A98CE6',
//         borderWidth: 1,
//         borderRadius: 19.5,
//         marginBottom: 5,
//     },
//     userName: {
//         fontFamily: 'Roboto',
//         fontWeight: '500',
//         fontSize: 15,
//         lineHeight: 18,
//         color: '#000',
//     },
//     error: {
//         color: 'red',
//         textAlign: 'center',
//     },
// });

// export default PostTemplate;
