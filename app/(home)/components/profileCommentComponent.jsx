// File: Comment.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';

const Comment = ({ item }) => (
  <View style={styles.commentCard}>
    <Text style={styles.commentTime}>{moment(item.createdAt).fromNow()}</Text>
    <Text style={styles.commentText}>{item.comment_text}</Text>
    <View style={styles.commentActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => console.log('pressed like')}
      >
        {/* Add any like icon or text if needed */}
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
    commentCard: {
        backgroundColor: '#fff',
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
        color: '#999',
      },
      commentText: {
        fontSize: 16,
        marginVertical: 8,
      },
      commentActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
});

export default Comment;
