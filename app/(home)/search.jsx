import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const PostSearch = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Post Frame */}
        <View style={styles.postFrame}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image source={{ uri: 'the-good-doctor-streaming-i-am-a-surgeon' }} style={styles.profilePic} />
            <Text style={styles.profileName}>Good Guy</Text>
            <View style={styles.moreIcon}></View>
          </View>

          {/* Post Title */}
          <Text style={styles.postTitle}>Keeping Your Dog’s Diet Healthy: Tips for a Happy, Fit Pup!</Text>

          {/* Post Date */}
          <Text style={styles.postDate}>24 Mar 2024 12:00 PM</Text>

          {/* Post Tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Dogs</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Dog health</Text>
            </View>
          </View>

          {/* Post Content */}
          <Text style={styles.postContent}>
            Just like us, our furry friends need a balanced diet to stay healthy and full of energy. 🐶🥦 Here are some tips to keep your dog’s diet on track...
          </Text>

          {/* Like, Comment, Share Section */}
          <View style={styles.interactionSection}>
            <View style={styles.likeSection}>
              <View style={styles.likeIcon}></View>
              <Text style={styles.likeCount}>12K</Text>
            </View>

            <View style={styles.commentSection}>
              <View style={styles.commentIcon}></View>
              <Text style={styles.commentCount}>1.1K</Text>
            </View>

            <View style={styles.shareIcon}></View>
          </View>
        </View>

        {/* Navbar */}
        <View style={styles.navbar}>
          <View style={styles.navIcon}></View>
          <View style={styles.navIcon}></View>
          <View style={styles.navIcon}></View>
          <View style={styles.navIcon}></View>
          <View style={styles.navIcon}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 360,
    height: 800,
    backgroundColor: '#FFFFFF',
  },
  postFrame: {
    position: 'absolute',
    width: 329,
    height: 331,
    left: 16,
    top: 100,
    backgroundColor: '#FEFFFF',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25), 0px -0.5px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 13,
  },
  profilePic: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    borderColor: '#A98CE6',
    borderWidth: 1,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  moreIcon: {
    width: 25,
    height: 25,
    borderColor: '#1E1E1E',
    borderWidth: 2,
    marginLeft: 'auto',
    marginRight: 15,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    paddingLeft: 10,
    color: '#000000',
  },
  postDate: {
    fontSize: 8,
    paddingLeft: 10,
    marginTop: 5,
    color: '#000000',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 10,
  },
  tag: {
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    marginRight: 10,
    padding: 2,
  },
  tagText: {
    fontSize: 10,
    color: '#000000',
  },
  postContent: {
    fontSize: 12,
    paddingLeft: 11,
    paddingRight: 11,
    marginTop: 10,
    color: '#000000',
  },
  interactionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  likeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    width: 25,
    height: 25,
    borderColor: '#1E1E1E',
    borderWidth: 1.5,
  },
  likeCount: {
    marginLeft: 10,
    fontSize: 15,
    color: '#000000',
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentIcon: {
    width: 25,
    height: 25,
    borderColor: '#1E1E1E',
    borderWidth: 1.5,
  },
  commentCount: {
    marginLeft: 10,
    fontSize: 15,
    color: '#000000',
  },
  shareIcon: {
    width: 25,
    height: 25,
    borderColor: '#1E1E1E',
    borderWidth: 1.5,
  },
  navbar: {
    position: 'absolute',
    width: 360,
    height: 56,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navIcon: {
    width: 30,
    height: 30,
    borderColor: '#1E1E1E',
    borderWidth: 3,
  },
});

export default PostSearch;
