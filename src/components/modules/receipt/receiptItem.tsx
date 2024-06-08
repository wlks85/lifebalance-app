import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const ReceiptItem = ({ receipt,onItemClicked, disabled }) => {
    return (
      <TouchableOpacity style={styles.receipt} onPress={()=> onItemClicked(receipt)} disabled={disabled}>
        <View style={styles.receiptLogo}><Text style={styles.logoText}>GF</Text></View>
        <View style={styles.receiptInfo}>
          <View style={styles.receiptCompanyInfo}>
            <Text style={styles.receiptCompanyText}>{receipt.company.name}</Text>
          </View>
          <View style={styles.receiptDateInfo}>
            <Text style={styles.date}>12345・Yoga-Kurs</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
}

export default ReceiptItem;

const styles = StyleSheet.create({
    receipt: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      paddingVertical: 25,
      borderBottomColor: "#f0f0f0",
      borderBottomWidth: 1,
      minHeight: 80,
      paddingLeft: 16,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8
    },
    receiptInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
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
      fontFamily: '"OpenSans-Regular", "Open Sans"',
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
      fontFamily: '"OpenSans-Regular", "sans-serif"',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 16,
      color: '#454d66'
    },
  });