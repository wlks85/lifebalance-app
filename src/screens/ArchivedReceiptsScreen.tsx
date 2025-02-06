/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  SectionList,
  Modal,
  Image,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Layout from '../components/Layout';
import {formatDate, formatAmount, mergeDataByTitle} from '../utils';
import {ReceiptService} from '../services';
import ReceiptItem from '../components/modules/receipt/ReceiptItem';
import AppActivityIndicator from '../components/AppActivityIndicator';
import {useTranslation} from 'react-i18next';
import {Icons} from '../components/icons';
import { ScrollView } from 'react-native-gesture-handler';

const ModalComponent = ({visible, onClose, children}) => (
  <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
    <SafeAreaView style={{flex: 1}}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalHeader}>
          <Icons
            onPress={onClose}
            color="#454d66"
            name="close-light"
            size={30}
          />
        </View>
        <View style={modalStyles.modalContent}>{children}</View>
      </View>
    </SafeAreaView>
  </Modal>
);

const ReceiptImageModal = ({receipt, visible, onClose, setSelectedReceipt}) => {
  const handleClose = () => {
    setSelectedReceipt?.(receipt);
    onClose?.();
  };
  return (
    <ModalComponent visible={visible} onClose={handleClose}>
      {receipt && (
        <>
          <View style={{flex: 1}}>
            <Image
              style={{flex: 1, width: '100%', height: '100%'}}
              src={receipt?.image}
            />
          </View>
        </>
      )}
    </ModalComponent>
  );
};

const ReceiptModal = ({receipt, visible, onClose, onAction}) => {
  const {t} = useTranslation();
  return (
    <ModalComponent onClose={onClose} visible={visible}>
      {receipt && (
        <ScrollView style={{margin: 20}}>
          <Text style={modalStyles.receiptCompanyText}>
            {receipt.providerName}
          </Text>
          <Text style={modalStyles.receiptAmountText}>
            {formatAmount(Number(receipt.amount))}
          </Text>
          <View style={modalStyles.receiptDetailsCard}>
            <View style={modalStyles.cardItem}>
              <View style={modalStyles.cardItemIcon}>
                <Icons size={30} name="piggy-bank" color={'#454d66'} />
              </View>
              <View style={modalStyles.cardItemContent}>
                <Text style={modalStyles.receiptDetailsItemLabel}>
                  {t('Refunded amount')}
                </Text>
                {receipt?.status === '0' && (
                  <Text
                    style={[
                      modalStyles.receiptDetailsItemValue,
                      {color: '#309975'},
                    ]}>
                    {formatAmount(Number(receipt?.amount))}
                  </Text>
                )}
                {receipt?.status === '1' && (
                  <View style={modalStyles.rejectedStatusContainer}>
                    <Text
                      style={[
                        modalStyles.receiptDetailsItemValue,
                        {color: '#a9040e'},
                      ]}>
                      {t('Rejected')}
                    </Text>
                    <Icons
                      color="#454d66"
                      name="question-mark-circle-light"
                      size={15}
                    />
                  </View>
                )}
                {receipt?.status === '2' && (
                  <Text style={[modalStyles.receiptDetailsItemValue]}>
                    {t('Under examination')}
                  </Text>
                )}
              </View>
            </View>

            <View style={modalStyles.cardItem}>
              <View style={modalStyles.cardItemIcon}>
                <Icons color="#454d66" name="calendar-light" size={30} />
              </View>
              <View style={modalStyles.cardItemContent}>
                <Text style={modalStyles.receiptDetailsItemLabel}>
                  {t('Submitted')}
                </Text>
                <Text style={modalStyles.receiptDetailsItemValue}>
                  {formatDate(receipt?.date ? receipt?.date : new Date())}
                </Text>
              </View>
            </View>

            <View style={modalStyles.cardItem}>
              <View style={modalStyles.cardItemIcon}>
                <Icons color="#454d66" name="location-light" size={30} />
              </View>
              <View style={modalStyles.cardItemContent}>
                <Text style={modalStyles.receiptDetailsItemLabel}>
                  {t('Postal code of the service provider')}
                </Text>
                <Text style={modalStyles.receiptDetailsItemValue}>
                  {receipt?.postCode}
                </Text>
              </View>
            </View>

            {/* <View style={modalStyles.cardItem}>
              <View style={modalStyles.cardItemIcon}>
                <Icons color="#454d66" name="shapes-light" size={30} />
              </View>
              <View style={modalStyles.cardItemContent}>
                <Text style={modalStyles.receiptDetailsItemLabel}>
                  {t('category')}
                </Text>
                <Text style={modalStyles.receiptDetailsItemValue}>
                  {t('Yoga class')}
                </Text>
              </View>
            </View> */}

            <TouchableOpacity
              style={modalStyles.cardItem}
              onPress={() => onAction(receipt)}>
              <View style={modalStyles.cardItemIcon}>
                <Icons size={30} name="receipt-light" color="#454d66" />
              </View>
              <View style={{...modalStyles.cardItemContentRow}}>
                <Text style={{fontSize: 17, fontWeight: '400', color: '#454d66'}}>
                  {t('View receipt')}
                </Text>
                <Icons
                  size={30}
                  name="angle-right-light"
                  style={{paddingRight: 15, marginRight: 15}}
                  color="#454d66"
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </ModalComponent>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f6f4',
  },
  modalHeader: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    paddingLeft: 15,
  },
  modalContent: {
    flex: 1,
    width: '100%',
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
    fontSize: 45,
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
    shadowOffset: {width: 0, height: 5},
    overflow: 'scroll',
    elevation: 5,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#f0f0f0',
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
    gap: 10,
  },
});

