//@ts-nocheck
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Pressable, TouchableOpacity } from 'react-native';
import ModalComponent from '../modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddReceiptForm from '../forms/addReceipt';
import { ScrollView } from 'react-native-gesture-handler';

const AddReceiptModal = ({ visible, onClose, onAction }) => (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={<View style={modalStyles.headerContainer}>
        <View style={modalStyles.modalHeader}><Text onPress={onClose} style={modalStyles.modalCloseButton}>x</Text></View>
        <Text style={modalStyles.modalTitle}>Gezahlter Betrag</Text>
        <View style={modalStyles.modalHeader}>
            <Text><Icon name='question' size={20}/></Text>
        </View>
    </View>}
    >
       <View style={modalStyles.container}>
           <AddReceiptForm />
       </View>
    </ModalComponent>
  );

export default AddReceiptModal;

const modalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
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
    fontWeight: '700'
  },

  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#454d66',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif'
  },
  amount: {
    color: '#454d66',
    fontSize: 48,
    fontWeight: '700',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif'    
  },
  amountsSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 5
  },
  amountInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif'
  },
  amountInfoText: {
    fontSize: 16,
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif'
  },
  refundAmount: {
    fontSize: 18,
    fontFamily: '"OpenSans-Bold", "Open Sans", sans-serif',
    fontWeight: '700',
    color: 'green',
  },
  currentBalance: {
    fontSize: 18,
    fontFamily: '"OpenSans-Bold", "Open Sans", sans-serif',
    fontWeight: '700',
  },
  btnContainer: {
    paddingBottom: 25
  },
  furtherBtn: {
    backgroundColor: '#454d66',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 32
  },
  btnText: {
    color: 'white',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontSize: 18,
    fontWeight: '700'
  }
})