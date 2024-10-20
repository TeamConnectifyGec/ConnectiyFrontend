import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const communities = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TextInput
          placeholder="Football"
          placeholderTextColor="#767E84"
          style={styles.searchInput}
        />
        <View style={styles.searchTypeBar}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Communities</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Community Blocks */}
      <View style={styles.communityBlock}>
        <View style={styles.commentFrame}>
          <Text style={styles.communityTitle}>Football</Text>
          <Text style={styles.membersText}>Members 100K</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.communityBlock}>
        <View style={styles.commentFrame}>
          <Text style={styles.communityTitle}>FIFA</Text>
          <Text style={styles.membersText}>Members 500K</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.communityBlock}>
        <View style={styles.commentFrame}>
          <Text style={styles.communityTitle}>Indian Football</Text>
          <Text style={styles.membersText}>Members 200K</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: height * 0.12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  searchInput: {
    backgroundColor: 'rgba(234, 236, 236, 0.7)',
    height: 35,
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#767E84',
  },
  searchTypeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  tab: {
    width: '33%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#A98CE6',
  },
  activeTabText: {
    color: '#A98CE6',
  },
  communityBlock: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  commentFrame: {
    backgroundColor: '#FEFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  communityTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  membersText: {
    fontSize: 12,
    color: '#000000',
    marginVertical: 5,
  },
  joinButton: {
    position: 'absolute',
    right: 20,
    top: 15,
    backgroundColor: '#A98CE6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 9,
  },
  joinText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default communities