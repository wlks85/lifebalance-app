
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import ModalComponent from '../Modal';
import { TextInput } from 'react-native-gesture-handler';
import { IReceipt } from '../modules/receipt/ReceiptCard';
import { useAuth } from '../../providers/auth-provider';

interface EditAmountModalProps {
    receipt: Partial<IReceipt>;
    visible: boolean;
    onClose: ()=>void;
    onAction: (values: number)=>void;
}


const EditAmountModal = ({ receipt, visible, onClose,onAction }: EditAmountModalProps) => {
  const [amount, setAmount] = useState('0,00 €');
  const {userDetails} = useAuth();

  const handleEditAmount = ()=>{
    onAction?.(Number(amount));
    onClose?.();
  }

  useEffect(()=>{
    setAmount(String(receipt?.amount));
  }, [receipt])
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={<View style={modalStyles.headerContainer}>
        <View style={modalStyles.modalHeader}><Text onPress={onClose} style={modalStyles.modalCloseButton}>x</Text></View>
        <Text style={modalStyles.modalTitle}>Betrag bearbeiten</Text>
    </View>}
    >
      {receipt && (
      <View style={modalStyles.container}>
        <View style={modalStyles.receiptDetails}>
          {/* <ReceiptItem receipt={receipt} disabled={true} /> */}
          <View>
            <Text style={modalStyles.title}>Betrag des Belegs (inkl. MwSt.)</Text>
          </View>
          <View>
          <TextInput 
            style={modalStyles.amount} 
            placeholder='0,00 €'
            placeholderTextColor={"#454d66"}
            value={amount ?? '0,00 €'}
            onChangeText={(value)=>setAmount(value)}
            keyboardType='numeric'
            />
          </View>
          <View style={modalStyles.amountsSection}>
            <View style={modalStyles.amountInfo}>
              <Text style={modalStyles.amountInfoText}>Erstatteter Betrag:</Text>
              <Text style={modalStyles.refundAmount}>{amount} €</Text>
            </View>
            <View style={modalStyles.amountInfo}>
              <Text style={modalStyles.amountInfoText}>Aktueller Kontostand:</Text>
              <Text style={modalStyles.currentBalance}>{userDetails?.field_balance_current?.und[0]?.value} €</Text>
            </View>
          </View>
        </View>
        <View style={modalStyles.btnContainer}>
        <TouchableOpacity onPress={handleEditAmount} style={modalStyles.furtherBtn}>
          <Text style={modalStyles.btnText}>Übernehmen</Text>
        </TouchableOpacity>
        </View>
      </View>
    )}
    </ModalComponent>
  )
};

export default EditAmountModal;

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
    fontWeight: '700',
    flex: 1,
    textAlign: 'center'
  },

  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    gap: 50
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#454d66',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif'
  },
  amount: {
    width: '100%',
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
  },
  photoBtnContainer:{
    backgroundColor: '#f8f6f4',
    height: 270,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 35,
    position: 'absolute',
    bottom: 0,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    gap: 16
  },
  takeOrUploadPhotoBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 26,
    paddingVertical: 32,
  },
  photoBtnTitle: {
    textAlign: 'center',
    color: '#454d66',
    fontSize: 16,
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontWeight: '700'
  }
})