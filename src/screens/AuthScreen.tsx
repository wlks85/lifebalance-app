/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuth} from '../providers/auth-provider';
import userService from '../services/UserService';
import {useTranslation} from 'react-i18next';

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const AuthScreen = ({onSubmit}: {onSubmit?: (value: any) => void}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {setIsLoggedIn, setUserDetails} = useAuth();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const [mode, setMode] = useState<'login' | 'forgot' | 'register'>('login');

  async function handleSubmit(values: FormSchema) {
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const {data: userDetails, error: loginError} = await userService.login({
          username: values.username!,
          password: values.password!,
        });
        if (loginError) {
          setError(loginError);
          setLoading(false);
          return;
        }
        setUserDetails(userDetails);
        setIsLoggedIn(true);
        setError('');
        onSubmit?.(userDetails);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {mode === 'login' && <>{t('Login')}</>}
            {mode === 'forgot' && <>{t('Forgot Password')}?</>}
            {mode === 'register' && <>{t('Register')}</>}
          </Text>
        </View>

        <View style={styles.form}>
          {mode === 'forgot' ? (
            <FormItem value="" onChange={() => {}} label={t('Email')} />
          ) : (
            <>
              <Controller
                name="username"
                control={form.control}
                render={({field}) => (
                  <FormItem
                    label={
                      <View style={styles.formLabelHeader}>
                        <Text style={styles.formLabel}>{t('Username')}</Text>

                        {mode === 'login' && (
                          <Text
                            onPress={() => setMode('forgot')}
                            style={[styles.formLabel, styles.formLabelPrimary]}>
                            {t('Forgot')}?
                          </Text>
                        )}
                      </View>
                    }
                    error={form.formState.errors.username?.message}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                  />
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({field}) => (
                  <FormItem
                    label={t('Password')}
                    type="password"
                    error={form.formState.errors.password?.message}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                  />
                )}
              />
            </>
          )}

          <Pressable
            style={styles.formButton}
            onPress={form.handleSubmit(handleSubmit)}>
            <Text style={styles.formButtonText}>
              <>
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    {mode === 'login' && <>{t('Login')}</>}
                    {mode === 'forgot' && <>{t('Send')}</>}
                    {mode === 'register' && <>{t('Register')}</>}
                  </>
                )}
              </>
            </Text>
          </Pressable>

          <View style={styles.formInfo}>
            {error && (
              <Text
                style={[
                  styles.formInfoText,
                  {
                    color: 'red',
                  },
                ]}>
                {error}
              </Text>
            )}
            {mode !== 'forgot' && (
              <Text style={styles.formInfoText}>
                {t("Don't have a lifebalancePlus account yet")}?
              </Text>
            )}
            {mode === 'login' && (
              <Text
                style={[styles.formInfoText, styles.formLabelPrimary]}
                onPress={() => ''}>
                {t('Register here')} …
              </Text>
            )}
            {mode === 'register' && (
              <Text
                style={[styles.formInfoText, styles.formLabelPrimary]}
                onPress={() => setMode('login')}>
                {t('Register here')} …
              </Text>
            )}
            {mode === 'forgot' && (
              <Text
                style={[styles.formInfoText, styles.formLabelPrimary]}
                onPress={() => setMode('login')}>
                {t('Back to Login')}
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

function FormItem({
  label,
  value,
  type,
  error,
  onChange,
  onBlur,
}: {
  label: ReactNode;
  value: string;
  type?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}) {
  const [focused, settFocused] = useState(false);
  const [showRawText, setShowRawText] = useState(false);

  return (
    <View style={styles.formGroup}>
      {typeof label === 'string' && (
        <Text style={styles.formLabel}>{label}</Text>
      )}
      {typeof label !== 'string' && label}

      <View style={[styles.formControl, focused ? styles.formFocused : false]}>
        <TextInput
          onBlur={() => {
            settFocused(false);
            onBlur?.();
          }}
          onFocus={() => {
            settFocused(true);
          }}
          value={value}
          style={styles.formInput}
          onChangeText={valueText => onChange?.(valueText)}
          {...(type === 'password' && !showRawText
            ? {
                secureTextEntry: true,
                textContentType: 'password',
              }
            : {
                secureTextEntry: false,
                // textContentType: 'text',
              })}
        />
        {type === 'password' && (
          <Pressable
            style={styles.floatingIcon}
            onPress={() => setShowRawText(value => !value)}>
            <Icon name={showRawText ? 'eye' : 'eye-slash'} size={20} />
          </Pressable>
        )}
      </View>

      {error && <Text style={styles.formMessage}>{error}</Text>}
    </View>
  );
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f4',
  },
  header: {
    height: 80,
    padding: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'OpenSans-Bold',
    color: '#454d66',
    fontSize: 16,
  },
  form: {
    padding: 25,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBottom: 25,
  },
  formLabel: {
    fontFamily: 'OpenSans-Bold',
    color: '#454d66',
    textAlign: 'left',
    fontSize: 13,
  },
  formLabelPrimary: {
    color: '#309975',
  },
  formLabelHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    marginTop: 4,
    backgroundColor: '#fff',
    height: 48,
    // paddingTop: 4,
    // paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d7d7d7',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  formInput: {
    fontFamily: 'OpenSans-Regular',
    color: '#454d66',
    fontSize: 15,
    textDecorationLine: 'none',
    // backgroundColor:'red',
    height: '100%',
  },
  formFocused: {
    borderColor: '#309975',
    borderWidth: 2,
  },
  floatingIcon: {
    position: 'absolute',
    right: 16,
    top: '30%',
    cursor: 'pointer',
  },
  formButton: {
    height: 56,
    paddingTop: 4,
    paddingRight: 28,
    paddingBottom: 4,
    paddingLeft: 28,
    backgroundColor: '#309975',
    borderRadius: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: 11,
  },
  formButtonText: {
    fontFamily: ' OpenSans-Bold',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#fff',
    fontWeight: '700',
  },
  formInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  formInfoText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#1e4251',
    marginTop: 4,
  },
  formMessage: {
    fontFamily: ' OpenSans-Bold',
    fontSize: 13,
    color: 'salmon',
    fontWeight: '500',
    marginTop: 4,
  },
});
