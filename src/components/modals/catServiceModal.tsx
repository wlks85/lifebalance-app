//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Pressable, TouchableOpacity } from 'react-native';
import ModalComponent from '../modal';
import { ScrollView } from 'react-native-gesture-handler';
import NextButton from '../ui/nextButton';
import { ReceiptService } from '../../services';

interface IServiceCategory {
  id: number; 
  title: string
}

interface ServiceCategoryModalProps {
    visible: boolean;
    onClose: ()=>void;
    onAction?: ()=>void;
    setServiceCategories: Dispatch<SetStateAction<any[]>>;
    services: IServiceCategory[];
}

const ServiceCategoryModal = ({ visible, onClose, onAction, setServiceCategories, services  }: ServiceCategoryModalProps) => {
    const [categories, setCategories] = useState([]);


    const handleAddService = (srvs)=>{
        if(services?.find(service => service.id === srvs.id)){
            const restService = services.filter(service => service.id !== srvs.id);
            setServiceCategories(restService);
        }else {
            setServiceCategories( preValue => ([...preValue, srvs]))
        }
    }
    useEffect(()=>{
        ReceiptService.getServiceCategories()
        .then((cats)=> {
          setCategories(cats);
        })
      }, []);
    return (
        <ModalComponent
          onClose={onClose}
          visible={visible}
          headerComponent={<View style={modalStyles.headerContainer}>
            <View style={modalStyles.modalHeader}><Text onPress={onClose} style={modalStyles.modalCloseButton}>x</Text></View>
            <Text style={modalStyles.modalTitle}>Kategorie wählen</Text>
        </View>}
        >
            <View style={modalStyles.container}>
                <View style={{flex: 2.5/3, marginHorizontal: -25,}}>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingHorizontal: 25,paddingBottom: 10}}>
                            <View style={modalStyles.catContainer}>
                                {
                                    categories?.map((cat, index) => (
                                        <Pressable 
                                            key={index} 
                                            style={[
                                                modalStyles.categoryCard,
                                            ]}
                                            onPress={()=>handleAddService(cat)}
                                        >
                                            <Text style={[modalStyles.catTitle, services?.find(ser => ser.id === cat.id) && {color: 'green'}]}>{cat.title}</Text>
                                        </Pressable>
                                    ))
                                }
                            </View>
                </ScrollView>
                </View>
                <View style={{backgroundColor: '#ffffff', flex: .5/3, marginHorizontal: -25}}>
                    <View style={modalStyles.applyBtn}>
                        <NextButton buttonStyles={{backgroundColor: '#309975'}} title={'Auswahl anwenden'} onPress={onClose} />
                    </View>
                </View>
            </View>
        </ModalComponent>
      )
};

export default ServiceCategoryModal 

const modalStyles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // gap: 10,
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
    width: '100%',
    fontSize: 24,
    color: '#454d66',
    fontWeight: '700',
    textAlign: 'center'
  },
  catContainer: {
    display: 'flex',
    gap: 1
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    height: 54,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  catTitle: {
    fontSize: 15,
    color: '#1e4251',
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif'
  },
  applyBtn: {
    paddingHorizontal: 25,
    paddingTop: 25
  }
  
})