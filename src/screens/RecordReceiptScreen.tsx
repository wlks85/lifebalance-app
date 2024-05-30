//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, SectionList, Modal,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context';
import Layout from '../components/Layout';
import { formatDate, formatAmount } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const ModalComponent = ({visible, onClose, children, headerComponents})=> (
  <Modal
    animationType='slide'
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={modalStyles.modalContainer}>
      <View style={modalStyles.modalHeaderContainer}>
      {
        headerComponents?.map((component, index)=> <View key={index}>{component}</View>)
      }
      </View>
      <View style={modalStyles.modalContent}>
        {children}
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
    headerComponents={[
      <View style={modalStyles.modalHeader}><Text onPress={onClose} style={modalStyles.modalCloseButton}>X</Text></View>,
      <Text style={modalStyles.modalTitle}>Gezahlter Betrag</Text>,
      <View style={modalStyles.modalHeader}><Icon name='question' size={20}/></View>,
    ]}
  >
    {receipt && (
    <View style={modalStyles.receiptDetails}>
      <ReceiptItem receipt={receipt} disabled={true} />
      <View>
        <Text>Betrag des Belegs (inkl. MwSt.)</Text>
      </View>
      <View>
        <Text>0,00 €</Text>
      </View>
      <View>
        <Text>Erstatteter Betrag: 0,00 €</Text>
        <Text>Aktueller Kontostand: 20,01 €</Text>
      </View>
      {/* <Text style={modalStyles.receiptCompanyText}>{receipt.company.name}</Text>
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
      </View> */}
    </View>
  )}
  </ModalComponent>
);

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#ebe4e4', // this color needs to be changed
  },
  modalHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 17,
  },
  modalHeader: {
    height: 80,
    // backgroundColor: '#ffffff',
    justifyContent: 'center',
    // paddingLeft: 15,
  },
  modalCloseButton: {
    fontSize: 25,
  },
  modalContent: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#ffffff',
    borderRadius: 0, // No border radius to make it full screen
    paddingRight: 25,
    paddingLeft: 25,
  },
  modalTitle: {
    fontSize: 24,
    color: '#454d66',
    fontWeight: '700'
    // marginBottom: 10,
  },
  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
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


const ReceiptItem = ({ receipt,onItemClicked, disabled }) => {
  // () =>
  //     navigation.navigate('ReceiptDetail', {receipt: receipt})
  return (
    <TouchableOpacity style={styles.receipt} onPress={()=> onItemClicked(receipt)} disabled={disabled}>
      <View style={styles.receiptLogo}><Text style={styles.logoText}>GF</Text></View>
      <View style={styles.receiptInfo}>
        <View style={styles.receiptCompanyInfo}>
          <Text style={styles.receiptCompanyText}>{receipt.company.name}</Text>
          {/* <Text style={styles.receiptAmountText}>{formatAmount(receipt.amount)}</Text> */}
        </View>
        <View style={styles.receiptDateInfo}>
          <Text style={styles.date}>12345・Yoga-Kurs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'scroll'
  },
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
    // paddingTop: 16,
    // paddingRight: 8,
    // paddingBottom: 4,
    // paddingLeft: 8,
    lineHeight: 24,
    fontFamily: '"OpenSans-Regular", "Open Sans"',
  },
  receiptCompanyInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: 2,
  },
  receiptAmountText: {
    fontSize: 21,
    fontWeight: '700',
    // paddingTop: 16,
    // paddingRight: 16,
    // paddingBottom: 0,
    // paddingLeft: 16,
    lineHeight: 24,
    color: '#454d66',
  },
  receiptDateInfo: {
    paddingTop: 0,
    paddingRight: 0,
    // paddingBottom: 20,
    // paddingLeft: 8,
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

const SectionWrapper = ({ section,onSelectedItem }) => (
  <View style={styles.sectionWrapper}>
    <View style={styles.addReceiptBtnContainer}>
            <View style={styles.addReceiptTitle}>
                <Icon name='plus' size={15} />
                <Text style={styles.textStyle}>Neue Dienstleistung </Text>
            </View>
            <View>
            <Icon name='chevron-right' size={15}  />
            </View>
        </View>
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
    <Layout title='Dienstleistung' showSearchIcon={true}>
      <SafeAreaView style={styles.container}>
        <ListComponent data={data} />
      </SafeAreaView>
      {/* <View>
          <FlatList
            style={styles.card}
            data={receipts}
            renderItem={({item}) => <ReceiptItem key={item.id.toString()} receipt={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View> */}
    </Layout>
  );
};


export default ReceiptScreen;
