/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
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
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface AddReceiptFormProps {
  onClose: () => void;
  defaultValue: IReceipt;
  onSubmit?: (
    values: Partial<
      IReceipt & {
        providerName: string;
        postCode: string;
        // serviceCat: string[];
      }
    >,
  ) => void;
}

const providerInfoSchema = z.object({
  providerName: z.string(),
  postCode: z.string(),
  // serviceCategory: z.array(z.string()),
});

type ServiceCategorySchema = z.infer<typeof providerInfoSchema>;

const AddReceipt = ({onClose, defaultValue, onSubmit}: AddReceiptFormProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);
  const {t} = useTranslation();
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
    setTimeout(() => onClose(), 100);
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
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={20} // adjust as needed
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
      <View style={formStyle.container}>
        <View>
          <Controller
            name="providerName"
            control={control}
            render={({field}) => (
              <FieldLabel label={t('Name of the service provider')}>
                <FieldError
                  error={
                    errors.providerName?.message
                      ? 'Bitte geben Sie einen Dienstleister an'
                      : null
                  }>
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
              <FieldLabel label={t('Postal code of the service provider')}>
                {/* <FieldError error={errors.postCode?.message}> */}
                <FieldError
                  error={
                    errors.postCode?.message
                      ? 'Bitte geben Sie eine Postleitzahl an'
                      : null
                  }>
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

          {/* <ServiceCategory
            // error={errors?.serviceCategory?.message}
            // error={errors?.serviceCategory?"Bitte wählen Sie mindestens eine Kategorie":null}
            error={errors?.serviceCategory?.message?"Bitte wählen Sie mindestens eine Kategorie":null}
            serviceCategories={serviceCategories}
            onPress={() => setShowModal(true)}
          /> */}
        </View>

        {!defaultValue ? (
          <NextButton
            title={t('Further')}
            onPress={handleSubmit(handleCreateReceipt)}
          />
        ) : (
          <NextButton
            title={t('Take over')}
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
          amount: '',
          amount_paid: '00',
          providerName: watch('providerName') || 'Default Name',
          logo: 'GF',
          postCode: watch('postCode'),
        }}
      />
    </KeyboardAwareScrollView>

    // <ScrollView contentContainerStyle={{flexGrow: 1}}>

    // </ScrollView>
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
