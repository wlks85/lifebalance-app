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
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-gesture-handler';
import ReceiptOverviewModal from './ReceiptOverviewModal';
import ReceiptCard from '../modules/receipt/ReceiptCard';
import receiptService from '../../services/ReceiptService';
import {useAuth} from '../../providers/auth-provider';
import {generateReceiptTitle} from '../../utils';
import AppActivityIndicator from '../AppActivityIndicator';
import {ModalStyles} from '../../styles';

const ReceiptModalHeader = ({onClose}) => {
  return (
    <>
      <IconAnt
        onPress={onClose}
        style={modalStyles.headerButtons}
        name={'arrowleft'}
        color={'#454d66'}
        size={25}
      />
      <Text style={modalStyles.modalTitle}>Qualität überprüfen</Text>
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

  const handleBtnClick = async () => {
    //upload to remote and return data;
    try {
      setLoading(true);
      const uploadResult = await receiptService.uploadReceiptImage({
        filename: image?.assets[0]?.fileName,
        base64: image?.assets[0]?.base64,
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
      headerComponent={<ReceiptModalHeader onClose={onClose} />}
      visible={visible}
      onClose={onClose}
      contentStyle={{paddingHorizontal: 0}}>
      {receipt && (
        <>
          {loading && <AppActivityIndicator isLoading={loading} size="large" />}
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
        </>
      )}
    </ModalComponent>
  );
};

const ReceiptModal = ({receipt, visible, onClose, onAction}) => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [image, setImage] = useState(null);
  const [fid, setFid] = useState(null);
  const [amount, setAmount] = useState('0,00 €');
  const {userDetails} = useAuth();
  const [imageVisible, setImageVisible] = useState(false);
  const [imagePreviewModalButtonText, setImagePreviewModalButtonText] =
    useState('Use Photo');
  const handleFurther = () => {
    setShowPhotoModal(true);
  };
  const ImageLibConfig = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: true,
  };

  const handleOpenCamera = async () => {
    const result = await launchCamera({...ImageLibConfig, cameraType: 'back'});
    setImage(result);
    onAction?.(amount);
    setImageVisible(true);
    setImagePreviewModalButtonText('Use Photo');
  };

  const handleOpenGallery = async () => {
    try {
      const result = await launchImageLibrary(ImageLibConfig);
      if (!result?.assets?.length) {
        return;
      }
      setImage(result);
      onAction?.(amount);
      // const uploadResult = await receiptService.uploadReceiptImage({
      //   filename: result?.assets[0]?.fileName,
      //   base64: result?.assets[0]?.base64,
      // });
      // setFid(uploadResult?.fid); // TO-DO: change it to actual property
      // setShowOverviewModal(true);
      setImagePreviewModalButtonText('Choose Photo');
      setImageVisible(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const onNext = (step, data = null) => {
    if (step === 'preview') {
      setShowOverviewModal(true);
      if (data) {
        setFid(data?.fid);
      }
    }
  };

  useEffect(() => {
    setAmount(receipt?.amount ? String(receipt?.amount) : '');
  }, [receipt?.amount]);
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={
        <>
          <IconAnt
            onPress={onClose}
            style={modalStyles.headerButtons}
            name={'arrowleft'}
            color={'#454d66'}
            size={25}
          />
          <Text style={modalStyles.modalTitle}>Gezahlter Betrag</Text>
        </>
      }>
      {receipt && (
        <View style={modalStyles.container}>
          <View style={modalStyles.receiptDetails}>
            <ReceiptCard receipt={receipt} />
            <View>
              <Text style={modalStyles.title}>
                Betrag des Belegs (inkl. MwSt.)
              </Text>
            </View>
            <View>
              <TextInput
                style={modalStyles.amount}
                placeholder="0,00 €"
                placeholderTextColor={'#454d66'}
                value={amount ? amount : ''}
                onChangeText={value => setAmount(value)}
                keyboardType="numeric"
              />
            </View>
            <View style={modalStyles.amountsSection}>
              <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  Erstatteter Betrag:
                </Text>
                <Text style={modalStyles.refundAmount}>
                  {amount ? `${amount} €` : '0,00 €'}
                </Text>
              </View>
              <View style={modalStyles.amountInfo}>
                <Text style={modalStyles.amountInfoText}>
                  Aktueller Kontostand:
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
              <Text style={modalStyles.btnText}>Weiter</Text>
            </TouchableOpacity>

            <Modal
              visible={showPhotoModal}
              transparent={true}
              onDismiss={() => setImageVisible(false)}
              animationType="slide">
              <Pressable
                style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', flex: 1}}
                onPress={() => setShowPhotoModal(false)}>
                <TouchableWithoutFeedback>
                  <View style={modalStyles.photoBtnContainer}>
                    <TouchableOpacity
                      style={modalStyles.takeOrUploadPhotoBtn}
                      onPress={handleOpenCamera}>
                      <Text style={modalStyles.photoBtnTitle}>
                        Beleg fotografieren
                      </Text>
                      <Icon name="camera" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={modalStyles.takeOrUploadPhotoBtn}
                      onPress={handleOpenGallery}>
                      <Text style={modalStyles.photoBtnTitle}>
                        Beleg hochladen
                      </Text>
                      <IconAnt name="upload" size={25} />
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </Pressable>
            </Modal>

            <ReceiptImageModal
              visible={imageVisible}
              receipt={{...receipt, image: image?.assets[0]?.uri}}
              onClose={() => setImageVisible(false)}
              buttonText={imagePreviewModalButtonText}
              image={image}
              onNext={data => {
                onNext('preview', data);
              }}
            />

            <ReceiptOverviewModal
              receipt={{
                ...receipt,
                amount,
                fid,
                title: generateReceiptTitle(),
                image: image?.assets[0]?.uri,
              }}
              visible={showOverviewModal}
              onClose={() => {
                setShowOverviewModal(false);
                onClose();
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
    fontWeight: '700',
    color: '#454d66',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
  },
  amount: {
    width: '100%',
    color: '#454d66',
    fontSize: 48,
    fontWeight: '700',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
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
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
  },
  amountInfoText: {
    fontSize: 16,
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
  },
  refundAmount: {
    fontSize: 18,
    fontFamily: '"OpenSans-Bold", "Open Sans", sans-serif',
    fontWeight: '700',
    color: 'green',
  },
  currentBalance: {
    fontSize: 18,
    fontFamily: '"OpenSans-Bold", "Open Sans", sans-serif',
    fontWeight: '700',
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
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontSize: 18,
    fontWeight: '700',
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
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontWeight: '700',
  },
  ...ModalStyles,
});