const styles = StyleSheet.create({
  container: {},
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 5},
    overflow: 'scroll',
  },
  receipt: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    minHeight: 80,
    padding: 6,
    alignItems: 'center',
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

const SectionWrapper = ({section, onSelectedItem}) => {
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>{section.title}</Text>
      </View>

      <View style={styles.card}>
        {section.data.map((item, index) => (
          <ReceiptItem
            key={`${item?.uuid?.toString()}${index}`}
            onItemClicked={onSelectedItem}
            receipt={item}
            showAmount={true}
          />
        ))}
      </View>
    </View>
  );
};
const ListComponent = ({data = [], onEndReached, isLoading}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [imageSelectedReceipt, setImageSelectedReceipt] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);
  const openModal = receipt => {
    setSelectedReceipt(receipt);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReceipt(null);
  };

  const closeImageModal = () => {
    setImageSelectedReceipt(null);
    setImageVisible(false);
    setTimeout(() => setModalVisible(true), 100);
    setSelectedReceipt(selectedReceipt);
  };

  const onReceiptImageDisplay = receipt => {
    setModalVisible(false);
    setTimeout(() => setImageVisible(true), 100);
    setImageSelectedReceipt(receipt);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading && <AppActivityIndicator isLoading={isLoading} size="large" />}
      {!isLoading && (
        <SectionList
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          sections={data || []}
          keyExtractor={(item, index) => `${item?.uuid?.toString()}${index}`}
          renderItem={() => null} // No need to render items here, they will be rendered in the wrapper
          renderSectionHeader={({section}) => (
            <SectionWrapper onSelectedItem={openModal} section={section} />
          )}
        />
      )}
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
        setSelectedReceipt={setSelectedReceipt}
      />
    </SafeAreaView>
  );
};

const ArchivedReceiptsScreen = () => {
  const {t} = useTranslation();
  const [receipts, setReceipts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReceipts = useCallback(() => {
    setIsLoading(true);
    ReceiptService.getArchivedReceipts(0)
      .then(arReceipts => {
        setReceipts(arReceipts);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const fetchMore = async () => {
    try {
      const result = await ReceiptService.getArchivedReceipts(page + 1);
      if (result.length) {
        const paginatedData = mergeDataByTitle(receipts, result);
        setReceipts(paginatedData);
        setPage(pre => pre + 1);
      }
    } catch (err) {
      console.log(err);
      // eslint-disable-next-line no-alert
      Alert.alert(`Server communication error: ${err?.status}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReceipts();
    }, [fetchReceipts]),
  );

  return (
    <Layout title={t('Surface archive')}>
      <ListComponent
        data={receipts || []}
        onEndReached={fetchMore}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default ArchivedReceiptsScreen;
