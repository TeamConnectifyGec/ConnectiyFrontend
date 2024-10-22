import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const UserComponent = ({ user }) => {
    const handleFollowPress = () => {
        // Handle follow button press
        console.log('Follow button pressed');
    };

    return (
        <View style={styles.userContainer}>
            <Image
                style={styles.profilePic}
                source={{ uri: user.pfp_link || 'https://via.placeholder.com/40' }}
            />
            <Text style={styles.username}>{user.username || 'Unknown User'}</Text>
            <Pressable style={styles.followButton} onPress={handleFollowPress}>
                <Text style={styles.followText}>Follow</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#d5d3d3',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        marginLeft:8,
    },
    followButton: {
        backgroundColor: '#A98CE6',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    followText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default UserComponent;
