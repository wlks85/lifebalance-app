/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ModalComponent from '../Modal';
import { useTranslation } from 'react-i18next';
import { launchCamera } from 'react-native-image-picker';
import { Icons } from '../icons';

interface EditAmountModalProps {
  image: string;
  visible: boolean;
  onClose: () => void;
  onAction: (values: number) => void;
  handleOpenCamera: () => void;
}

const ReceiptImageModal = ({ image, visible, buttonText = "Wiederholen", handleOpenCamera, onClose }: EditAmountModalProps) => {
  const { t } = useTranslation();

  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <View style={modalStyles.headerContainer}>
          <View style={modalStyles.modalHeader}>
            <Icons
              onPress={onClose}
              name={'close-light'}
              color={'#454d66'}
              size={25}
            />
          </View>
          <Text style={modalStyles.modalTitle}>{t('Edit amount')}</Text>
        </View>
      }
      contentStyle={{ paddingHorizontal: 0 }}>
      {image && (
        <View style={modalStyles.imageContainer}>
          <Image style={modalStyles.image} src={image} />
          <View style={{ padding: 25 }}>
            <TouchableOpacity
              onPress={handleOpenCamera}
              style={modalStyles.furtherBtn}>
              <Text style={modalStyles.btnText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
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
    fontFamily: 'OpenSans-Bold',
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 25,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  furtherBtn: {
    backgroundColor: '#454d66',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 32,
  },
  btnText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
});
