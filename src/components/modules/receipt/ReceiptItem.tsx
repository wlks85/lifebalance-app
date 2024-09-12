/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AddReceiptModal from '../../modals/AddReciptModal';
import receiptService from '../../../services/ReceiptService';
import {formatAmount} from '../../../utils';
import {useTranslation} from 'react-i18next';
import {Icons} from '../../icons';

export interface IReceipt {
  title?: string;
  amountIncludingTax?: number;
  amountPaid?: number;
  providerName: string;
  amount: number;
  price: number;
  postCode: string;
  logo: string;
}

const ReceiptStatus = ({status, amount}) => {
  const {t} = useTranslation();
  if (status === '0') {
    return (
      <Text style={{color: 'green'}}>
        {amount} {t('reimbursed')}
      </Text>
    );
  }
  if (status === '1') {
    return <Text style={{color: 'red'}}>{t('Rejected')}</Text>;
  }
  return <Text>{t('Is checked')} …</Text>;
};

interface ReceiptItemProps {
  receipt: IReceipt;
  onItemClicked?: (item: IReceipt) => void;
  disabled?: boolean;
  showEditBtn?: boolean;
  onEditBtnPress?: () => void;
  showAmount?: boolean;
}

const ReceiptItem = ({
  receipt,
  onItemClicked,
  disabled = false,
  showEditBtn,
  onEditBtnPress,
  showAmount,
}: ReceiptItemProps) => {
  const {t} = useTranslation();
  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState(receipt);
  const onEditBtnPressHandler = () => {
    onEditBtnPress?.();
  };

  useEffect(() => {
    setReceiptDetails(receipt);
  }, [receipt]);

  useEffect(() => {
    if (!disabled && !receipt?.providerName) {
      try {
        receiptService.getReceiptDetails(receipt?.nid).then(data => {
          setReceiptDetails(data);
        });
      } catch (err) {}
    }
  }, [disabled, receipt]);

  return (
    <TouchableOpacity
      style={styles.receipt}
      onPress={() => {
        onItemClicked(receiptDetails);
      }}
      // disabled={disabled}
    >
      <View style={styles.receiptLogo}>
        <Text style={styles.logoText}>{receiptDetails?.logo || 'GF'}</Text>
      </View>
      <View style={styles.receiptInfo}>
        <View style={styles.receiptCompanyInfo}>
          <Text style={styles.receiptCompanyText}>
            {receiptDetails?.providerName}
          </Text>
          {showAmount && receiptDetails?.amount !== 'NaN' && (
            <Text style={[styles.receiptCompanyText, {fontWeight: 'bold'}]}>
              {formatAmount(
                receiptDetails?.amount === undefined
                  ? 0
                  : receiptDetails?.amount / 100,
              )}{' '}
            </Text>
          )}
        </View>
        <View style={styles.receiptDateInfo}>
          {!showAmount ? (
            <Text style={styles.date}>
              {receiptDetails?.postCode || '1234'}・{t('Yoga-Kurs')}
            </Text>
          ) : (
            <Text style={styles.date}>
              {receiptDetails?.postCode || '1234'}・
              {ReceiptStatus({
                status: receiptDetails?.status,
                amount: formatAmount(
                  receiptDetails?.amount === undefined
                    ? 0
                    : receiptDetails?.amount / 100,
                ),
              })}
            </Text>
          )}
        </View>
      </View>
      {showEditBtn && (
        <TouchableOpacity onPress={onEditBtnPressHandler}>
          <Icons name="pen-light" size={25} color="#454d66" />
        </TouchableOpacity>
      )}
      <AddReceiptModal
        visible={showAddReceiptModal}
        onClose={() => setShowAddReceiptModal(false)}
        defaultValue={receiptDetails}
        onAction={() => {}}
      />
    </TouchableOpacity>
  );
};

export default ReceiptItem;

const styles = StyleSheet.create({
  receipt: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 25,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    minHeight: 80,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  receiptInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  receiptLogo: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: '#454d66',
    color: '#fffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  receiptCompanyText: {
    color: '#454d66',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular',
  },
  receiptCompanyInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  receiptAmountText: {
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 24,
    color: '#454d66',
  },
  receiptDateInfo: {
    paddingTop: 0,
    paddingRight: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  date: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    lineHeight: 16,
    color: '#454d66',
  },
});
