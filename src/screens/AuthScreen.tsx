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
  Linking,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuth} from '../providers/auth-provider';
import userService from '../services/UserService';
import {useTranslation} from 'react-i18next';
import {Icons} from '../components/icons';
import {WebView} from 'react-native-webview';
import NextButton from '../components/ui/NextButton';

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const WebViewScreen = ({uri, onClose}: {uri: string; onClose: () => void}) => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
      <Pressable onPress={onClose}>
        <Icons
          onPress={onClose}
          name={'close-light'}
          color={'#454d66'}
          size={25}
        />
      </Pressable>
    </View>
    <WebView source={{uri}} style={{flex: 1}} />
  </SafeAreaView>
);

const AuthScreen = ({onSubmit}: {onSubmit?: (value: any) => void}) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {setIsLoggedIn, setUserDetails} = useAuth();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const [mode, setMode] = useState<'login' | 'forgot' | 'register'>('login');

  const [webViewUri, setWebViewUri] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(true);

  const openWebView = (url: string) => {
    setWebViewUri(url);
  };

  const closeWebView = () => {
    setWebViewUri(null);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (webViewUri) {
    return <WebViewScreen uri={webViewUri} onClose={closeWebView} />;
  }

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
          setError(
            'loginErrorIhre Kombination aus E-Mail-Adresse und Passwort existiert nicht in unserem System. Bitte versuchen Sie es erneut oder fordern Sie ein neues Passwort an.',
          );
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
                    label={t('Username')}
                    // error={form.formState.errors.username?.message}
                    error={
                      form.formState.errors.username
                        ? 'Bitte geben Sie Ihre E-Mail-Adresse an'
                        : null
                    }
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
                    label={
                      <View style={styles.formLabelHeader}>
                        <Text style={styles.formLabel}>{t('Password')}</Text>
                        {mode === 'login' && (
                          // <Text
                          //   onPress={async () => {
                          //     const url = 'https://w3.lbplus.de/user/password';
                          //     await Linking.openURL(url);
                          //   }}
                          //   style={[styles.formLabel, styles.formLabelPrimary]}>
                          //   {t('Forgot')}?
                          // </Text>
                          <Text
                            onPress={() =>
                              openWebView('https://w3.lbplus.de/user/password')
                            }
                            style={[styles.formLabel, styles.formLabelPrimary]}>
                            {t('Forgot')}?
                          </Text>
                        )}
                      </View>
                    }
                    type="password"
                    // error={form.formState.errors.password?.message}
                    error={
                      form.formState.errors.password
                        ? 'Bitte geben Sie Ihr Passwort an'
                        : null
                    }
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
                  'Wird geladen...'
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
            {/* {mode !== 'forgot' && (
              <Text style={styles.formInfoText}>
                {t("Don't have a lifebalancePlus account yet")}?
              </Text>
            )}
            {mode === 'login' && (
              <Text
                style={[styles.formInfoText, styles.formLabelPrimary]}
                onPress={() => openWebView('https://w3.lbplus.de/?q=user/register')}>
                {t('Register here')} …
              </Text>
            )} */}
            {mode === 'register' && (
              // <Text
              //   style={[styles.formInfoText, styles.formLabelPrimary]}
              //   onPress={() =>
              //     Linking.openURL('https://w3.lbplus.de/?q=user/register')
              //   }>
              //   {t('Register here')} …
              // </Text>
              <Text
                style={[styles.formInfoText, styles.formLabelPrimary]}
                onPress={() =>
                  openWebView('https://w3.lbplus.de/?q=user/register')
                }>
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
        <Modal transparent={true} visible={modalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Image
                source={require('../assets/normal_logo_u16.png')}
                style={{
                  width: 120,
                  height: 66,
                }}
                resizeMode="contain"
              />
              <Text style={styles.h1}>
                Hallo & Willkommen bei lifebalance:plus.
              </Text>
              <Image
                source={require('../assets/normal_u17.png')}
                style={{
                  width: 66,
                  height: 12,
                }}
                resizeMode="contain"
              />
              <Text style={styles.h4}>
                Mit dieser App verwaltest Du Deine Gesundheitsmaßnahmen ganz
                einfach digital: Belege hochladen, Budget im Blick behalten,
                Rückerstattung erhalten. Los geht´s – für Deine Gesundheit:
              </Text>
              <NextButton title={'WEITER'} onPress={closeModal} />
              <Image
                source={require('../assets/normal_u11.png')}
                style={{
                  transform: [{rotate: '70deg'}],
                  position: 'absolute',
                  top: 820,
                  left: -150,
                }}
              />
              <Image
                source={require('../assets/normal_u14.png')}
                style={{
                  transform: [{rotate: '300deg'}],
                  position: 'absolute',
                  top: 730,
                  right: -300,
                }}
              />
            </View>
          </View>
        </Modal>
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
            <Icons
              name={showRawText ? 'eye-light' : 'eye-slash'}
              size={20}
              color={'#454d66'}
            />
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
  modal: {
    margin: 24,
    borderRadius: 32,
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden'
  },
  modalContainer: {
    paddingHorizontal: 32,
    paddingVertical: 35,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 30,
    flex: 1,
  },
  h1: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30,
    color: '#454d66',
    fontFamily: 'PTSerif-Regular',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#454d66',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#454d66',
  },
  h4: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    color: '#454d66',
    fontFamily: 'OpenSans-Regular',
    lineHeight: 30,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
    color: '#454d66',
  },
});
