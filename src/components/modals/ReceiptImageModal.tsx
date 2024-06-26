//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Pressable, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import ModalComponent from '../Modal';
// import CameraModule from '../modules/camera';

interface EditAmountModalProps {
    image: string;
    visible: boolean;
    onClose: ()=>void;
    onAction: (values: number)=>void;
}


const ReceiptImageModal = ({ image, visible, onClose,onAction }: EditAmountModalProps) => {
//   console.log("This is receipt from overview ==> ", receipt);
  
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={<View style={modalStyles.headerContainer}>
        <View style={modalStyles.modalHeader}><Text onPress={onClose} style={modalStyles.modalCloseButton}>x</Text></View>
        <Text style={modalStyles.modalTitle}>Betrag bearbeiten</Text>
    </View>}
    >
      {image && (
       <View style={{flex: 1, backgroundColor: 'red', width: '100%', paddingHorizontal: '-25'}}>
       <Image style={{flex: 1, width: '100%',height: '100%',}} src={image}/>
     </View>
    )}
    </ModalComponent>
  )
};

export default ReceiptImageModal;

const modalStyles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    textAlign: 'center'
  },
})