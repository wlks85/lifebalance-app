/* eslint-disable react-native/no-inline-styles */
//@ts-nocheck
import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import ModalComponent from '../Modal';
import NextButton from '../ui/NextButton';
import Icon from 'react-native-vector-icons/FontAwesome6';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {ModalStyles} from '../../styles';
import {useTranslation} from 'react-i18next';

interface AddReceiptCompletedProps {
  visible: boolean;
  onClose: () => void;
}

const AddReceiptCompleted = ({visible, onClose}: AddReceiptCompletedProps) => {
  const {t} = useTranslation();
  const handleClose = () => {
    onClose?.();
  };
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <>
          <IconAnt
            onPress={handleClose}
            style={modalStyles.headerButtons}
            name={'close'}
            color={'#454d66'}
            size={25}
          />
        </>
      }>
      <View style={modalStyles.container}>
        <View style={modalStyles.messageContainer}>
          <View style={modalStyles.ticImage}>
            <ImageBackground
              source={require('../../assets/normal_u13.png')}
              style={{width: 96, height: 83}}
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
            <Text style={modalStyles.title}>{t('thankYouMessage')}</Text>
          </View>
          <View style={modalStyles.ticImage}>
            <ImageBackground
              source={require('../../assets/normal_u2.png')}
              style={{width: 66, height: 12}}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={modalStyles.subTitle}>
              {t('receiptReceiptMessage')}
            </Text>
          </View>
        </View>
        <NextButton
          title={t('Submit further evidence')}
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
    fontFamily: 'PTSerif-Regular;',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'OpenSans-Regular;',
    fontSize: 15,
    color: '#454d66',
    textAlign: 'center',
  },
  ...ModalStyles,
});
