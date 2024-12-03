/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FieldLabel from '../../ui/FieldLabel';
import FieldError from '../../ui/FieldError';
import { useTranslation } from 'react-i18next';
import { Icons } from '../../icons';

interface ServiceCategoryProps {
  onPress: () => void;
  serviceCategories: { id: number; title: string }[];
  error: string;
}

const ServiceCategory = ({
  onPress,
  serviceCategories,
  error,
}: ServiceCategoryProps) => {
  const { t } = useTranslation();
  return (
    <Pressable onPress={onPress}>
      <FieldLabel label={t('Service category')}>
        <FieldError error={error}>
          <View
            style={[
              styles.inputContainer,
              error && { borderColor: 'red', borderWidth: 2 },
            ]}>
            <Text style={[styles.catText, error && { color: 'red' }]}>
              {serviceCategories ? serviceCategories.map(s => s.title).slice(0, Math.min(serviceCategories.length, 5)).join(', ') : t('Please choose')} …
            </Text>
            <Icons name="angle-right-light" size={20} color={error && 'red'} />
          </View>
        </FieldError>
      </FieldLabel>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#d7d7d7',
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catText: {
    fontSize: 15,
    color: '#999999',
    fontFamily: 'OpenSans-Regular',
  },
});

export default ServiceCategory;
