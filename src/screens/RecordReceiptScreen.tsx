//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, SectionList, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context';
import Layout from '../components/Layout';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ReceiptItem from '../components/modules/receipt/ReceiptItem';
import ReceiptModal from '../components/modals/ReceiptModal';
import AddReceiptModal from '../components/modals/AddReciptModal';
import { ReceiptService } from '../services';
import { useAuth } from '../providers/auth-provider';
import { useAxios } from '../providers/axios-provider';

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
      {section?.data?.map(item => (
        <ReceiptItem key={item?.uuid} onItemClicked={onSelectedItem} receipt={item} />
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
        keyExtractor={(item) => item.uuid.toString()}
        renderItem={() => null}  // No need to render items here, they will be rendered in the wrapper
        renderSectionHeader={({ section }) => <SectionWrapper onSelectedItem={openModal} section={section} openAddReceiptModal={openAddReceiptModal} />}
      />
      {/* <FlatList 
        data={data}
        ListEmptyComponent={()=>(
          <Text>No data</Text>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>(

        )}
      /> */}
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
  const {userDetails} = useAuth();
  const axiosClient = useAxios();
  const [receiptData, setReceiptData]= useState([]);

  async function getReceipts(){
    const result = await axiosClient.get('https://w3.lbplus.de/lbp/mobile-app/rest-service/v1.0/ep/node.json?parameters[type]=receipt&page=1');
    // console.log({result: result?.data?.data});
    setReceiptData([{title: "Zuletzt verwendet", data: result?.data}]);
  //   {
  //     "nid": "10902",
  //     "vid": "40073",
  //     "type": "receipt",
  //     "language": "und",
  //     "title": "#R171890922222704",
  //     "uid": "909",
  //     "status": "0",
  //     "created": "1718909219",
  //     "changed": "1718909219",
  //     "comment": "0",
  //     "promote": "0",
  //     "sticky": "0",
  //     "tnid": "0",
  //     "translate": "0",
  //     "uuid": "d4ea0bee-4c87-4825-bb92-62eeda616816",
  //     "uri": "https://w3.lbplus.de/lbp/mobile-app/rest-service/v1.0/ep/node/10902"
  // }
  }

  useEffect(()=>{
    getReceipts();
  }, []);

  const { user } = useAppContext();
console.log(receiptData);
  return (
    <Layout Header={Header}>
      <SafeAreaView style={styles.container}>
        <ListComponent data={receiptData || []} />
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
