import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icons } from '../icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function ImageInfoModal({ visible, onClose }) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onClose}>
      <View style={modalStyles.overlay}>
        <SafeAreaView style={modalStyles.safeArea}>
          <View style={modalStyles.container}>
            <TouchableOpacity style={modalStyles.closeBtn} onPress={onClose}>
              <Icons name="close-light" size={25} color={'#454d66'} />
            </TouchableOpacity>
            <ScrollView style={modalStyles.textContainer}>
              <Text style={modalStyles.heading}>Halten Sie die Kamera ruhig</Text>
              <Text style={modalStyles.text}>
                Um die besten Ergebnisse beim Fotografieren Ihrer Dokumente zu erzielen, sorgen Sie für ausreichend Licht – Tageslicht oder eine gleichmäßige Beleuchtung sind ideal. Halten Sie die Kamera parallel zum Dokument, sodass es vollständig im Bild ist. Stellen Sie sicher, dass der Fokus auf dem Text liegt. Verzichten Sie bitte auf Zoom und achten Sie außerdem darauf, dass alle Ecken des Dokuments sichtbar sind und nichts abgeschnitten wird.
              </Text>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)', // 65% black background
    justifyContent: 'center',
    alignItems: 'center',
  },

  safeArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    display: 'flex',
    gap: 100,
    backgroundColor: '#f5f0ee',
    height: '70%',
    width: '80%',
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    display: 'flex',
    gap: 20,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
  },
  heading: {
    marginTop: 20,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#1e4251',
  },
  text: {
    marginVertical: 16,
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
