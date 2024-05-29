//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, SectionList, Modal,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context';
import Layout from '../components/Layout';
import { formatDate, formatAmount } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const ModalComponent = ({visible, onClose, children,})=> (
  <Modal
    animationType='slide'
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={modalStyles.modalContainer}>
      <View style={modalStyles.modalHeader}><Text onPress={onClose} style={modalStyles.modalCloseButton}>X</Text></View>
      <View style={modalStyles.modalContent}>
        {children}
        {/* <View style={{height: 30,width: '100%',
          paddingBottom: 20,
          marginBottom: 100,
        }}></View> */}
      </View>
    </View>
  </Modal>
);


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

const ReceiptModal = ({ receipt, visible, onClose,onAction }) => (
  <ModalComponent
    onClose={onClose}
    visible={visible}
  >
    {receipt && (
    <View style={{padding: 20,}}>
      <Text style={modalStyles.receiptCompanyText}>{receipt.company.name}</Text>
      <Text style={modalStyles.receiptAmountText}>{formatAmount(receipt.amount)}</Text>
      <View style={modalStyles.receiptDetailsCard}>
        <View style={modalStyles.cardItem}>
          <View style={modalStyles.cardItemIcon}>
            <Icon size={30} name="piggy-bank"></Icon>
          </View>
          <View style={modalStyles.cardItemContent}>
            <Text style={modalStyles.receiptDetailsItemLabel}>Erstatteter Betrag</Text>
            <Text style={modalStyles.receiptDetailsItemValue}>{formatAmount(receipt.amount_paid)}</Text>
          </View>
        </View>
        
        <View style={modalStyles.cardItem}>
          <View style={modalStyles.cardItemIcon}>
            <Icon size={30} name="calendar-alt"></Icon>
          </View>
          <View style={modalStyles.cardItemContent}>
            <Text style={modalStyles.receiptDetailsItemLabel}>Eingereicht</Text>
            <Text style={modalStyles.receiptDetailsItemValue}>{formatDate(receipt.date)}</Text>
          </View>
        </View>

        <View style={modalStyles.cardItem}>
          <View style={modalStyles.cardItemIcon}>
            <Icon size={30} name="map-marker-alt"></Icon>
          </View>
          <View style={modalStyles.cardItemContent}>
            <Text style={modalStyles.receiptDetailsItemLabel}>PLZ des Dienstleisters</Text>
            <Text style={modalStyles.receiptDetailsItemValue}>1234345</Text>
          </View>
        </View>

        <View style={modalStyles.cardItem}>
          <View style={modalStyles.cardItemIcon}>
            <Icon size={30} name="project-diagram"></Icon>
          </View>
          <View style={modalStyles.cardItemContent}>
            <Text style={modalStyles.receiptDetailsItemLabel}>Kategore</Text>
            <Text style={modalStyles.receiptDetailsItemValue}>Yoga-Kurs</Text>
          </View>
        </View>

        <TouchableOpacity style={modalStyles.cardItem} onPress={()=>onAction(receipt)}>
          <View style={modalStyles.cardItemIcon}>
            <FAIcon size={30} name="file-text-o"></FAIcon>
          </View>
          <View style={{...modalStyles.cardItemContentRow}}>
            <Text style={{fontSize: 17,fontWeight: '400'}} >Beleg ansehen</Text>
            <FAIcon size={20} name="chevron-right" style={{paddingRight: 15,}} ></FAIcon>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )}
  </ModalComponent>
);

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalHeader: {
    height: 80,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  modalCloseButton: {
    fontSize: 25,
  },
  modalContent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 0, // No border radius to make it full screen
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  receiptCompanyText: {
    fontSize: 19,
    color: '#454d66',
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 8,
    paddingRight: 0,
    fontWeight: 'bold',
  },
  receiptAmountText: {
    fontSize: 55,
    color: '#454d66',
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 32,
    paddingRight: 0,
    fontWeight: 'bold',
    height: 97,
    flexGrow: 0,
    flexShrink: 0,
  },
  receiptDetailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOpacity: 0.1,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'scroll',
    elevation: 5,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    minHeight: 80,
    padding: 2,
  },
  cardItemIcon: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 4,
    paddingRight: 0,
  },
  cardItemContent: {
    flexDirection: 'column',
  },
  cardItemContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  receiptDetailsItemLabel: {
    fontWeight: 'bold',
    color: '#454d66',
    paddingTop: 16,
    paddingLeft: 0,
    paddingBottom: 4,
    paddingRight: 0,
  },
  receiptDetailsItemValue: {
    fontWeight: 'normal',
    color: '#454d66',
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 20,
    paddingRight: 0,
  }
})


