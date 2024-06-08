import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, View, StyleSheet} from 'react-native'
import FieldLabel from "../ui/fieldLabel";
import FieldError from "../ui/fieldError";
import Input from "../ui/input";
import ServiceCategory from "../modules/receipt/serviceCategory";
import NextButton from "../ui/nextButton";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ServiceCategoryModal from "../modals/catServiceModal";
import { ReceiptService } from "../../services";

interface AddReceiptFormProps {
    onClose: ()=>void;
}

const serviceCatSchema = z.object({
    serviceProviderName: z.string(),
    postCode: z.string(),
    serviceCategory: z.array(z.string()),
  });
  
  type ServiceCategorySchema = z.infer<typeof serviceCatSchema>;

const AddReceiptForm = ({ onClose }: AddReceiptFormProps)=>{
    const [showModal, setShowModal] = useState(false);
    const [serviceCategories, setServiceCategories] = useState([]);
    const {
        formState: {errors},
        handleSubmit,
        control,
        setError,
        setValue,
        watch
    } = useForm<ServiceCategorySchema>({
        resolver: zodResolver(serviceCatSchema),
        mode: 'all',
        reValidateMode: 'onChange'
      });
    const closeModal = ()=>{
        setShowModal(false);
    }
   const handleCreateReceipt = async (values: ServiceCategorySchema)=>{
        await ReceiptService.addReceipt(values);
        onClose?.();
    }
    useEffect(()=>{
        if(serviceCategories.length){
            setError("serviceCategory", null);
            const values = serviceCategories?.map(cat => cat.title);
            setValue("serviceCategory", values);
        }
    }, [serviceCategories])
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <SafeAreaView style={{height: '100%'}}>
                <View style={formStyle.container}>
                    <View>
                    <Controller
                        name="serviceProviderName"
                        control={control}
                        render={({field}) => (
                            <FieldLabel label={'Name des Dienstleisters'}>
                                <FieldError error={errors.serviceProviderName?.message}>
                                        <Input 
                                            inputType="text"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            error={!!errors.serviceProviderName?.message}
                                        />
                                </FieldError>
                            </FieldLabel>
                        )}
                    />

                    <Controller
                        name="postCode"
                        control={control}
                        render={({field}) => (
                            <FieldLabel label={'PLZ des Dienstleisters'}>
                                <FieldError error={errors.postCode?.message}>
                                        <Input 
                                            inputType="text"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            error={!!errors.postCode?.message}
                                        />
                                </FieldError>
                            </FieldLabel>
                        )}
                    />

                        <ServiceCategory error={errors?.serviceCategory?.message} serviceCategories={serviceCategories} onPress={()=>setShowModal(true)} />
                    </View>

                    <NextButton title={'Weiter'} onPress={handleSubmit(handleCreateReceipt)} />
                </View>
                <ServiceCategoryModal 
                    visible={showModal}
                    onClose={closeModal}
                    onAction={()=>console.log("modal action")}
                    setServiceCategories={setServiceCategories}
                    services={serviceCategories}
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