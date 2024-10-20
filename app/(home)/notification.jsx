import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Example notification data
    const exampleNotifications = [
        {
            title: 'New Friend Request',
            message: 'John Doe sent you a friend request.',
            time: '2 minutes ago',
        }
    ];

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Simulate a delay to mimic an API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setNotifications(exampleNotifications); // Use example data
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

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
                {notifications.map((notification, index) => (
                    <View key={index} style={styles.notificationCard}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        <Text style={styles.notificationMessage}>{notification.message}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                ))}
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
        fontFamily: 'Keania One',
        fontSize: 26,
        lineHeight: 32,
        color: '#444444',
    },
    scrollView: {
        marginTop: 80, // Adjust for header
    },
    notificationCard: {
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
        margin:10
    },
    notificationTitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    notificationMessage: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#333333',
        marginVertical: 5,
    },
    notificationTime: {
        fontFamily: 'Roboto',
        fontSize: 10,
        color: '#888888',
    },
});

export default notifications;
