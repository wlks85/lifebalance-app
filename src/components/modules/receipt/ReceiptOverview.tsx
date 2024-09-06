/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReceiptItem, {IReceipt} from './ReceiptItem';
import FieldLabel from '../../ui/FieldLabel';
import ItemCard from './ItemCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import NextButton from '../../ui/NextButton';
import {ScrollView} from 'react-native-gesture-handler';
import AddReceiptModal from '../../modals/AddReciptModal';
import EditAmountModal from '../../modals/EditAmountModal';
import ReceiptImageModal from '../../modals/ReceiptImageModal';
import AddReceiptCompleted from '../../modals/AddReceiptCompletedModal';
import receiptService from '../../../services/ReceiptService';
import {useAuth} from '../../../providers/auth-provider';
import {useTranslation} from 'react-i18next';

const ReceiptOverview = ({receipt, onClose}) => {
  const {t} = useTranslation();
  const [receiptInfo, setReceiptInfo] = useState(receipt);
  const [showAddReceiptModal, setShowAddReceiptModal] = useState(false);
  const [showEditAmountModal, setShowEditAmountModal] = useState(false);
  const [showReceiptImageModal, setShowReceiptImageModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const {userDetails} = useAuth();

  const onReceiptAdditionCompleted = () => {
    setShowCompletedModal(false);
    setTimeout(() => onClose(), 100);
  };

  const handleSubmitReceipt = async () => {
    try {
      setLoading(true);
      await receiptService.addReceipt({
        ...receiptInfo,
        owner: userDetails?.field_bank_account_owner.und[0]?.value,
        iban: userDetails?.field_bank_iban.und[0]?.value,
      });
      setShowCompletedModal(true);
      setShowAddReceiptModal(false);
      setShowEditAmountModal(false);
      setShowReceiptImageModal(false);
      setLoading(false);
    } catch (err) {
      alert(err?.message ?? t('Something went wrong'));
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={{width: '100%'}}>
      <View style={styles.container}>
        <View style={styles.overview}>
          <FieldLabel label={t('service')}>
            <ReceiptItem
              receipt={receiptInfo}
              disabled={false}
              showEditBtn={true}
              onEditBtnPress={() => setShowAddReceiptModal(true)}
            />
          </FieldLabel>

          <FieldLabel label={`${t('Amount including VAT')}.`}>
            <ItemCard
              item={{
                title: receiptInfo?.amount,
                logo: '€',
                subtitle: receiptInfo?.amount,
              }}
              showEditBtn={true}
              onItemClicked={() => {}}
              onEditBtnPress={() => setShowEditAmountModal(true)}
            />
          </FieldLabel>

          <FieldLabel label={t('document')}>
            <ItemCard
              item={{
                title: receiptInfo?.title ?? '123-1234567-lbBeleg',
                logo: <Icon name="file-text-o" size={20} />,
                subtitle: t('photo'),
              }}
              showEditBtn={true}
              onItemClicked={() => {}}
              onEditBtnPress={() => setShowReceiptImageModal(true)}
            />
          </FieldLabel>

          <View>
            <Text style={styles.confirmationText}>
              {t(
                'By submitting the receipt, I confirm that I have the information provided I used the service personally.',
              )}
            </Text>
          </View>
        </View>

        <NextButton
          title={!loading ? t('Submit proof now') : `${t('Loading')}...`}
          onPress={handleSubmitReceipt}
          buttonStyles={{backgroundColor: '#309975'}}
          disabled={loading}
        />

        <AddReceiptModal
          visible={showAddReceiptModal}
          onClose={() => setShowAddReceiptModal(false)}
          defaultValue={receiptInfo}
          onAction={(values: Partial<IReceipt>) => {
            setReceiptInfo(preValue => ({
              ...preValue,
              ...values,
            }));
          }}
        />

        <EditAmountModal
          receipt={receiptInfo}
          visible={showEditAmountModal}
          onClose={() => setShowEditAmountModal(false)}
          onAction={values =>
            setReceiptInfo(preValue => ({
              ...preValue,
              amount: values,
            }))
          }
        />

        <ReceiptImageModal
          visible={showReceiptImageModal}
          onClose={() => setShowReceiptImageModal(false)}
          image={receipt?.image}
          onAction={() => {}}
        />

        <AddReceiptCompleted
          visible={showCompletedModal}
          onClose={onReceiptAdditionCompleted}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
  },
  overview: {
    display: 'flex',
    gap: 20,
  },
  confirmationText: {
    color: '#454d66',
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
  },
});

export default ReceiptOverview;
