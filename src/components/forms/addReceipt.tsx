import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, View, StyleSheet} from 'react-native'
import FieldLabel from "../ui/FieldLabel";
import FieldError from "../ui/FieldError";
import Input from "../ui/Input";
import ServiceCategory from "../modules/receipt/ServiceCategory";
import NextButton from "../ui/NextButton";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ServiceCategoryModal from "../modals/ServiceCatModal";
import { ReceiptService } from "../../services";
import ReceiptOverviewModal from "../modals/ReceiptOverviewModal";
import ReceiptModal from "../modals/ReceiptModal";
import { IReceipt } from "../modules/receipt/ReceiptItem";

interface AddReceiptFormProps {
    onClose: ()=>void;
    defaultValue: IReceipt;
    onSubmit?: (values: IReceipt)=>void;
}

const serviceCatSchema = z.object({
    name: z.string(),
    postCode: z.string(),
    serviceCategory: z.array(z.string()),
  });
  
  type ServiceCategorySchema = z.infer<typeof serviceCatSchema>;

const AddReceiptForm = ({ onClose, defaultValue, onSubmit }: AddReceiptFormProps)=>{
    const [showModal, setShowModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [serviceCategories, setServiceCategories] = useState([]);
    const [receipt, setReceipt] = useState<IReceipt | null>(null);
    const {
        formState: {errors},
        handleSubmit,
        control,
        setError,
        setValue,
        watch
    } = useForm<ServiceCategorySchema>({
        resolver: zodResolver(serviceCatSchema),
        defaultValues: defaultValue ? {
            name: defaultValue?.company.name,
            postCode: String(defaultValue?.company?.postCode)
        } : {},
        mode: 'all',
        reValidateMode: 'onChange'
      });
    const closeModal = ()=>{
        setShowModal(false);
    }

    const onReceiptModalClose = ()=>{
        setShowReceiptModal(false);
    }

   const handleCreateReceipt = async (values: ServiceCategorySchema)=>{
        await ReceiptService.addReceipt(values);
        setReceipt({company: values});
        setShowReceiptModal(true);
        // onClose?.();
    }

    const handleUpdateService = async(values: ServiceCategorySchema)=>{
        onSubmit?.({company: values});
        onClose?.();
    }
    useEffect(()=>{
        if(serviceCategories.length){
            setError("serviceCategory", null);
            const values = serviceCategories?.map(cat => cat.title);
            setValue("serviceCategory", values);
        }
    }, [serviceCategories])
    console.log({errors})
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <SafeAreaView style={{height: '100%'}}>
                <View style={formStyle.container}>
                    <View>
                    <Controller
                        name="name"
                        control={control}
                        render={({field}) => (
                            <FieldLabel label={'Name des Dienstleisters'}>
                                <FieldError error={errors.name?.message}>
                                        <Input 
                                            inputType="text"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            error={!!errors.name?.message}
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

                    { !defaultValue ? <NextButton title={'Weiter'} onPress={handleSubmit(handleCreateReceipt)} />
                    :
                    <NextButton title={'Übernehmen'} onPress={handleSubmit(handleUpdateService)} />}
                </View>
                <ServiceCategoryModal 
                    visible={showModal}
                    onClose={closeModal}
                    onAction={()=>console.log("modal action")}
                    setServiceCategories={setServiceCategories}
                    services={serviceCategories}
                />
                {/* <ReceiptOverviewModal 
                    receipt={receipt}
                    visible={showOverviewModal}
                    onClose={()=>setShowOverviewModal(false)}
                    onAction={()=>console.log()}
                /> */}
                <ReceiptModal 
                    visible={showReceiptModal}
                    onClose={onReceiptModalClose}
                    onAction={()=>console.log("receipt modal action")}
                    receipt={{
                        amount: '00',
                        amount_paid: '00',
                        company: {
                            name: watch("name") || 'Default Name',
                            logo: 'GF',
                            postCode: watch("postCode")
                        }
                    }}
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