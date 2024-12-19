/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
//@ts-nocheck
import React, {useState, useEffect} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-gesture-handler';
import ReceiptOverviewModal from './ReceiptOverviewModal';
import ReceiptCard from '../modules/receipt/ReceiptCard';
import receiptService from '../../services/ReceiptService';
import {useAuth} from '../../providers/auth-provider';
import {generateReceiptTitle} from '../../utils';
import AppActivityIndicator from '../AppActivityIndicator';
import {ModalStyles} from '../../styles';
import {useTranslation} from 'react-i18next';
import {Icons} from '../icons';
import ImageInfoModal from './ImageInfoModal';

const ReceiptModalHeader = ({onClose, setShowInfo}) => {
  const {t} = useTranslation();
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
      contentStyle={{paddingHorizontal: 0}}>
      {!!receipt && (
        <>
          {loading && <AppActivityIndicator isLoading={loading} size="large" />}
          {!loading && (
            <View style={{flex: 1, gap: 10}}>
              <Image
                style={{flex: 1, width: '100%', height: '100%'}}
                src={receipt?.image}
              />

              <View style={{padding: 25}}>
                <TouchableOpacity
                  onPress={handleBtnClick}
                  style={{...modalStyles.furtherBtn}}>
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

const ReceiptModal = ({receipt, visible, onClose, onAction}) => {
  const {t} = useTranslation();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [image, setImage] = useState(null);
  const [fid, setFid] = useState(null);
  const [amount, setAmount] = useState('0,00');
  const {userDetails} = useAuth();
  const [imageVisible, setImageVisible] = useState(false);
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [imagePreviewModalButtonText, setImagePreviewModalButtonText] =
    useState('Foto verwenden');
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
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 1,
    includeBase64: true,
    saveToPhotos: true,
    cameraType: 'back',
    language: 'de',
  };

  const handleOpenCamera = async () => {
    try {
      const result = await launchCamera({
        ...ImageLibConfig,
      });
      if (!result.didCancel) {
        setImage(result);
        onAction?.(amount);
        setImageVisible(true);
        setImagePreviewModalButtonText('Foto verwenden');
      }
      return result;
    } catch (err) {
      console.log('Camera Error', err.message);
      try {
        const imageLibraryResult = await launchImageLibrary(ImageLibConfig);
        if (!imageLibraryResult.didCancel) {
          setImage(imageLibraryResult);
          onAction?.(amount);
          setImageVisible(true);
          setImagePreviewModalButtonText('Foto verwenden');
        }
        return imageLibraryResult;
      } catch (libraryError) {
        alert('Failed to pick an image or open the camera');
        return null;
      }
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
        setImagePreviewModalButtonText('Foto wählen');
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

  const validateChange = value => {
    const germanNumberPattern =
      /^(\d{1,3}(\.\d{3})*,\d{0,2}|\d{1,3}(\.\d{3})*|\d*)$/;

    if (germanNumberPattern.test(value)) {
      setError('');
    } else {
      setError('Invalid Number');
    }
  };

  useEffect(() => {
    if (receipt?.amount) {
      const formattedAmount = formatAmount(receipt.amount);
      setAmount(formattedAmount);
    }
  }, [receipt?.amount]);

  const formatAmount = amount => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return '0,00';
    }

    return parsedAmount
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
                keyboardType="numeric"
                value={amount ? `${amount} €` : ''} // Display amount with € symbol
                onChangeText={value => {
                  // Allow only numbers and one comma for the decimal separator
                  let sanitizedValue = value.replace(/[^0-9,\.]/g, ''); // Allow only digits, commas, and dots

                  // Handle case where there's more than one comma
                  const commas = sanitizedValue.split(',').length - 1;
                  if (commas > 1) {
                    // Remove the last comma entered by the user if there are multiple commas
                    sanitizedValue = sanitizedValue.substring(
                      0,
                      sanitizedValue.lastIndexOf(','),
                    );
                  }

                  // Update the amount with the sanitized value
                  setAmount(sanitizedValue);
                }}
                onBlur={() => {
                  try {
                    // Remove the € symbol and extra spaces if any
                    let sanitizedAmount = amount.replace(' €', '').trim();

                    // Replace the comma with a period to handle the German-style decimal separator
                    let parsedAmount =
                      sanitizedAmount.replace(/\./g, '').replace(',', '.') ||
                      '0'; // Convert commas to dots for float parsing

                    parsedAmount = parseFloat(parsedAmount);

                    // Check if the parsed amount is valid and greater than zero
                    if (isNaN(parsedAmount) || parsedAmount <= 0) {
                      setError('Invalid');
                      setAmount('0,00');
                    } else {
                      const formattedValue = formatAmount(parsedAmount); // Format the amount again if valid
                      validateChange(formattedValue);
                      setAmount(formattedValue);
                      setError(''); // Clear error if the amount is valid
                    }
                  } catch (err) {
                    console.error(err);
                    setAmount('0,00');
                    setError('Invalid');
                  }
                }}
              />

              {error && <Text style={modalStyles.amountError}>{error}</Text>}
            </View>
            <View style={modalStyles.amountsSection}>
              {/* <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  {t('Refunded amount')}:
                </Text>
                <Text style={modalStyles.refundAmount}>
                  {amount ? `${amount} €` : '0,00 €'}
                </Text>
              </View> */}
              <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  {t('Current account balance')}:
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
              style={[
                modalStyles.furtherBtn,
                {opacity: amount === '0,00' || error ? 0.5 : 1},
              ]}
              disabled={amount === '0,00' || !!error}>
              <Text style={modalStyles.btnText}>{t('Further')}</Text>
            </TouchableOpacity>

            <Modal
              visible={showPhotoModal}
              transparent={true}
              // onDismiss={() => setImageVisible(false)}
              animationType="slide">
              <Pressable
                style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', flex: 1}}
                onPress={() => setShowPhotoModal(false)}>
                <TouchableWithoutFeedback>
                  <View style={modalStyles.photoBtnContainer}>
                    <TouchableOpacity
                      style={modalStyles.takeOrUploadPhotoBtn}
                      onPress={async () => {
                        const result = await handleOpenCamera();
                        setShowPhotoModal(false);
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
              receipt={{...receipt, image: image?.assets?.[0]?.uri}}
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
    borderRadius: 0,
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
    textAlign: 'center',
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
