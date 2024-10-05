import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ModalComponent from '../Modal';
import {TextInput} from 'react-native-gesture-handler';
import {IReceipt} from '../modules/receipt/ReceiptCard';
import {useAuth} from '../../providers/auth-provider';
import {ModalStyles} from '../../styles';
import {useTranslation} from 'react-i18next';
import {Icons} from '../icons';

interface EditAmountModalProps {
  receipt: Partial<IReceipt>;
  visible: boolean;
  onClose: () => void;
  onAction: (values: string) => void;
}

const EditAmountModal = ({
  receipt,
  visible,
  onClose,
  onAction,
}: EditAmountModalProps) => {
  const [amount, setAmount] = useState('0,00 €');
  const [error, setError] = useState('');
  const {userDetails} = useAuth();
  const {t} = useTranslation();

  const isValid = (value: string) => {
    const germanNumberPattern =
      /^(\d{1,3}(\.\d{3})*,\d{0,2}|\d{1,3}(\.\d{3})*|\d*)$/;

    // Validate and set value if it matches German numeric format
    if (germanNumberPattern.test(value)) {
      setError('');
      return true;
    } else {
      setError(t('Invalid Number'));
      return false;
    }
  };

  const handleEditAmount = () => {
    if (isValid(amount)) {
      onAction?.(amount);
      onClose?.();
    }
  };

  useEffect(() => {
    setAmount(String(receipt?.amount));
  }, [receipt]);
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <>
          <Icons
            onPress={onClose}
            name={'arrow-left-light'}
            color={'#454d66'}
            size={25}
          />
          <Text style={modalStyles.modalTitle}>{t('Edit amount')}</Text>
        </>
      }>
      {receipt && (
        <View style={modalStyles.container}>
          <View style={modalStyles.receiptDetails}>
            {/* <ReceiptItem receipt={receipt} disabled={true} /> */}
            <View>
              <Text style={modalStyles.title}>
                {t('Amount of the receipt')} ({t('VAT included')}.)
              </Text>
            </View>
            <View>
              <TextInput
                style={modalStyles.amount}
                placeholder="0,00 €"
                placeholderTextColor={'#454d66'}
                value={amount ?? '0,00 €'}
                onChangeText={value => {
                  setAmount(value);
                  isValid(value);
                }}
              />
              {error && <Text style={modalStyles.amountError}>{error}</Text>}
            </View>
            <View style={modalStyles.amountsSection}>
              <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  {t('Refunded amount')}:
                </Text>
                <Text style={modalStyles.refundAmount}>{amount} €</Text>
              </View>
              <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  {t('Current account balance')}:
                </Text>
                <Text style={modalStyles.currentBalance}>
                  {userDetails?.field_balance_current?.und[0]?.value} €
                </Text>
              </View>
            </View>
          </View>
          <View style={modalStyles.btnContainer}>
            <TouchableOpacity
              onPress={handleEditAmount}
              style={modalStyles.furtherBtn}>
              <Text style={modalStyles.btnText}>{t('Take over')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ModalComponent>
  );
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

  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 50,
  },
  title: {
    fontSize: 18,
    color: '#454d66',
    fontFamily: 'OpenSans-Bold',
  },
  amount: {
    width: '100%',
    color: '#454d66',
    fontSize: 48,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
  },
  amountError: {
    color: 'red',
    fontFamily: 'OpenSans-Regular',
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
    fontFamily: 'OpenSans-Bold',
    color: 'green',
  },
  currentBalance: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
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
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  ...ModalStyles,
});
