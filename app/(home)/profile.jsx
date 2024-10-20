// File: ProfileScreen.js
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Pressable } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Posts');

  // Fetch profile data from API
  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://api.example.com/profile'); // Replace with your API
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://api.example.com/posts'); // Replace with your API
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProfile();
      await fetchPosts();
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postDate}>{item.date}</Text>
      <View style={styles.tagContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.likeText}>{item.likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.commentText}>{item.comments} Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Connectify</Text>
        <View style={styles.icon}>
          <Pressable>
            <FontAwesome5 name="cog" size={24}/>
          </Pressable>
        </View>
        <View style={styles.icon1}>
          <Pressable>
            <FontAwesome5 name="chevron-left" size={24}/>
          </Pressable>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#A98CE6" style={styles.loader} />
      ) : (
        <View style={styles.profileSection}>
          <View style={styles.headerContainer}>
          
            <Image source={{ uri: profile.profilePic }} style={styles.profilePic} />
            <View style={styles.connectionStats}>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Connections {profile.connections}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statText}>Communities {profile.communities}</Text>
              </View>
              <View>
                <Pressable>
                <Text style={styles.editProfile}>Edit profile</Text>
                </Pressable>
              </View>
            </View>
            <Text style={styles.profileName}>{profile.name}Aaditya Salgaonkar</Text>
          </View>
          <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>{profile.about}hi im a frontend developer</Text>
          </View>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Posts')}>
          <Text style={styles.tabLabel}>Posts</Text>
          {activeTab === 'Posts' && <View style={styles.indicator} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Media')}>
          <Text style={styles.tabLabel}>Comments</Text>
          {activeTab === 'Media' && <View style={styles.indicator} />}
        </TouchableOpacity>
      </View>

      {/* Posts or Media Section */}
      {loading ? (
        <ActivityIndicator size="large" color="#A98CE6" style={styles.loader} />
      ) : (
        activeTab === 'Posts' ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPost}
            style={styles.feedContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.mediaContainer}>
            <Text style={styles.mediaText}>Media Content Goes Here</Text>
            {/* Add Media Content Logic Here */}
          </View>
        )
      )}
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
  icon:{
    position:'relative',
    right:-90,
    top:17
  },
  icon1:{
    position:'relative',
    left:-250,
    top:17
  },
  profileSection: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10,
    marginHorizontal:5,
    backgroundColor:'#ffffff',
    flex:1,
    margin:-50,
    marginLeft:-20,
    padding:10,
    marginRight:-20,
    maxHeight:100,
    justifyContent:'center',

  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    marginTop:35,
    marginLeft:30
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#A98CE6',
    marginRight: 16,
  },
  connectionStats: {
    flex: 1,
  },
  editProfile:{
    fontWeight:'700',
    position:'relative',
    left:75,
    top:10,
    fontSize:12,
    
  },
  statBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderWidth:1,
    position:'relative',
    top:5,
    marginLeft:25,
    maxWidth:150,
    maxHeight:40
    
  },
  statText: {
    fontSize: 14,
    color: '#333333',
    fontWeight:'bold'
  },
  profileName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    position:'absolute',
    top:130,
    right:208,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop:10,
  },
  aboutContainer:{
    borderWidth:1,
    padding:15,
    paddingTop:5,
    marginTop:20,
    borderRadius:15,

  },
  aboutText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EAECEC',
    borderRadius: 10,
    marginBottom: 16,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#444444',
  },
  indicator: {
    height: 4,
    marginTop:5,
    width: '40%',
    backgroundColor: '#A98CE6',
    borderRadius: 100,
  },
  feedContainer: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#000',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 14,
    color: '#000',
  },
  commentText: {
    fontSize: 14,
    color: '#000',
  },
  shareText: {
    fontSize: 14,
    color: '#000',
  },
  loader: {
    marginTop: 50,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
