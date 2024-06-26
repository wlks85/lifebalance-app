//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ReceiptItem from '../components/modules/receipt/ReceiptItem';
import ReceiptModal from '../components/modals/ReceiptModal';
import AddReceiptModal from '../components/modals/AddReciptModal';
import { ReceiptService } from '../services';

interface HeaderProps {
  goBack: ()=>void;
}

const Header = ({goBack}: HeaderProps)=>{
  return (
    <View style={styles.headerContainer}>
                  <IconAnt
                    onPress={goBack}
                    style={styles.headerButtons}
                    name={'arrowleft'}
                    color={'#454d66'}
                    size={25}
                  />

              <Text style={styles.headerTitle}>Dienstleistung</Text>

                  <IconAnt
                    onPress={goBack}
                    style={styles.headerButtons}
                    name={'search1'}
                    color={'#454d66'}
                    size={25}
                  />
      </View>
  )
}

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
      />

      <AddReceiptModal
        onClose={closeModal}
        visible={createReceiptVisible}
      />
    </SafeAreaView>
  );
};


const ReceiptScreen = () => {
  const navigation = useNavigation();
  const [receipts, setReceipts] = useState([]);

  useEffect(()=>{
    ReceiptService.getReceipts()
    .then((receipts)=> {
      setReceipts(receipts);
    })
  }, []);

  const { user } = useAppContext();


  return (
    <Layout Header={Header}>
      <SafeAreaView style={styles.container}>
        <ListComponent data={receipts} />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans"',
    paddingVertical: 15,
  },
  headerButtons: {
    fontWeight: '100',
    fontSize: 27,
    fontStyle: 'normal',
  },
  headerTextContainer: {
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    // flex: 5,
  },
  headerTitle: {
    textAlign: 'center',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans",',
    color: '#454d66',
    fontWeight: '700',
    fontSize: 22,
  },
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
  },

  addReceiptTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  textStyle: {
  fontSize: 15,
  fontWeight: '600',
  color: '#454d66'
  }

});


export default ReceiptScreen;
