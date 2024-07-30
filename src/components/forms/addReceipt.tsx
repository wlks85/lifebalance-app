/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, View, StyleSheet} from 'react-native';
import FieldLabel from '../ui/FieldLabel';
import FieldError from '../ui/FieldError';
import Input from '../ui/Input';
import ServiceCategory from '../modules/receipt/ServiceCategory';
import NextButton from '../ui/NextButton';
import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import ServiceCategoryModal from '../modals/ServiceCatModal';
import ReceiptModal from '../modals/ReceiptModal';
import {IReceipt} from '../modules/receipt/ReceiptItem';

interface AddReceiptFormProps {
  onClose: () => void;
  defaultValue: IReceipt;
  onSubmit?: (
    values: Partial<
      IReceipt & {
        providerName: string;
        postCode: string;
        serviceCat: string[];
      }
    >,
  ) => void;
}

const providerInfoSchema = z.object({
  providerName: z.string(),
  postCode: z.string(),
  serviceCategory: z.array(z.string()),
});

type ServiceCategorySchema = z.infer<typeof providerInfoSchema>;

const AddReceipt = ({onClose, defaultValue, onSubmit}: AddReceiptFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);
  // const [receipt, setReceipt] = useState<Partial<IReceipt>>(null);
  const {
    formState: {errors},
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
  } = useForm<ServiceCategorySchema>({
    resolver: zodResolver(providerInfoSchema),
    defaultValues: defaultValue
      ? {
          providerName: defaultValue?.providerName,
          postCode: String(defaultValue?.postCode),
        }
      : {},
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const closeModal = () => {
    setShowModal(false);
  };

  const onReceiptModalClose = () => {
    setShowReceiptModal(false);
    onClose();
  };

  const handleCreateReceipt = async () => {
    // setReceipt(values);
    setShowReceiptModal(true);
    // onClose?.();
  };

  const handleUpdateService = async (values: ServiceCategorySchema) => {
    onSubmit?.(values);
    onClose?.();
    setShowReceiptModal(false);
  };
  useEffect(() => {
    if (serviceCategories.length) {
      setError('serviceCategory', null);
      const values = serviceCategories?.map(cat => cat.title);
      setValue('serviceCategory', values);
    }
  }, [serviceCategories, setError, setValue]);
  return (
    <SafeAreaView style={{height: '100%'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={formStyle.container}>
          <View>
            <Controller
              name="providerName"
              control={control}
              render={({field}) => (
                <FieldLabel label={'Name des Dienstleisters'}>
                  <FieldError error={errors.providerName?.message}>
                    <Input
                      inputType="text"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      error={!!errors.providerName?.message}
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

            <ServiceCategory
              error={errors?.serviceCategory?.message}
              serviceCategories={serviceCategories}
              onPress={() => setShowModal(true)}
            />
          </View>

          {!defaultValue ? (
            <NextButton
              title={'Weiter'}
              onPress={handleSubmit(handleCreateReceipt)}
            />
          ) : (
            <NextButton
              title={'Übernehmen'}
              onPress={handleSubmit(handleUpdateService)}
            />
          )}
        </View>
        <ServiceCategoryModal
          visible={showModal}
          onClose={closeModal}
          setServiceCategories={setServiceCategories}
          services={serviceCategories}
        />
        <ReceiptModal
          visible={showReceiptModal}
          onClose={onReceiptModalClose}
          onAction={() => {}}
          receipt={{
            amount: '00',
            amount_paid: '00',
            providerName: watch('providerName') || 'Default Name',
            logo: 'GF',
            postCode: watch('postCode'),
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const formStyle = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default AddReceipt;
