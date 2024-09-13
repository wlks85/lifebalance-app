//@ts-nocheck
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ModalComponent from '../Modal';
import AddReceiptForm from '../forms/AddReceipt';
import {IReceipt} from '../modules/receipt/ReceiptItem';
import {ModalStyles} from '../../styles';
import {useTranslation} from 'react-i18next';
import {Icons} from '../icons';

interface AddReceiptModalProps {
  visible: boolean;
  onClose: () => void;
  onAction: (values: Partial<IReceipt>) => void;
  defaultValue?: IReceipt;
}

const AddReceiptModal = ({
  visible,
  onClose,
  onAction,
  defaultValue,
}: AddReceiptModalProps) => {
  const {t} = useTranslation();
  return (
    <ModalComponent
      // transparent={true}
      onClose={onClose}
      visible={visible}
      headerComponent={
        <>
          <Icons
            onPress={onClose}
            style={modalStyles.headerButtons}
            name={defaultValue ? 'arrow-left-light' : 'close-light'}
            color={'#454d66'}
            size={25}
          />
          <Text style={modalStyles.modalTitle}>
            {defaultValue ? t('Amount paid') : t('New service')}
          </Text>
        </>
      }>
      <View style={modalStyles.container}>
        <AddReceiptForm
          onClose={onClose}
          defaultValue={defaultValue}
          onSubmit={values => onAction(values)}
        />
      </View>
    </ModalComponent>
  );
};

export default AddReceiptModal;

const modalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
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
    fontFamily: 'OpenSans-Bold',
  },
  amount: {
    color: '#454d66',
    fontSize: 48,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
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
    fontFamily: 'OpenSans-Regular',
  },
  amountInfoText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
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
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  ...ModalStyles,
});
