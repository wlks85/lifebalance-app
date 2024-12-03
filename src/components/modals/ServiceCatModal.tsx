/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ModalComponent from '../Modal';
import { ScrollView } from 'react-native-gesture-handler';
import NextButton from '../ui/NextButton';
import { ReceiptService } from '../../services';
import { ModalStyles } from '../../styles';
import { useTranslation } from 'react-i18next';
import { Icons } from '../icons';
import CheckBox from 'react-native-check-box'

interface IServiceCategory {
  id: number;
  title: string;
}

interface ServiceCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onAction?: () => void;
  setServiceCategories: Dispatch<SetStateAction<any[]>>;
  services: IServiceCategory[];
}

const ServiceCategoryModal = ({
  visible,
  onClose,
  setServiceCategories,
  services,
}: ServiceCategoryModalProps) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  const handleAddService = srvs => {
    if (services?.find(service => service.id === srvs.id)) {
      const restService = services.filter(service => service.id !== srvs.id);
      setServiceCategories(restService);
    } else {
      setServiceCategories(preValue => [...preValue, srvs]);
    }
  };
  useEffect(() => {
    ReceiptService.getServiceCategories().then(cats => {
      setCategories(cats);
    });
  }, []);
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <>
          <Icons
            onPress={onClose}
            style={modalStyles.headerButtons}
            name={'arrow-left-light'}
            color={'#454d66'}
            size={25}
          />
          <Text style={modalStyles.modalTitle}>{t('Select category')}</Text>
        </>
      }>
      <View style={modalStyles.container}>
        <View
          style={{
            flex: 2.5 / 3,
            marginHorizontal: -25,
          }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 25,
              paddingBottom: 10,
            }}>
            <View style={modalStyles.catContainer}>
              {categories?.map((cat, index) => (
                <Pressable
                  key={index}
                  style={[modalStyles.categoryCard]}
                  onPress={() => handleAddService(cat)}>
                  <Text
                    style={[
                      modalStyles.catTitle,
                      services?.find(ser => ser.id === cat.id) && {
                        color: 'green',
                      },
                    ]}>
                    {cat.title}
                  </Text>
                  <CheckBox
                    style={{ padding: 10 }}
                    onClick={() => {
                      handleAddService(cat);
                    }}
                    isChecked={services?.find(ser => ser.id === cat.id)}
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            flex: 0.5 / 3,
            marginHorizontal: -25,
          }}>
          <View style={modalStyles.applyBtn}>
            <NextButton
              buttonStyles={{ backgroundColor: '#309975' }}
              title={'Auswahl anwenden'}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </ModalComponent>
  );
};

export default ServiceCategoryModal;

const modalStyles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 10,
    alignItems: 'center',
  },
  modalHeader: {
    height: 80,
    justifyContent: 'center',
  },
  modalCloseButton: {
    fontSize: 25,
  },
  modalContent: {
    flex: 1,
    width: '100%',
    borderRadius: 0, // No border radius to make it full screen
    paddingRight: 25,
    paddingLeft: 25,
  },
  modalTitle: {
    width: '100%',
    fontSize: 24,
    color: '#454d66',
    textAlign: 'center',
  },
  catContainer: {
    display: 'flex',
    gap: 1,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    height: 54,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  catTitle: {
    fontSize: 15,
    flex: 1,
    color: '#1e4251',
    fontFamily: 'OpenSans-Regular',
  },
  applyBtn: {
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  ...ModalStyles,
});
