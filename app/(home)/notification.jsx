import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ConnectionNotification from '../../components/ConnectionRequestComponent';
import { getToken } from '../../utils/tokenStorage';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = await getToken();
                if (!token) {
                    console.error('No token found');
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };

                const response = await axios.post('https://connectify-backend-seven.vercel.app/api/notification/connection-request', {} ,config);
                setNotifications(response.data.pendingRequests);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleActionComplete = (notificationId) => {
        setNotifications(notifications.filter(notification => notification._id !== notificationId));
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#A98CE6" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                {notifications.length === 0 ? (
                    <Text style={styles.noDataText}>No notifications found.</Text>
                ) : (
                    notifications.map((notification, index) => (
                        <ConnectionNotification
                            key={index}
                            notification={notification}
                            onActionComplete={handleActionComplete}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        width: '100%',
        height: 50,
        top: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    headerText: {
        fontSize: 26,
        lineHeight: 32,
        color: '#444444',
    },
    scrollView: {
        marginTop: 80, // Adjust for header
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888888',
    },
});

export default Notifications;
