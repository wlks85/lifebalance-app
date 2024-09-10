//@ts-nocheck
import React from 'react';
import {View, Modal, StyleSheet, SafeAreaView} from 'react-native';

const ModalComponent = ({
  visible,
  onClose,
  children,
  headerComponent,
  contentStyle = {},
  transparent = false,
}) => {
  const handleOnClose = () => {
    onClose();
  };
  return (
    <Modal
      transparent={transparent}
      animationType="slide"
      visible={visible}
      onDismiss={handleOnClose}
      onRequestClose={handleOnClose}>
      <SafeAreaView style={{flex: 1}}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalHeaderContainer}>
            {headerComponent}
          </View>
          <View style={[modalStyles.modalContent, contentStyle]}>
            {children}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalComponent;

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f6f4',
    paddingHorizontal: 25,
  },
  modalHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    fontFamily: 'OpenSans-Bold',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  modalTitle: {
    fontSize: 24,
    color: '#454d66',
    fontWeight: '700',
  },
});
