import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/tokenStorage'; // Adjust the import based on your project structure

const ConnectionNotification = ({ notification, onActionComplete }) => {
    const handleAcceptPress = async () => {
        const token = await getToken();
        if (!token) {
            console.error('No token found');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        try {
            const response = await axios.post('https://connectify-backend-seven.vercel.app/api/user/connections/accept', { connectionId: notification._id }, config);
            console.log('Accept response:', response.data);
            onActionComplete(notification._id); // Call callback to update the UI
        } catch (error) {
            console.error('Error accepting connection request:', error);
        }
    };

    const handleRejectPress = async () => {
        const token = await getToken();
        if (!token) {
            console.error('No token found');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        try {
            const response = await axios.post('https://connectify-backend-seven.vercel.app/api/user/connections/reject', { connectionId: notification._id }, config);
            console.log('Reject response:', response.data);
            onActionComplete(notification._id); // Call callback to update the UI
        } catch (error) {
            console.error('Error rejecting connection request:', error);
        }
    };

    const handleCancelPress = async () => {
        const token = await getToken();
        if (!token) {
            console.error('No token found');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const response = await axios.post('https://connectify-backend-seven.vercel.app/api/user/connections/cancle', { connectionId: notification._id }, config);
            console.log('Cancel response:', response.data);
            onActionComplete(notification._id); // Call callback to update the UI
        } catch (error) {
            console.error('Error canceling connection request:', error);

        }
    };

    return (
        <View style={styles.notificationItem}>
            <Image
                style={styles.profilePic}
                source={{ uri: notification.user.pfp_link || 'https://via.placeholder.com/40' }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>
                    {notification.user.username}
                    {notification.direction === 'incoming' ? ' wants to connect with you.' : ' connection request sent.'}
                </Text>
                <Text style={styles.notificationTime}>
                    {new Date(notification.createdAt).toLocaleString()}
                </Text>
            </View>
            {notification.direction === 'incoming' ? (
                <View style={styles.actionButtons}>
                    <Pressable style={styles.acceptButton} onPress={handleAcceptPress}>
                        <Text style={styles.actionButtonText}>Accept</Text>
                    </Pressable>
                    <Pressable style={styles.rejectButton} onPress={handleRejectPress}>
                        <Text style={styles.actionButtonText}>Reject</Text>
                    </Pressable>
                </View>
            ) : (
                <Pressable style={styles.actionButton} onPress={handleCancelPress}>
                    <Text style={styles.actionButtonText}>Cancel</Text>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEFFFF',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    acceptButton: {
        backgroundColor: '#A98CE6',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    rejectButton: {
        backgroundColor: '#E63946',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    actionButton: {
        backgroundColor: '#A98CE6',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#d5d3d3',
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
    },
    notificationTime: {
        fontSize: 10,
        color: '#888888',
    },
});

export default ConnectionNotification;
