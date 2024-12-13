/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import ModalComponent from '../Modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-gesture-handler';
import ReceiptOverviewModal from './ReceiptOverviewModal';
import ReceiptCard from '../modules/receipt/ReceiptCard';
import receiptService from '../../services/ReceiptService';
import { useAuth } from '../../providers/auth-provider';
import { generateReceiptTitle } from '../../utils';
import AppActivityIndicator from '../AppActivityIndicator';
import { ModalStyles } from '../../styles';
import { useTranslation } from 'react-i18next';
import { Icons } from '../icons';
import ImageInfoModal from './ImageInfoModal';

const ReceiptModalHeader = ({ onClose, setShowInfo }) => {
  const { t } = useTranslation();
  return (
    <>
      <Icons
        onPress={onClose}
        style={modalStyles.headerButtons}
        name={'arrow-left-light'}
        color={'#454d66'}
        size={25}
      />
      <Text style={modalStyles.modalTitle}>{t('Check quality')}</Text>
      <Icons
        onPress={() => setShowInfo(true)}
        style={modalStyles.headerButtons}
        name={'question-mark-circle-light'}
        color={'#454d66'}
        size={25}
      />
    </>
  );
};

const ReceiptImageModal = ({
  receipt,
  image,
  visible,
  onClose,
  buttonText = '',
  onNext,
}) => {
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleBtnClick = async () => {
    //upload to remote and return data;
    try {
      setLoading(true);
      const uploadResult = await receiptService.uploadReceiptImage({
        filename: image?.assets?.[0]?.fileName,
        base64: image?.assets?.[0]?.base64,
      });
      onNext(uploadResult);
      setLoading(false);
    } catch (error) {
      Alert(error.message);
      setLoading(false);
    }
  };
  return (
    <ModalComponent
      headerComponent={
        <ReceiptModalHeader setShowInfo={setShowInfo} onClose={onClose} />
      }
      visible={visible}
      onClose={onClose}
      contentStyle={{ paddingHorizontal: 0 }}>
      {!!receipt && (
        <>
          {loading && <AppActivityIndicator isLoading={loading} size="large" />}
          {!loading && (
            <View style={{ flex: 1, gap: 10 }}>
              <Image
                style={{ flex: 1, width: '100%', height: '100%' }}
                src={receipt?.image}
              />

              <View style={{ padding: 25 }}>
                <TouchableOpacity
                  onPress={handleBtnClick}
                  style={{ ...modalStyles.furtherBtn }}>
                  <Text style={modalStyles.btnText}>{buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
      <ImageInfoModal visible={showInfo} onClose={() => setShowInfo(false)} />
    </ModalComponent>
  );
};

const ReceiptModal = ({ receipt, visible, onClose, onAction }) => {
  const { t } = useTranslation();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [image, setImage] = useState(null);
  const [fid, setFid] = useState(null);
  const [amount, setAmount] = useState('');
  const { userDetails } = useAuth();
  const [imageVisible, setImageVisible] = useState(false);
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [imagePreviewModalButtonText, setImagePreviewModalButtonText] =
    useState('Use Photo');
  const handleFurther = () => {
    const germanNumberPattern =
      /^(\d{1,3}(\.\d{3})*,\d{0,2}|\d{1,3}(\.\d{3})*|\d*)$/;
    // Validate and set value if it matches German numeric format
    if (germanNumberPattern.test(amount)) {
      setError('');
      setShowPhotoModal(true);
    }
  };
  const ImageLibConfig = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: true,
  };

  const handleOpenCamera = async () => {
    try {
      const result = await launchCamera({
        ...ImageLibConfig,
        cameraType: 'back',
      });
      if (!result.didCancel) {
        setImage(result);
        console.log(result);
        onAction?.(amount);
        setImageVisible(true);
        setImagePreviewModalButtonText('Foto verwenden');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOpenGallery = async () => {
    try {
      const result = await launchImageLibrary(ImageLibConfig);
      if (!result?.assets?.length) {
        return;
      }
      setShowPhotoModal(false);
      setTimeout(() => {
        setImage(result);
        onAction?.(amount);
        setImagePreviewModalButtonText('Choose Photo');
        setImageVisible(true);
      }, 500);
    } catch (err) {
      alert(err.message);
    }
  };

  const onNext = (step, data = null) => {
    setImageVisible(false);
    if (step === 'preview') {
      setTimeout(() => {
        setShowOverviewModal(true);
      }, 100);
      if (data) {
        setFid(data?.fid);
      }
    }
  };

  const validateChange = (value: string) => {
    const germanNumberPattern =
      /^(\d{1,3}(\.\d{3})*,\d{0,2}|\d{1,3}(\.\d{3})*|\d*)$/;

    if (germanNumberPattern.test(value)) {
      setError('');
    } else {
      setError(t('Invalid Number'));
    }
  };

  useEffect(() => {
    if (receipt?.amount) {
      // Format the incoming amount as a German-style decimal
      const formattedAmount = formatAmount(receipt.amount);
      setAmount(formattedAmount);
    }
  }, [receipt?.amount]);

  // Helper function to format the amount into German decimal style
  const formatAmount = (amount: any): string => {
    const parsedAmount = parseFloat(amount);

    // If parsedAmount is not a valid number, return '0,00'
    if (isNaN(parsedAmount)) {
      return '0,00';
    }

    // Format the number into German decimal style
    return parsedAmount
      .toFixed(2)                // Ensure two decimal places
      .replace('.', ',')         // Replace dot with comma for decimal point
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); // Add thousands separator
  };

  return (
    <ModalComponent
      // transparent={true}
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
          <Text style={modalStyles.modalTitle}>{t('Amount')}</Text>
          {/* <Icons
            style={modalStyles.headerButtons}
            name={'question-mark-circle-light'}
            color={'#454d66'}
            size={25}
          /> */}
        </>
      }>
      {!!receipt && (
        <View style={modalStyles.container}>
          <View style={modalStyles.receiptDetails}>
            <ReceiptCard receipt={receipt} />
            <View>
              <Text style={modalStyles.title}>
                {t('Amount of the receipt')} ({t('VAT included')}.)
              </Text>
            </View>
            <View>
              <TextInput
                style={modalStyles.amount}
                placeholder="0,00 €"
                placeholderTextColor={'#454d66'}
                value={amount ? `${amount}€` : ''}
                onChangeText={(value) => {
                  try {
                    // Remove any non-numeric character except comma
                    value = value.replace(/[^0-9,]/g, '');

                    // If the user removes the comma, handle the update
                    if (!value.includes(',')) {
                      // Remove any non-numeric characters
                      value = value.replace(/[^0-9]/g, '');

                      // Divide the integer by 100 when comma is removed
                      if (value) {
                        let integerValue = parseInt(value, 10);
                        value = (integerValue / 100).toFixed(2).replace('.', ',');
                      } else {
                        value = '0,00'; // Default to zero if no valid input
                      }
                    } else {
                      let parts = value.split(',');

                      // If there are more than two parts, trim extra parts
                      if (parts.length > 2) {
                        value = parts[0] + ',' + parts.slice(1).join('');
                      }

                      // Ensure decimal part doesn't exceed two digits
                      if (parts.length === 1) {
                        value = parts[0] + ',00'; // Ensure there's a decimal part if it's missing
                      } else if (parts.length === 2) {
                        // Limit decimal part to two digits
                        value = parts[0] + ',' + parts[1].slice(0, 2);
                      }
                    }

                    // Handle the number itself (parse the integer part and format it)
                    let number = parseFloat(value.replace('.', '').replace(',', '.') || '0');

                    if (!isNaN(number)) {
                      // Format the number with German format (thousands separator)
                      value = formatAmount(number);
                      validateChange(value); // Validate the formatted value
                    } else {
                      value = '0,00'; // Default to zero if invalid number
                    }

                    setAmount(value); // Update the state with the new value
                  } catch (err) {
                    console.error(err); // Log any errors for debugging
                  }
                }}
              />

              {error && <Text style={modalStyles.amountError}>{error}</Text>}
            </View>
            <View style={modalStyles.amountsSection}>
              <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  {t('Refunded amount')}:
                </Text>
                <Text style={modalStyles.refundAmount}>
                  {amount ? `${amount} €` : '0,00 €'}
                </Text>
              </View>
              <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  {t('Current account balance')}
                </Text>
                <Text style={modalStyles.currentBalance}>
                  {userDetails?.field_balance_current?.und[0]?.value} €
                </Text>
              </View>
            </View>
          </View>
          <View style={modalStyles.btnContainer}>
            <TouchableOpacity
              onPress={handleFurther}
              style={modalStyles.furtherBtn}>
              <Text style={modalStyles.btnText}>{t('Further')}</Text>
            </TouchableOpacity>

            <Modal
              visible={showPhotoModal}
              transparent={true}
              // onDismiss={() => setImageVisible(false)}
              animationType="slide">
              <Pressable
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)', flex: 1 }}
                onPress={() => setShowPhotoModal(false)}>
                <TouchableWithoutFeedback>
                  <View style={modalStyles.photoBtnContainer}>
                    <TouchableOpacity
                      style={modalStyles.takeOrUploadPhotoBtn}
                      onPress={() => {
                        setShowPhotoModal(false);
                        handleOpenCamera();
                      }}>
                      <Text style={modalStyles.photoBtnTitle}>
                        {t('Take a photo of the receipt')}
                      </Text>
                      <Icons name="camera-light" size={25} color={'#454d66'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={modalStyles.takeOrUploadPhotoBtn}
                      onPress={handleOpenGallery}>
                      <Text style={modalStyles.photoBtnTitle}>
                        {t('Upload receipt')}
                      </Text>
                      <Icons name="upload-light" size={25} color={'#454d66'} />
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </Pressable>
            </Modal>

            <ReceiptImageModal
              visible={imageVisible}
              receipt={{ ...receipt, image: image?.assets?.[0]?.uri }}
              onClose={() => setImageVisible(false)}
              buttonText={imagePreviewModalButtonText}
              image={image}
              onNext={data => {
                onNext('preview', data);
              }}
            />

            <ImageInfoModal
              visible={showInfo}
              onClose={() => {
                handleOpenCamera();
                setShowInfo(false);
              }}
            />

            <ReceiptOverviewModal
              receipt={{
                ...receipt,
                amount,
                fid,
                title: generateReceiptTitle(),
                image: image?.assets?.[0]?.uri,
              }}
              visible={showOverviewModal}
              handleOpenCamera={handleOpenCamera}
              onClose={() => {
                setShowOverviewModal(false);
                setTimeout(() => onClose(), 100);
              }}

            />
          </View>
        </View>
      )}
    </ModalComponent>
  );
};

export default ReceiptModal;

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
    justifyContent: 'space-between',
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
  },

  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  title: {
    fontSize: 18,
    color: '#454d66',
    fontFamily: 'OpenSans-Bold',
  },
  amount: {
    width: '100%',
    color: '#454d66',
    fontSize: 48,
    fontFamily: 'OpenSans-Bold',
  },
  amountError: {
    color: 'red',
    fontFamily: 'OpenSans-Regular',
  },
  amountsSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  amountInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    fontFamily: 'OpenSans-Regular',
  },
  amountInfoText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  refundAmount: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: 'green',
  },
  currentBalance: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
  btnContainer: {
    paddingBottom: 25,
  },
  furtherBtn: {
    backgroundColor: '#454d66',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 32,
  },
  btnText: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  photoBtnContainer: {
    backgroundColor: '#f8f6f4',
    height: 270,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 35,
    position: 'absolute',
    bottom: 0,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },
  takeOrUploadPhotoBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 26,
    paddingVertical: 32,
  },
  photoBtnTitle: {
    textAlign: 'center',
    color: '#454d66',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  ...ModalStyles,
});
