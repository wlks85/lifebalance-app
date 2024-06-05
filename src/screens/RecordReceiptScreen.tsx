//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, SectionList, Modal,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context';
import Layout from '../components/Layout';
import { formatDate, formatAmount } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import ReceiptItem from '../components/modules/receipt/receiptItem';
import ModalComponent from '../components/modal';
import ReceiptModal from '../components/modals/receiptModal';
import AddReceiptModal from '../components/modals/addReciptModal';


const ReceiptImageModal = ({receipt, visible,onClose}) => (
  <ModalComponent
    visible={visible}
    onClose={onClose}
  >
    {
      receipt && (<>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Image style={{flex: 1, width: '100%',height: '100%',}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMp2QN2WCx7VRAXuJme-AcdxJJeXRSM3obFhXX_uIKvQ&s"/>
        </View>
      </>)
    }
  </ModalComponent>
);


const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'red'
  // },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'scroll'
  },
  sectionWrapper: {
    display: 'flex',
    gap: 10
  },
  sectionTitle: {
    lineHeight: 24,
    paddingTop: 24,
    paddingRight: 0,
    paddingBottom: 8,
    paddingLeft: 0,
    height: 56,
  },
  sectionTitleText: {
    color: '#454d66',
    fontWeight: '700',
    lineHeight: 24,
    fontSize: 19,
  },

  addReceiptBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 72,
    padding: 24,
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  color: '#454d66',
  borderRadius: 8,
    // padding: 25
  },

  addReceiptTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  textStyle: {
//   fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
  fontSize: 15,
  fontWeight: '600',
  color: '#454d66'
  }

});

const SectionWrapper = ({ section,onSelectedItem, openAddReceiptModal }) => (
  <View style={styles.sectionWrapper}>
    <TouchableOpacity 
    style={styles.addReceiptBtnContainer}
    onPress={()=>openAddReceiptModal()}
    >
            <View style={styles.addReceiptTitle}>
                <Icon name='plus' size={15} />
                <Text style={styles.textStyle}>Neue Dienstleistung </Text>
            </View>
            <View>
            <Icon name='chevron-right' size={15}  />
            </View>
    </TouchableOpacity>
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleText}>{section.title}</Text>
    </View>

    <View style={styles.card}>
      {section.data.map(item => (
        <ReceiptItem key={item.id} onItemClicked={onSelectedItem} receipt={item} />
      ))}
    </View>
  </View>
);
const ListComponent = ({ data = [] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [createReceiptVisible, setCreateReceiptVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [imageSelectedReceipt, setImageSelectedReceipt] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);
  const openModal = (receipt) => {
    setSelectedReceipt(receipt);
    setModalVisible(true);
  };

  const openAddReceiptModal = ()=>{
    setCreateReceiptVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReceipt(null);
    setCreateReceiptVisible(false);
  };

  const closeImageModal = ()=> {
    setImageSelectedReceipt(null);
    setImageVisible(false);
  }

  const onReceiptImageDisplay = (receipt)=> {
    setImageVisible(true);
    setImageSelectedReceipt(receipt)
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => null}  // No need to render items here, they will be rendered in the wrapper
        renderSectionHeader={({ section }) => <SectionWrapper onSelectedItem={openModal} section={section} openAddReceiptModal={openAddReceiptModal} />}
      />
      <ReceiptModal
        visible={modalVisible}
        receipt={selectedReceipt}
        onClose={closeModal}
        onAction={onReceiptImageDisplay}
      />

      <AddReceiptModal
        onClose={closeModal}
        visible={createReceiptVisible}
      />
      <ReceiptImageModal
        visible={imageVisible}
        receipt={imageSelectedReceipt}
        onClose={closeImageModal}
      />
    </SafeAreaView>
  );
};


const ReceiptScreen = () => {
  const navigation = useNavigation();

  const data = [{ "title": "Zuletzt verwendet", "items": [{ "id": 1, "amount": 32.21, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-03T00:00:00", "amount_paid": 18.54 },
   { "id": 2, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
   { "id": 3, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
   { "id": 4, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
   { "id": 5, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
   { "id": 6, "amount": 91.26, "company": { "name": "Good Feel GmBH", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 },
  ] }]
    .map((item) => ({ title: item.title, data: item.items }));

  const receipts = [{
    id: 1,
    amount: 23.93,
    company: { name: "Good Feel GmBH", logo: "GF" },
    date: new Date(),
    amount_paid: 14.32,
  },
  {
    id: 2,
    amount: 21.93,
    company: { name: "Good Feel GmBH", logo: "GF" },
    date: new Date(),
    amount_paid: 3.32,
  },
  ];
  const { user } = useAppContext();


  return (
    <Layout title='Dienstleistung' showSearchIcon={false}>
      <SafeAreaView style={styles.container}>
        <ListComponent data={data} />
      </SafeAreaView>
    </Layout>
  );
};


export default ReceiptScreen;