const ReceiptItem = ({ receipt,onItemClicked }) => {
  // () =>
  //     navigation.navigate('ReceiptDetail', {receipt: receipt})
  return (
    <TouchableOpacity style={styles.receipt} onPress={()=> onItemClicked(receipt)}>
      <View style={styles.receiptLogo}><Text style={styles.logoText}>CM</Text></View>
      <View style={styles.receiptInfo}>
        <View style={styles.receiptCompanyInfo}>
          <Text style={styles.receiptCompanyText}>{receipt.company.name}</Text>
          <Text style={styles.receiptAmountText}>{formatAmount(receipt.amount)}</Text>
        </View>
        <View style={styles.receiptDateInfo}>
          <Text style={styles.date}>{formatDate(receipt.date)}.</Text>
          <Text style={styles.date}>.</Text>
          <Text style={styles.date}>{`${formatAmount(receipt.amount_paid)} erstattet`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
// 0px 2px 25px 0px rgba(0, 0, 0, 0.07);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'scroll',
    elevation: 5,
  },
  receipt: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    minHeight: 80,
    padding: 6,
    alignItems: 'center'
  },
  receiptInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
  },
  receiptCompanyText: {
    color: '#454d66',
    fontSize: 21,
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    lineHeight: 24,
    fontFamily: '"OpenSans-Regular", "Open Sans"',
  },
  receiptCompanyInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
  },
  receiptAmountText: {
    fontSize: 21,
    fontWeight: '700',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    lineHeight: 24,
    color: '#454d66',
  },
  receiptDateInfo: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  date: {
    fontSize: 15,
    lineHeight: 16,
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

});

const SectionWrapper = ({ section,onSelectedItem }) => (
  <View style={styles.sectionWrapper}>
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
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [imageSelectedReceipt, setImageSelectedReceipt] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);
  const openModal = (receipt) => {
    setSelectedReceipt(receipt);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReceipt(null);
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
        renderSectionHeader={({ section }) => <SectionWrapper onSelectedItem={openModal} section={section} />}
      />
      <ReceiptModal
        visible={modalVisible}
        receipt={selectedReceipt}
        onClose={closeModal}
        onAction={onReceiptImageDisplay}
      />
      <ReceiptImageModal
        visible={imageVisible}
        receipt={imageSelectedReceipt}
        onClose={closeImageModal}
      />
    </SafeAreaView>
  );
};


const ArchivedReceiptsScreen = () => {
  const navigation = useNavigation();

  const data = [{ "title": "January", "items": [{ "id": 1, "amount": 32.21, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-01-03T00:00:00", "amount_paid": 18.54 }, { "id": 2, "amount": 91.26, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-01-18T00:00:00", "amount_paid": 44.73 }] }, { "title": "February", "items": [{ "id": 1, "amount": 38.52, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-02-18T00:00:00", "amount_paid": 23.63 }] }, { "title": "March", "items": [{ "id": 1, "amount": 51.93, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-03-26T00:00:00", "amount_paid": 16.34 }, { "id": 2, "amount": 53.25, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-03-12T00:00:00", "amount_paid": 88.75 }, { "id": 3, "amount": 56.51, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-03-21T00:00:00", "amount_paid": 42.13 }] }, { "title": "April", "items": [{ "id": 1, "amount": 20.98, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-04-22T00:00:00", "amount_paid": 41.26 }, { "id": 2, "amount": 33.07, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-04-08T00:00:00", "amount_paid": 30.35 }, { "id": 3, "amount": 56.44, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-04-15T00:00:00", "amount_paid": 83.23 }] }, { "title": "May", "items": [{ "id": 1, "amount": 45.28, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-18T00:00:00", "amount_paid": 75.74 }, { "id": 2, "amount": 29.7, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-17T00:00:00", "amount_paid": 33.84 }, { "id": 3, "amount": 61.76, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-20T00:00:00", "amount_paid": 78.98 }, { "id": 4, "amount": 74.78, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-17T00:00:00", "amount_paid": 83.95 }, { "id": 5, "amount": 31.43, "company": { "name": "GMbh Finance", "logo": "GF" }, "date": "2024-05-07T00:00:00", "amount_paid": 54.38 }] }]
    .map((item) => ({ title: item.title, data: item.items }));

  const receipts = [{
    id: 1,
    amount: 23.93,
    company: { name: "GMbh Finance", logo: "GF" },
    date: new Date(),
    amount_paid: 14.32,
  },
  {
    id: 2,
    amount: 21.93,
    company: { name: "GMbh Finance", logo: "GF" },
    date: new Date(),
    amount_paid: 3.32,
  },
  ];
  const { user } = useAppContext();


  return (
    <Layout title='Belagarchiv'>
      <SafeAreaView style={styles.container}>
        <ListComponent data={data} />
      </SafeAreaView>
    </Layout>
  );
};


export default ArchivedReceiptsScreen;
