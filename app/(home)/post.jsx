// File: PostInputScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const PostInputScreen = () => {
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);

  // Pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Post Frame */}
      <View style={styles.postFrame}>
        {/* Post Title Section */}
        <View style={styles.menuHeading}>
          <Text style={styles.headingText}>Post Title</Text>
        </View>
        <TextInput
          style={styles.titleInput}
          placeholder="Enter the title of your post"
          placeholderTextColor="#757575"
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.divider} />

        {/* Post Content Section */}
        <View style={styles.menuHeading}>
          <Text style={styles.subHeadingText}>Content</Text>
        </View>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Enter your post here..."
          placeholderTextColor="#757575"
          value={postContent}
          onChangeText={setPostContent}
          textAlignVertical="top"
        />

        {/* Image Upload Button */}
        <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
          <Ionicons name="image-outline" size={31} color="#1E1E1E" />
        </TouchableOpacity>

        {/* Display selected image */}
        {image && (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <View style={styles.submitButtonInner}>
            <Ionicons name="send" size={30} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16, // Added padding to the ScrollView
  },
  postFrame: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FEFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
  },
  menuHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  headingText: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
    letterSpacing: -0.02,
    color: '#767E84',
  },
  subHeadingText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    color: '#757575',
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 16,
  },
  titleInput: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    color: '#000',
    marginBottom: 16,
  },
  textInput: {
    width: '100%',
    height: 120,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    color: '#000',
    lineHeight: 22,
    marginBottom: 20,
  },
  imageUploadButton: {
    backgroundColor: '#A98CE6',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#A98CE6',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  submitButtonInner: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostInputScreen;
