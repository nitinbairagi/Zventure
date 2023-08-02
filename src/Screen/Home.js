import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button, Avatar, Title, Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetPostListQuery, useGetfriendsListQuery} from '../api/Redux/api';
import Loader from '../component/Loader';
import EditProfileModal from '../component/EditProfileModal ';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedUserName, setEditedUserName] = useState('Alice Johnson');
  const [editedUserBio, setEditedUserBio] = useState(
    ' Travel enthusiast | Food lover | Nature admirer 🌿',
  );

  const {data: postData, isLoading: isLoadingPosts} = useGetPostListQuery();
  const {data: friends, isLoading: isLoadingFriends} = useGetfriendsListQuery();

  const handleEditProfile = () => {
    setEditedUserName('New User Name');
    setEditedUserBio('New User Bio');
    setEditModalVisible(true);
  };

  const handleSaveProfile = (userName, userBio) => {
    setEditedUserName(userName);
    setEditedUserBio(userBio);
    console.log('Updated User Name:', userName);
    console.log('Updated User Bio:', userBio);
    setEditModalVisible(false);
  };
  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };
  const renderFriendItem = ({item}) => (
    <View key={item.id} style={styles.friendContainer}>
      <Avatar.Image
        size={windowWidth * 0.2}
        source={require('../assets/images/profile-picture.jpg')}
        style={styles.friendAvatar}
      />
      <Subheading style={styles.friendUsername}>{item.username}</Subheading>
    </View>
  );

  const renderPostItem = ({item}) => (
    <View key={item.id} style={styles.postCard}>
      <Image
        source={require('../assets/images/profile-picture.jpg')}
        style={styles.postImage}
      />
      <Text style={styles.text}>{item.title}</Text>
      <View style={styles.postFooter}>
        <Icon
          name="heart-outline"
          size={24}
          color="#ffffff"
          style={styles.postIcon}
        />
        <Icon
          name="comment-outline"
          size={24}
          color="#ffffff"
          style={styles.postIcon}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.username}>{editedUserName}</Title>
      </View>

      <View style={styles.userInfo}>
        <Avatar.Image
          size={windowWidth * 0.25}
          source={require('../assets/images/profile-picture.jpg')}
          style={styles.userAvatar}
        />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2000</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1500</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Subheading style={styles.bioText}>{editedUserBio}</Subheading>
      </View>

      <Button
        mode="contained"
        onPress={handleEditProfile}
        style={styles.editProfileButton}>
        Edit Profile
      </Button>

      <Title style={styles.sectionTitle}>Friends</Title>
      {isLoadingFriends ? (
        <Loader />
      ) : (
        <FlatList
          data={friends}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderFriendItem}
          contentContainerStyle={styles.friendsList}
        />
      )}

      <Title style={styles.sectionTitle}>Posts</Title>
      {isLoadingPosts ? (
        <Loader />
      ) : (
        <FlatList
          data={postData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPostItem}
          contentContainerStyle={styles.postsList}
        />
      )}

      <EditProfileModal
        visible={editModalVisible}
        onDismiss={handleCancelEdit}
        onSave={handleSaveProfile}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  text: {
    backgroundColor: '#ffffff',
    color: '#000',
    textAlign: 'center',
  },
  userAvatar: {
    marginRight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff',
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  bioText: {
    fontSize: 16,
    color: '#ffffff',
  },
  editProfileButton: {
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 2,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  friendsList: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  friendContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  friendAvatar: {
    backgroundColor: '#3498db',
  },
  friendUsername: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff',
  },
  postCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    elevation: 3,
    backgroundColor: '#ccc',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  postIcon: {
    marginHorizontal: 5,
  },
  postsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default Home;
