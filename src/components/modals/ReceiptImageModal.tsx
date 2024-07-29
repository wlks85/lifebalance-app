/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ModalComponent from '../Modal';

interface EditAmountModalProps {
  image: string;
  visible: boolean;
  onClose: () => void;
  onAction: (values: number) => void;
}

const ReceiptImageModal = ({image, visible, onClose}: EditAmountModalProps) => {
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <View style={modalStyles.headerContainer}>
          <View style={modalStyles.modalHeader}>
            <Text onPress={onClose} style={modalStyles.modalCloseButton}>
              x
            </Text>
          </View>
          <Text style={modalStyles.modalTitle}>Betrag bearbeiten</Text>
        </View>
      }
      contentStyle={{paddingHorizontal: 0}}>
      {image && (
        <View style={modalStyles.imageContainer}>
          <Image style={modalStyles.image} src={image} />
        </View>
      )}
    </ModalComponent>
  );
};

export default ReceiptImageModal;

const modalStyles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeader: {
    height: 80,
    justifyContent: 'center',
  },
  modalCloseButton: {
    fontSize: 25,
  },
  modalContent: {
    flex: 1,
    width: '100%',
    borderRadius: 0, // No border radius to make it full screen
    paddingRight: 25,
    paddingLeft: 25,
  },
  modalTitle: {
    fontSize: 24,
    color: '#454d66',
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
