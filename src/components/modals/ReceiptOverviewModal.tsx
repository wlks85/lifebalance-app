//@ts-nocheck
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import ModalComponent from '../Modal';
import ReceiptOverview from '../modules/receipt/ReceiptOverview';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {ModalStyles} from '../../styles';

const ReceiptOverviewModal = ({receipt, visible, onClose}) => {
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <>
          <IconAnt
            onPress={onClose}
            style={modalStyles.headerButtons}
            name={'arrowleft'}
            color={'#454d66'}
            size={25}
          />
          <Text style={modalStyles.modalTitle}>Übersicht</Text>
        </>
      }>
      <ReceiptOverview receipt={receipt} onClose={onClose} />
    </ModalComponent>
  );
};

export default ReceiptOverviewModal;

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
  },

  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#454d66',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
  },
  amount: {
    color: '#454d66',
    fontSize: 48,
    fontWeight: '700',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
  },
  amountsSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  amountInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
  },
  amountInfoText: {
    fontSize: 16,
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
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
    paddingBottom: 25,
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
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontSize: 18,
    fontWeight: '700',
  },
  photoBtnContainer: {
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
    gap: 16,
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
    fontWeight: '700',
  },
  ...ModalStyles,
});
