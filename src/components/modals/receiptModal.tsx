//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Pressable, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import ModalComponent from '../Modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ReceiptItem from '../modules/receipt/ReceiptItem';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { TextInput } from 'react-native-gesture-handler';
import ReceiptOverviewModal from './ReceiptOverviewModal';
import { useAxios } from '../../providers/axios-provider';
// import CameraModule from '../modules/camera';


const ReceiptModal = ({ receipt, visible, onClose,onAction }) => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [image, setImage] = useState(null);
  const [receiptDetails, setReceiptDetails] = useState({});
  const axios = useAxios();
  const handleFurther = ()=>{
    setShowPhotoModal(true);
  }

  const getSingleReceipt = async ()=>{
    try{
      const result = await axios.get(`https://w3.lbplus.de/lbp/mobile-app/rest-service/v1.0/ep/node/${receipt?.nid}.json`);
      // console.log(result?.data?.title)
      // console.log({result: result?.data?.field_amount_gross?.und[0]?.value})
      const transformedData = {
        title: result?.data?.title || 'default title',
        amount: result?.data?.field_amount_gross?.und[0]?.value ?? 0
      }
      console.log(transformedData);
      // setReceiptDetails(transformedData);
    }catch(err){
      console.log(err);
    }
    
  }

  const handleOpenCamera = async ()=>{
    const result = await launchCamera({mediaType: 'photo', quality: 1, cameraType: 'back'});
    console.log("photo from camera: ", JSON.stringify(result));
    setImage(result);
  }

  const handleOpenGallery = async ()=>{
    const result = await launchImageLibrary({mediaType: 'photo', quality: 1});
    console.log("photo from gallery: ", JSON.stringify(result));
    setImage(result);
  }
  // console.log("This is receipt from overview ==> ", receipt);
  useEffect(()=>{
    if(image){
      setShowOverviewModal(true);
    }
  }, [image])

  useEffect(()=>{
    getSingleReceipt();
  }, [receipt]);
  console.log({receiptDetails});
  return (
    <ModalComponent
      onClose={onClose}
      visible={visible}
      headerComponent={<View style={modalStyles.headerContainer}>
        <View style={modalStyles.modalHeader}><Text onPress={onClose} style={modalStyles.modalCloseButton}>x</Text></View>
        <Text style={modalStyles.modalTitle}>Gezahlter Betrag</Text>
        <View style={modalStyles.modalHeader}>
            <Text><Icon name='question' size={20}/></Text>
        </View>
    </View>}
    >
      {receipt && (
      <View style={modalStyles.container}>
        <View style={modalStyles.receiptDetails}>
          <ReceiptItem receipt={receipt} disabled={true} />
          <View>
            <Text style={modalStyles.title}>Betrag des Belegs (inkl. MwSt.)</Text>
          </View>
          <View>
            <TextInput 
            style={modalStyles.amount} 
            placeholder='0,00 €' 
            placeholderTextColor={"#454d66"}
            defaultValue={receiptDetails?.amount && receiptDetails?.amount }
            />
          </View>
          <View style={modalStyles.amountsSection}>
            <View style={modalStyles.amountInfo}>
              <Text style={modalStyles.amountInfoText}>Erstatteter Betrag:</Text>
              <Text style={modalStyles.refundAmount}>{receipt.amount_paid} €</Text>
            </View>
            <View style={modalStyles.amountInfo}>
              <Text style={modalStyles.amountInfoText}>Aktueller Kontostand:</Text>
              <Text style={modalStyles.currentBalance}>{receipt.amount} €</Text>
            </View>
          </View>
        </View>
        <View style={modalStyles.btnContainer}>
        <TouchableOpacity onPress={handleFurther} style={modalStyles.furtherBtn}>
          <Text style={modalStyles.btnText}>Weiter</Text>
        </TouchableOpacity>

        <Modal visible={showPhotoModal} transparent={true} animationType='slide'>
          <Pressable style={{backgroundColor: 'rgba(0, 0, 0, 0.15)', flex: 1}} onPress={()=>setShowPhotoModal(false)}>
            <TouchableWithoutFeedback>
              <View style={modalStyles.photoBtnContainer}>
                <TouchableOpacity style={modalStyles.takeOrUploadPhotoBtn} onPress={handleOpenCamera}>
                  <Text style={modalStyles.photoBtnTitle}>Beleg fotografieren</Text>
                  <Icon name="camera" size={25} />
                </TouchableOpacity>
                <TouchableOpacity style={modalStyles.takeOrUploadPhotoBtn} onPress={handleOpenGallery}>
                  <Text style={modalStyles.photoBtnTitle}>Beleg hochladen</Text>
                  <IconAnt name='upload' size={25} />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>

        <ReceiptOverviewModal 
                    receipt={receipt}
                    visible={showOverviewModal}
                    onClose={()=>setShowOverviewModal(false)}
                    onAction={()=>console.log()}
                />
        </View>
      </View>
    )}
    </ModalComponent>
  )
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
        alignItems: 'center'
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
    fontWeight: '700'
  },

  receiptDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#454d66',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif'
  },
  amount: {
    width: '100%',
    color: '#454d66',
    fontSize: 48,
    fontWeight: '700',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif'    
  },
  amountsSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 5
  },
  amountInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif'
  },
  amountInfoText: {
    fontSize: 16,
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif'
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
    paddingBottom: 25
  },
  furtherBtn: {
    backgroundColor: '#454d66',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 32
  },
  btnText: {
    color: 'white',
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontSize: 18,
    fontWeight: '700'
  },
  photoBtnContainer:{
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
    gap: 16
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
    fontWeight: '700'
  }
})