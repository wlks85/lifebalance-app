//@ts-nocheck
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface IReceipt {
  title?: string;
  amountIncludingTax?: number;
  amountPaid?: number;
  providerName: string;
  amount: number;
  price: number;
  postCode: string;
}

interface ReceiptCardProps {
  receipt: IReceipt;
}

const ReceiptCard = ({receipt}: ReceiptCardProps) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity style={styles.receipt} disabled={true}>
      <View style={styles.receiptLogo}>
        <Text style={styles.logoText}>{receipt?.logo || 'GF'}</Text>
      </View>
      <View style={styles.receiptInfo}>
        <View style={styles.receiptCompanyInfo}>
          <Text style={styles.receiptCompanyText}>
            {receipt?.providerName || receipt?.title}
          </Text>
        </View>
        <View style={styles.receiptDateInfo}>
          <Text style={styles.date}>
            {receipt?.postCode || '1234'}
            {/* ・{t('Yoga class')} */}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReceiptCard;

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
    fontWeight: '400',
    lineHeight: 16,
    color: '#454d66',
  },
});
