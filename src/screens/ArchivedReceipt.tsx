// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../context';
import receiptService from '../services/ReceiptService';

const ArchivedReceiptsScreen = () => {
  const navigation = useNavigation();
  const {user} = useAppContext();
  const [receipts, setReceipts] = useState([]); // Fetch archived receipts data
  function groupByMonth(data) {
    // Helper function to get month name from timestamp
    function getMonthName(timestamp) {
        const date = new Date(parseInt(timestamp) * 1000);
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];
        return monthNames[date.getMonth()];
    }

    const grouped = {};

    objects.forEach(obj => {
        const monthName = getMonthName(obj.created);
        if (!grouped[monthName]) {
            grouped[monthName] = [];
        }
        grouped[monthName].push(obj);
    });

    return Object.keys(grouped).map(monthName => ({
        title: monthName,
        items: grouped[monthName]
    }));
}
  useEffect(()=>{
    receiptService.getArchivedReceipts().then(data=>{
      setReceipts(data?.data);
    })
  }, [])
  return (
    <>
      {user && (
        <View>
          <FlatList
            data={[]}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ReceiptDetail', {receipt: item})
                }>
                <Text>{item.serviceName}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      )}
    </>
  );
};

export default ArchivedReceiptsScreen;
