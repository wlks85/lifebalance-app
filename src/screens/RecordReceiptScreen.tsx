//@ts-nocheck
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Layout from '../components/Layout';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ReceiptItem from '../components/modules/receipt/ReceiptItem';
import ReceiptModal from '../components/modals/ReceiptModal';
import AddReceiptModal from '../components/modals/AddReciptModal';
import receiptService from '../services/ReceiptService';
import AppActivityIndicator from '../components/AppActivityIndicator';

interface HeaderProps {
  goBack: () => void;
}

const Header = ({goBack}: HeaderProps) => {
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
  );
};

const SectionWrapper = ({section, onSelectedItem}) => (
  <View style={styles.sectionWrapper}>
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleText}>{section.title}</Text>
    </View>

    <View style={styles.card}>
      {section?.data?.map(item => (
        <ReceiptItem
          key={item?.uuid}
          onItemClicked={onSelectedItem}
          receipt={item}
          disabled={false}
        />
      ))}
    </View>
  </View>
);
const ListComponent = ({
  data = [],
  isLoading,
  onReceiptSelected,
  onEndReached,
}) => {
  const previewSelected = receipt => {
    onReceiptSelected(receipt);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading && <AppActivityIndicator size="large" isLoading={isLoading} />}
      {!isLoading && (
        <SectionList
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          sections={data}
          keyExtractor={item => item.uuid.toString()}
          renderItem={() => null}
          renderSectionHeader={({section}) => (
            <SectionWrapper
              onSelectedItem={previewSelected}
              section={section}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const ReceiptScreen = () => {
  const [receiptData, setReceiptData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createReceiptVisible, setCreateReceiptVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [page, setPage] = useState(0);

  const openAddReceiptModal = () => {
    setCreateReceiptVisible(true);
  };

  const closeAddReceiptModal = () => {
    setCreateReceiptVisible(false);
    fetchReceipts();
  };

  const closePreviewReceiptModal = () => {
    setPreviewModalVisible(false);
    setSelectedReceipt(null);
  };

  const onReceiptSelected = receipt => {
    setSelectedReceipt(receipt);
    setPreviewModalVisible(true);
  };

  const fetchReceipts = useCallback(() => {
    setIsLoading(true);
    receiptService
      .getReceipts(0)
      .then(data => {
        setIsLoading(false);
        setReceiptData([{title: 'Zuletzt verwendet', data: data || []}]);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const fetchMore = async () => {
    try {
      const result = await receiptService.getReceipts(page + 1);
      if (result.length) {
        setReceiptData(preValue => [
          {
            title: 'Zuletzt verwendet',
            data: [...preValue[0].data, ...result] || [],
          },
        ]);
        setPage(pre => pre + 1);
      }
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-alert
      alert(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReceipts();
    }, [fetchReceipts]),
  );

  return (
    <Layout Header={Header}>
      <TouchableOpacity
        style={styles.addReceiptBtnContainer}
        onPress={() => openAddReceiptModal()}>
        <View style={styles.addReceiptTitle}>
          <IconAnt name="plus" size={25} color={'#454d66'} />
          <Text style={styles.textStyle}>Neue Dienstleistung </Text>
        </View>
        <View>
          <IconAnt name="right" size={25} color={'#454d66'} />
        </View>
      </TouchableOpacity>
      <ListComponent
        data={receiptData || []}
        isLoading={isLoading}
        onReceiptSelected={onReceiptSelected}
        onEndReached={fetchMore}
      />
      {selectedReceipt && (
        <ReceiptModal
          visible={previewModalVisible}
          receipt={selectedReceipt}
          onClose={closePreviewReceiptModal}
        />
      )}
      <AddReceiptModal
        onClose={closeAddReceiptModal}
        visible={createReceiptVisible}
      />
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
    // backgroundColor:
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
    shadowOffset: {width: 0, height: 5},
    overflow: 'scroll',
  },
  sectionWrapper: {
    display: 'flex',
    gap: 10,
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
    gap: 10,
  },

  textStyle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#454d66',
  },
});

export default ReceiptScreen;
