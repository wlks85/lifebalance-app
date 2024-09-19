import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icons} from '../icons';

export default function ImageInfoModal({visible, onClose}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onClose}>
      <SafeAreaView>
        <View style={modalStyles.container}>
          <TouchableOpacity style={modalStyles.closeBtn} onPress={onClose}>
            <Icons name="close-light" size={25} color={'#454d66'} />
          </TouchableOpacity>
          <View style={modalStyles.textContainer}>
            <Text style={modalStyles.heading}>Halten Sie die Kamera ruhig</Text>
            <Text style={modalStyles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quas magni dicta similique, alias Lorem ipsum dolor sit amet
              consectetur adi
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 200,
    backgroundColor: '#f5f0ee',
    height: '80%',
    width: '80%',
    top: '20%',
    left: '10%',
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#ffffff',
    display: 'flex',
    gap: 20,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#1e4251',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'left',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: 10,
  },
});
