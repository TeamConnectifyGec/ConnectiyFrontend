import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import PostComponent from '../../components/PostComponent';
import UserComponent from '../../components/UserLableComponent';
import CommunityComponent from '../../components/CommunityComponent';
import { getToken } from '../../utils/tokenStorage';

const Feed = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      const token = await getToken();
      if (!token) {
        console.error('No token found');
        setIsLoading(false); // Set loading to false if token is not found
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const url = isSearching
        ? `https://connectify-backend-seven.vercel.app/api/search/${activeTab}`
        : 'https://connectify-backend-seven.vercel.app/api/search/feed';

      const requestBody = isSearching ? { searchTerm: searchText } : {};

      try {
        const response = isSearching
          ? await axios.post(url, requestBody, config)
          : await axios.get(url, config);

        setData([]);
        if (response.data) {
          setData(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setData([]);
        }
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        //console.error(`Error fetching ${!isSearching ? 'feed' : activeTab} data:`, error);
        setData([]);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [isSearching, activeTab, searchText]);

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleBackPress = () => {
    setIsSearching(false);
    setSearchText('');
    setActiveTab('posts');
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const renderItem = ({ item }) => {
    if (activeTab === 'posts') {
      return <PostComponent post={item} />;
    } else if (activeTab === 'users') {
      return <UserComponent user={item} />;
    } else if (activeTab === 'communities') {
      return <CommunityComponent community={item} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isSearching ? (
          <Pressable onPress={handleBackPress} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={24} />
          </Pressable>
        ) : (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Connectify</Text>
            <View style={styles.icon1}>
              <Pressable>
                <FontAwesome5 name="bars" size={24} />
              </Pressable>
            </View>
          </View>
        )}
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#000000"
          onFocus={handleSearchFocus}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      {isSearching && (
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => handleTabPress('posts')}
          >
            <Text style={styles.tabText}>Posts</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'users' && styles.activeTab]}
            onPress={() => handleTabPress('users')}
          >
            <Text style={styles.tabText}>Users</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'communities' && styles.activeTab]}
            onPress={() => handleTabPress('communities')}
          >
            <Text style={styles.tabText}>Communities</Text>
          </Pressable>
        </View>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show a loading indicator while data is being fetched
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={<Text style={styles.noDataText}>No results found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // fontFamily: 'Roboto',
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 0,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  icon1: {
    marginLeft: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  backButton: {
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  flatListContent: {
    paddingVertical: 10,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888888',
  },
});

export default Feed;