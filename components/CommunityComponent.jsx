import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CommunityComponent = ({ community }) => {
    const handleJoinPress = () => {
        // Handle join button press
        console.log('Join button pressed');
    };

    let data = community && community.community ? community.community : null;

    if (!data) {
        data = community
    }
    return (
        <View style={styles.communityContainer}>
            <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{data.community_name}</Text>
                <Text style={styles.memberCount}>{data.description}</Text>
                <Text style={styles.memberCount}>{data.member_count} {data.member_count > 1 ? 'members' : 'member'}</Text>
            </View>
            <Pressable style={styles.joinButton} onPress={handleJoinPress}>
                <Text style={styles.joinText}>Join</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    communityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    communityInfo: {
        flexDirection: 'column',
    },
    communityName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    memberCount: {
        fontSize: 12,
        color: '#6c757d',
    },
    joinButton: {
        backgroundColor: '#A98CE6',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    joinText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default CommunityComponent;