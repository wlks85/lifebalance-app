import React, {ReactElement, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddReceiptModal from '../../modals/AddReciptModal';
import { useAxios } from '../../../providers/axios-provider';

export interface IReceipt {
  title: string;
  amountIncludingTax: number;
  amountPaid: number;
}

interface ReceiptItemProps {
  receipt: IReceipt;
  onItemClicked: (item: IReceipt)=>void;
  disabled?: boolean;
  showEditBtn?: boolean;
  onEditBtnPress?: ()=>void;
}


const ReceiptItem = ({ receipt,onItemClicked, disabled, showEditBtn, onEditBtnPress }: ReceiptItemProps) => {
  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const onEditBtnPressHandler = ()=>{
    onEditBtnPress?.();
  }

    return (
      <TouchableOpacity style={styles.receipt} onPress={()=> onItemClicked(receipt)} disabled={disabled}>
        <View style={styles.receiptLogo}><Text style={styles.logoText}>{receipt?.company?.logo || "GF"}</Text></View>
        <View style={styles.receiptInfo}>
          <View style={styles.receiptCompanyInfo}>
            <Text style={styles.receiptCompanyText}>{receipt?.title || "title"}</Text>
          </View>
          <View style={styles.receiptDateInfo}>
            <Text style={styles.date}>12345・Yoga-Kurs</Text>
          </View>
        </View>
        {
          showEditBtn &&
          <TouchableOpacity onPress={onEditBtnPressHandler}>
              <Text>
                <Icon name="pencil" size={25} color="#454d66" />
              </Text>
          </TouchableOpacity>
        }
        <AddReceiptModal 
        visible={showAddReceiptModal}
        onClose={()=>setShowAddReceiptModal(false)} 
        defaultValue={receipt} 
        onAction={()=>{}}
        />
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
      paddingHorizontal: 16,
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