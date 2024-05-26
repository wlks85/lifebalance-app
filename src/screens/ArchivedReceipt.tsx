// @ts-nocheck
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../context';

const ArchivedReceiptsScreen = () => {
  const navigation = useNavigation();
  const {user} = useAppContext();
  const receipts = []; // Fetch archived receipts data

  return (
    <>
      {user && (
        <View>
          <FlatList
            data={receipts}
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
