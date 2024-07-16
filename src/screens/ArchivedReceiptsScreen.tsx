//@ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, SectionList, Modal,Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context';
import Layout from '../components/Layout';
import { formatDate, formatAmount } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { ReceiptService } from '../services';
import ReceiptItem from '../components/modules/receipt/ReceiptItem';

const ModalComponent = ({visible, onClose, children,})=> (
  <Modal
    animationType='slide'
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={modalStyles.modalContainer}>
      <View style={modalStyles.modalHeader}>
        <AntIcon name="close" onPress={onClose} style={modalStyles.modalCloseButton} />
      </View>
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
        <View style={{flex: 1}}>
          <Image style={{flex: 1, width: '100%',height: '100%',}} src={receipt?.image}/>
        </View>
      </>)
    }
  </ModalComponent>
);

const ReceiptModal = ({ receipt, visible, onClose,onAction }) => {
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
    >
      {receipt && (
      <View style={{padding: 20,}}>
        <Text style={modalStyles.receiptCompanyText}>{receipt.providerName}</Text>
        <Text style={modalStyles.receiptAmountText}>{formatAmount(Number(receipt.amount)/100)}</Text>
        <View style={modalStyles.receiptDetailsCard}>
          <View style={modalStyles.cardItem}>
            <View style={modalStyles.cardItemIcon}>
              <Icon size={30} name="piggy-bank"></Icon>
            </View>
            <View style={modalStyles.cardItemContent}>
              <Text style={modalStyles.receiptDetailsItemLabel}>Erstatteter Betrag</Text>
              {receipt?.status === '0' && <Text style={[modalStyles.receiptDetailsItemValue, {color: '#309975'}]}>{formatAmount(Number(receipt?.amount)/100)}</Text>}
              { receipt?.status === '1' &&
                <View style={modalStyles.rejectedStatusContainer}>
                <Text style={[modalStyles.receiptDetailsItemValue, {color: '#a9040e'}]}>Abgelehnt</Text>
                <Icon color="#454d66" name="question-circle" size={15} />
              </View>}
              {receipt?.status === '2' && <Text style={[modalStyles.receiptDetailsItemValue]}>In Prüfung</Text>}
            </View>
          </View>
          
          <View style={modalStyles.cardItem}>
            <View style={modalStyles.cardItemIcon}>
              <Icon size={30} name="calendar-alt"></Icon>
            </View>
            <View style={modalStyles.cardItemContent}>
              <Text style={modalStyles.receiptDetailsItemLabel}>Eingereicht</Text>
              <Text style={modalStyles.receiptDetailsItemValue}>{formatDate(receipt?.date ? receipt?.date : new Date())}</Text>
            </View>
          </View>
  
          <View style={modalStyles.cardItem}>
            <View style={modalStyles.cardItemIcon}>
              <Icon size={30} name="map-marker-alt"></Icon>
            </View>
            <View style={modalStyles.cardItemContent}>
              <Text style={modalStyles.receiptDetailsItemLabel}>PLZ des Dienstleisters</Text>
              <Text style={modalStyles.receiptDetailsItemValue}>{receipt?.postCode}</Text>
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
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  modalHeader: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  modalCloseButton: {
    fontSize: 27,
    color: '#454d66',
    paddingLeft: 15,
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
  },
  rejectedStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }
})

const styles = StyleSheet.create({
  container: {
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'scroll',
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
        <ReceiptItem key={item.uuid} onItemClicked={onSelectedItem} receipt={item} showAmount={true} />
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
        sections={data || []}
        keyExtractor={(item) => item.uuid.toString()}
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
  const [receipts, setReceipts] = useState([]);

  const fetchReceipts = useCallback(() => {
    ReceiptService.getArchivedReceipts()
    .then((receipts)=> {
      setReceipts(receipts);
    })
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchReceipts();
    }, [fetchReceipts])
  );

  const { user } = useAppContext();


  return (
    <Layout title='Belagarchiv'>
      <SafeAreaView style={styles.container}>
        <ListComponent data={receipts || []} />
      </SafeAreaView>
    </Layout>
  );
};


export default ArchivedReceiptsScreen;
