import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    FlatList,
    Image
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Feed = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [activeTab, setActiveTab] = useState('posts');
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');


    // Function to handle search focus
    const handleSearchFocus = () => {
        setIsSearching(true);
    };

    // Function to handle back navigation
    const handleBackPress = () => {
        setIsSearching(false);
        setData([]); // Clear the search results
    };

    // Function to handle tab selection
    const handleTabPress = (tab) => {
        setActiveTab(tab);
        fetchTabData(tab);
    };

    // Function to fetch data based on active tab
    const fetchTabData = (tab) => {
        // Replace with your server URL and fetch logic
        const url = `https://your-server-url.com/api/${tab}`;

        fetch(url)
            .then((response) => response.json())
            .then((result) => setData(result))
            .catch((error) => console.error('Error fetching data:', error));
    };

    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            {/* Customize based on your data structure */}
            <Text style={styles.itemTitle}>{item.title || item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {isSearching ? (
                    // Back button when searching
                    <Pressable onPress={handleBackPress} style={styles.backButton}>
                        <FontAwesome5 name="arrow-left" size={24} />
                    </Pressable>
                ) : (
                    // Normal header view
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
                />
            </View>

            {isSearching && (
                // Tabs for the search view
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

            <FlatList
                data={data}
                keyExtractor={(item, _id) => _id}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={<Text style={styles.noDataText}>No results found.</Text>}
                onChangeText={text => setSearchText(text)} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Roboto',
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
    itemContainer: {
        padding: 15,
        backgroundColor: '#ffffff',
        marginVertical: 5,
        borderRadius: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888888',
    },
});

export default Feed;
