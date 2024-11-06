// File: ProfileScreen.js
import { getToken } from "../../utils/tokenStorage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";
import Post from "./components/profilePostComponent";
import Comment from "./components/profileCommentComponent";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    pfp_link: "",
    username: "",
    name: "",
    bio: "",
    email: "",
    _id: "",
  });
  const navigation = useNavigation();
  const [connections, setConnections] = useState(0);
  const [communities, setCommunities] = useState(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const renderPost = ({ item }) => <Post item={item} />;
  const renderComment = ({ item }) => <Comment item={item} />;

  // Fetch user data from the server
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://connectify-backend-seven.vercel.app/api/user/profile",
          config
        ); // Replace with your API endpoint
        setUserData(response.data);
        setEditedName(response.data.name || ""); // Set default if actualName is not available
        setEditedBio(response.data.bio);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://connectify-backend-seven.vercel.app/api/user/connections/count",
          config
        );

        setConnections(response.data.count);

      } catch (error) {
        console.error("Error fetching user connections count:", error);
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://connectify-backend-seven.vercel.app/api/user/communities/count",
          config
        );

        setCommunities(response.data.count);
      } catch (error) {
        console.error("Error fetching user communities count:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await getToken();
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://connectify-backend-seven.vercel.app/api/user/posts",
          config
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = await getToken();

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://connectify-backend-seven.vercel.app/api/user/comments",
          config
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (selectedTab === "Comments") {
      fetchComments();
    }
  }, [selectedTab]);

  const handleProfilePictureChange = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    const getImageType = (uri) => {
      const extension = uri.split(".").pop();
      let type = "";
      switch (extension) {
        case "jpg":
        case "jpeg":
          type = "image/jpeg";
          break;
        case "png":
          type = "image/png";
          break;
        default:
          type = "application/octet-stream"; // Fallback if extension is unknown
      }
      return type;
    };

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync(options);

      if (result.didCancel) {
        console.log("User cancelled image picker");
      } else if (result.error) {
        console.log("ImagePicker Error: ", result.error);
      } else {
        const uri = result.assets[0].uri;
        try {
          const token = await getToken();

          const formData = new FormData();

          const imageType = getImageType(uri);
          formData.append("file", {
            uri: uri,
            name: `photo.${uri.split(".").pop()}`,
            type: imageType,
          });

          formData.append("folder", "pfp");

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.put(
            "https://connectify-backend-seven.vercel.app/api/user/profile",
            formData,
            config
          );

          setUserData({ ...userData, pfp_link: response.data.pfp_link });

          Alert.alert("Success", "Profile picture updated successfully");
        } catch (error) {
          console.error("Error updating profile picture:", error);
        }
      }
    };
    await pickImage();
  };

  const handleNameUpdate = async () => {
    if (!editedName || editedName === userData.actualName) {
      setIsEditingName(false);
      return;
    }

    setUserData({ ...userData, actualName: editedName });
    setIsEditingName(false);

    // Update the server with the new name
    try {
      const token = await getToken();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        "https://connectify-backend-seven.vercel.app/api/user/profile",
        {
          name: editedName,
        },
        config
      );

      userData.name = editedName;
      Alert.alert("Success", "Name updated successfully");
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleBioUpdate = async () => {
    if (!editedBio || editedBio === userData.bio) {
      setIsEditingBio(false);
      return;
    }

    setUserData({ ...userData, bio: editedBio });
    setIsEditingBio(false);

    // Update the server with the new bio
    try {
      const token = await getToken();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        "https://connectify-backend-seven.vercel.app/api/user/profile",
        {
          bio: editedBio,
        },
        config
      );

      userData.bio = editedBio;
      Alert.alert("Success", "Bio updated successfully");
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  // Dismiss editing when tapping outside
  const handleOutsideTap = () => {
    if (isEditingName) {
      handleNameUpdate();
    }
    if (isEditingBio) {
      handleBioUpdate();
    }
    Keyboard.dismiss(); // Hide the keyboard
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOutsideTap}>
        <View>
          {/* Header Bar */}
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon
                name="arrow-back"
                size={24}
                onPress={() => console.log("Back pressed")}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Connectify</Text>
            <TouchableOpacity>
              <Icon
                name="settings"
                size={24}
                onPress={handleSettingsPress}
              />
            </TouchableOpacity>
          </View>

          {/* User Info Section */}
          <View style={styles.userInfoContainer}>
            <View style={styles.profileSection}>
              <TouchableOpacity onPress={handleProfilePictureChange}>
                <Image
                  source={{
                    uri: userData.pfp_link || "https://via.placeholder.com/100",
                  }}
                  style={styles.profilePicture}
                />
              </TouchableOpacity>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{connections}</Text>
                  <Text style={styles.statLabel}>Connections</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{communities}</Text>
                  <Text style={styles.statLabel}>Communities</Text>
                </View>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{userData.username}</Text>
              {isEditingName ? (
                <TextInput
                  style={styles.editableText}
                  value={editedName}
                  onChangeText={setEditedName}
                  onBlur={handleNameUpdate}
                  autoFocus
                />
              ) : (
                <Text
                  style={styles.actualName}
                  onPress={() => setIsEditingName(true)}
                >
                  {userData.name || "Edit Name"}
                </Text>
              )}
              <Text style={styles.bioLabel}>Bio</Text>
              {isEditingBio ? (
                <TextInput
                  style={styles.editableText}
                  value={editedBio}
                  onChangeText={setEditedBio}
                  onBlur={handleBioUpdate}
                  autoFocus
                />
              ) : (
                <Text style={styles.bio} onPress={() => setIsEditingBio(true)}>
                  {userData.bio}
                </Text>
              )}
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "Posts" && styles.activeTab]}
              onPress={() => setSelectedTab("Posts")}
            >
              <Text style={styles.tabText}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "Comments" && styles.activeTab]}
              onPress={() => setSelectedTab("Comments")}
            >
              <Text style={styles.tabText}>Comments</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {selectedTab === "Posts" && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderPost}
          ListEmptyComponent={
            <Text style={styles.noPostsText}>No posts available.</Text>
          }
          contentContainerStyle={{
            ...styles.contentContainer,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        />
      )}
      {selectedTab === "Comments" && (
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={renderComment}
          ListEmptyComponent={
            <Text style={styles.noCommentsText}>No comments available.</Text>
          }
          contentContainerStyle={{
            ...styles.contentContainer,
          }}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    elevation: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginRight: 16,
  },
  statsContainer: {
    marginLeft: 80,
    justifyContent: "center",
  },
  stat: {
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
  },
  userInfo: {
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editableText: {
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  actualName: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  bioLabel: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    marginBottom: 2,
  },
  bio: {
    fontSize: 14,
    color: "#777",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  noPostsText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  postCard: {
    backgroundColor: "#fff",
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
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  postContent: {
    fontSize: 16,
    color: "#555",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
  },
  commentCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    elevation: 3,
  },
  commentTime: {
    fontSize: 12,
    color: "#999",
  },
  commentText: {
    fontSize: 16,
    marginVertical: 8,
  },
  commentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noCommentsText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  contentContainer: {
    // flexGrow: 1,
  },
});
export default ProfileScreen;
