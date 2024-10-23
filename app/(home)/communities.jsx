import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import UserComponent from '../../components/UserLableComponent';
import { getToken } from '../../utils/tokenStorage';

const ConnectionsPage = () => {
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
      try {
        const token = await getToken();
        
        if (!token) {
          throw new Error("Token not found");
        }
    
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
    
        const response = await axios.get('https://connectify-backend-cseven.vercel.app/api/user/connections/all', config);
    
        if (!response) {
          console.log("No response received from server");
          return;
        }
    
        setConnections(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching connections:", error.message || error);
      }
    };
    
    const renderItem = ({ item }) => (
        <UserComponent user={item} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Connections</Text>
            <FlatList
                data={connections}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={<Text style={styles.noDataText}>No connections found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888888',
    },
});

export default ConnectionsPage;
