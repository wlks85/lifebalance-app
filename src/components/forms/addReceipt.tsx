import React, { useState } from "react";
import { ScrollView, SafeAreaView, View, StyleSheet} from 'react-native'
import FieldLabel from "../ui/fieldLabel";
import FieldError from "../ui/fieldError";
import Input from "../ui/input";
import { TextInput } from "react-native-gesture-handler";
import ServiceCategory from "../modules/receipt/serviceCategory";
import NextButton from "../ui/nextButton";
import CategoryServiceModal from "../modals/catServiceModal";

const AddReceiptForm = ()=>{
    const [showModal, setShowModal] = useState(false);
    const [services, setServices] = useState([]);
    const onClose = ()=>{
        setShowModal(false);
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <SafeAreaView style={{height: '100%'}}>
                <View style={formStyle.container}>
                    <View>
                        <FieldLabel label={'Name des Dienstleisters'}>
                        <FieldError error={''}>
                                <Input inputType="text" />
                        </FieldError>
                        </FieldLabel>

                        <FieldLabel label={'PLZ des Dienstleisters'}>
                        <FieldError error={''}>
                                <Input inputType="text" />
                        </FieldError>
                        </FieldLabel>

                        <ServiceCategory services={services} onPress={()=>setShowModal(true)} />
                    </View>

                    <NextButton title={'Weiter'} onPress={()=>console.log("button pressed")} />
                </View>
                <CategoryServiceModal 
                    visible={showModal}
                    onClose={onClose}
                    onAction={()=>console.log("modal action")}
                    setServices={setServices}
                    services={services}
                />
            </SafeAreaView>
         </ScrollView> 
    )
}

const formStyle = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
    }
})

export default AddReceiptForm;