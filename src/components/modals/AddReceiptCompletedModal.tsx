/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import ModalComponent from '../Modal';
import NextButton from '../ui/NextButton';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

interface AddReceiptCompletedProps {
  visible: boolean;
  onClose: () => void;
}

const AddReceiptCompleted = ({visible, onClose}: AddReceiptCompletedProps) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const handleClose = () => {
    navigation.navigate(t('navigation.home'));
    onClose?.();
  };
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <View style={modalStyles.headerContainer}>
          <View style={modalStyles.modalHeader}>
            <Text onPress={handleClose} style={modalStyles.modalCloseButton}>
              x
            </Text>
          </View>
        </View>
      }>
      <View style={modalStyles.container}>
        <View style={modalStyles.messageContainer}>
          <View style={modalStyles.ticImage}>
            <ImageBackground
              source={require('../../assets/normal_u13.png')}
              style={{width: '96', height: '82'}}
              resizeMode="contain">
              <Icon
                style={modalStyles.ticIcon}
                name="check"
                size={25}
                color="#fff"
              />
            </ImageBackground>
          </View>
          <View>
            <Text style={modalStyles.title}>Vielen Dank für Ihren Beleg!</Text>
          </View>
          <View style={modalStyles.ticImage}>
            <ImageBackground
              source={require('../../assets/normal_u2.png')}
              style={{width: '66', height: '12'}}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={modalStyles.subTitle}>
              Wir haben Ihren Beleg erhalten und beginnen umgehend mit der
              Prüfung.
            </Text>
          </View>
        </View>
        <NextButton
          title="Weiteren Beleg einreichen"
          buttonStyles={{backgroundColor: '#309975'}}
          onPress={handleClose}
        />
      </View>
    </ModalComponent>
  );
};

export default AddReceiptCompleted;

const modalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
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
    fontSize: 24,
    color: '#454d66',
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  messageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flex: 0.7,
  },
  ticIcon: {
    position: 'absolute',
    top: 25,
    left: 40,
  },
  title: {
    fontSize: 24,
    color: '#454d66',
    fontFamily: '"PTSerif-Regular", "PT Serif", sans-serif;',
    fontWeight: '600',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif;',
    fontSize: 15,
    color: '#454d66',
    textAlign: 'center',
  },
});
