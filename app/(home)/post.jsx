import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {getToken} from '../../utils/tokenStorage'
import axios from 'axios';

const PostInputScreen = () => {
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);

  // Function to extract hashtags
  const extractHashtags = (content) => {
    const regex = /#(\w+)/g;  // This matches words after '#'
    const extractedTags = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      extractedTags.push(match[1]);
    }
    return extractedTags;
  };

  // Pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const getImageType = (uri) => {
    const extension = uri.split('.').pop();
    let type = '';
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        type = 'image/jpeg';
        break;
      case 'png':
        type = 'image/png';
        break;
      default:
        type = 'application/octet-stream'; // Fallback if extension is unknown
    }
    return type;
  };
  
  // Function to handle form submission
  const handleSubmit = async () => {
    const extractedTags = extractHashtags(postContent);
    setTags(extractedTags);

    // Create the post object
    const postData = {
      post_title: title,
      post_content: postContent,
      post_hashes: tags,
    };

    try {
      const token = await getToken();    
      const formData = new FormData();
      if(image){
        const imageType = getImageType(image.uri);
        formData.append('file', {
          uri: image.uri,
          name: `photo.${image.uri.split('.').pop()}`,
          type: imageType
        });
      }  
      formData.append('folder', 'post_images');
      formData.append('post_title', postData.post_title);
      formData.append('post_content',postData.post_content);
      formData.append('post_hashes',postData.post_hashes);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
     
      const response = await axios.post('https://connectify-backend-seven.vercel.app/api/user/create-post',formData ,config );

      Alert.alert('Success', 'Your post has been submitted!');
      //Clear inputs after success
      setTitle('');
      setPostContent('');
      setImage(null);
      setTags([]);

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error submitting your post.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.menuHeading}>
        <Text style={styles.headingText}>Create Post</Text>
      </View>
      <View style={styles.divider} />
      {/* Post Frame */}
      <View style={styles.postFrame}>
        {/* Post Title Section */}
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#757575"
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.divider} />

        {/* Post Content Section */}
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Content"
          placeholderTextColor="#767E84"
          value={postContent}
          onChangeText={setPostContent}
          textAlignVertical="top"
        />

      </View>
      {/* Image Upload Button */}
      <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
        <Ionicons name="image-outline" size={30} color="#1E1E1E" />
        <Text style={styles.subHeadingText}>Add an image (optional)</Text>
      </TouchableOpacity>

      {/* Display selected image */}
      {image && (
        <Image source={{ uri: image.uri }} style={styles.imagePreview} />
      )}
      {/* Submit Button */}
      <View style={styles.submitView}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    backgroundColor: 'white',
    padding: 16,
  },
  postFrame: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFFFF',
    borderRadius: 10,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
    marginTop: 20,
  },
  menuHeading: {
    flexDirection: 'row',
    alignItems: 'left',
    paddingVertical: 4,
    marginBottom: 20,
  },
  headingText: {
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 29,
    letterSpacing: 0.25,
    color: 'black',
  },
  subHeadingText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
    color: '#757575',
  },
  divider: {
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  titleInput: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    padding: 12,
    fontSize: 16,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    color: '#000',
  },
  textInput: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 0,
    padding: 16,
    fontSize: 16,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    color: '#000',
    lineHeight: 22,
  },
  imageUploadButton: {
    backgroundColor: 'transparent',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'left',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
    marginBottom: 16,
    width: '31',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  submitView: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 60,
    height: 60,
  },
  submitButtonInner: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostInputScreen;
