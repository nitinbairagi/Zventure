import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button, Portal, Provider} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfileModal = ({visible, onDismiss, onSave}) => {
  const [userName, setUserName] = useState('');
  const [userBio, setUserBio] = useState('');

  const handleSave = () => {
    onSave(userName, userBio);
  };

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, {width: windowWidth * 0.8}]}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TextInput
                style={styles.input}
                placeholder="User Name"
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor="#ffffff"
              />
              <TextInput
                style={[styles.bioInput, {height: windowHeight * 0.1}]}
                placeholder="User Bio"
                value={userBio}
                onChangeText={setUserBio}
                multiline
                placeholderTextColor="#ffffff"
              />
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.saveButton}>
                Save
              </Button>
              <Text style={styles.cancelButton} onPress={onDismiss}>
                Cancel
              </Text>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
  input: {
    marginBottom: 16,
    color: '#ffffff',
    backgroundColor: '#555555',
    borderRadius: 4,
    padding: 10,
  },
  bioInput: {
    marginBottom: 16,
    color: '#ffffff',
    backgroundColor: '#555555',
    borderRadius: 4,
    padding: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: '#2ecc71',
  },
  cancelButton: {
    alignSelf: 'center',
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});

export default EditProfileModal;
