//@ts-nocheck
import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';

const ModalComponent = ({visible, onClose, children, headerComponent, contentStyle})=> (
    <Modal
      animationType='slide'
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalHeaderContainer}>
        { headerComponent }
        </View>
        <View style={[modalStyles.modalContent, contentStyle]}>
          {children}
        </View>
      </View>
    </Modal>
);

export default ModalComponent;

  const modalStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: '#f8f6f4',
    },
    modalHeaderContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 25,
      paddingLeft: 25,
      paddingTop: 15,
      paddingBottom: 17,
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
      height: '100%',
      borderRadius: 0,
      paddingHorizontal: 25
    },
    modalTitle: {
      fontSize: 24,
      color: '#454d66',
      fontWeight: '700'
    },
  })