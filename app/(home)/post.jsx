import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreatePostScreen = () => {
  const [postContent, setPostContent] = useState('');

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.heading}>Create Post</Text>
      </View>

      {/* Content Section */}
      <View style={styles.postFrame}>
        <TextInput
          placeholder="What's on your mind?"
          style={styles.textInput}
          multiline
          value={postContent}
          onChangeText={setPostContent}
          autoCapitalize="none"
        />
      </View>

      {/* Post Button */}
      <TouchableOpacity style={styles.postButton}>
        <Icon name="send" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50, // Ensures the top bar fits on mobile screens
  },
  topBar: {
    height: 80,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },
  postFrame: {
    margin: 16,
    flex: 1,
    backgroundColor: '#FEFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#757575',
    flex: 1,
    textAlignVertical: 'top', // Ensures text starts at the top
  },
  postButton: {
    width: 60,
    height: 60,
    backgroundColor: '#A98CE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default CreatePostScreen;
