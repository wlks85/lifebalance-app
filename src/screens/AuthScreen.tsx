import React, {ReactNode, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {UserService} from '../services';
import {useAuth} from '../providers/auth-provider';
import {useAxios} from '../providers/axios-provider';

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const AuthScreen = ({onSubmit}: {onSubmit?: (value: any) => void}) => {
  const [loading, setLoading] = useState(false);
  const storage = useAsyncStorage('auth.credentials');
  const {setIsLoggedIn, setUserDetails} = useAuth();
  const axios = useAxios();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const [mode, setMode] = useState<'login' | 'forgot' | 'register'>('login');

  async function handleSubmit(values: FormSchema) {
    setLoading(true);
    try {
      if (mode === 'login') {
        await storage.setItem(JSON.stringify(values));
        const {data} = await axios.get(
          '/lbp/mobile-app/rest-service/v1.0/ep/node.json/?parameters[type]=account',
        );
        if (data[0]?.nid) {
          const {data: userDetails} = await axios.get(
            `/lbp/mobile-app/rest-service/v1.0/ep/node/${data[0]?.nid}.json`,
          );
          setUserDetails(userDetails);
          setIsLoggedIn(true);
          onSubmit?.(userDetails);
        }
      }
      if (mode === 'register') {
        await storage.setItem(JSON.stringify(values));
        setIsLoggedIn(true);
        onSubmit?.(null);
      }
      if (mode === 'forgot') {
        await UserService.forgot('');
      }
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {mode === 'login' && <>Login</>}
          {mode === 'forgot' && <>Forgot Password?</>}
          {mode === 'register' && <>Register</>}
        </Text>
      </View>

      <View style={styles.form}>
        {mode === 'forgot' ? (
          <FormItem value="" onChange={() => {}} label="Email" />
        ) : (
          <>
            <Controller
              name="username"
              control={form.control}
              render={({field}) => (
                <FormItem
                  label={
                    <View style={styles.formLabelHeader}>
                      <Text style={styles.formLabel}>Username</Text>

                      {mode === 'login' && (
                        <Text
                          onPress={() => setMode('forgot')}
                          style={[styles.formLabel, styles.formLabelPrimary]}>
                          Forgot?
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
                  label="Password"
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
              {loading ? "Loading..." : (
                <>
                  {mode === 'login' && <>Login</>}
                  {mode === 'forgot' && <>Send</>}
                  {mode === 'register' && <>Register</>}
                </>
              )}
            </>
          </Text>
        </Pressable>

        <View style={styles.formInfo}>
          {mode !== 'forgot' && (
            <Text style={styles.formInfoText}>
              Sie haben noch kein lifebalancePlus-Konto?
            </Text>
          )}
          {mode === 'login' && (
            <Text
              style={[styles.formInfoText, styles.formLabelPrimary]}
              onPress={() => ''}>
              Registrieren Sie sich hier …
            </Text>
          )}
          {mode === 'register' && (
            <Text
              style={[styles.formInfoText, styles.formLabelPrimary]}
              onPress={() => setMode('login')}>
              Registrieren Sie sich hier …
            </Text>
          )}
          {mode === 'forgot' && (
            <Text
              style={[styles.formInfoText, styles.formLabelPrimary]}
              onPress={() => setMode('login')}>
              Back to Login
            </Text>
          )}
        </View>
      </View>
    </View>
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
          onChangeText={value => onChange?.(value)}
          {...(type === 'password' && !showRawText
            ? {
                secureTextEntry: true,
                textContentType: 'password',
              }
            : {})}
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
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontWeight: '700',
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
    fontFamily: '"OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontWeight: '700',
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
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d7d7d7',
    position: 'relative',
  },
  formInput: {
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
    color: '#454d66',
    fontSize: 15,
    textDecorationLine: 'none',
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
    fontFamily: ' "OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
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
    fontFamily: '"OpenSans-Regular", "Open Sans", sans-serif',
    fontSize: 14,
    color: '#1e4251',
    marginTop: 4,
  },
  formMessage: {
    fontFamily: ' "OpenSans-Bold", "Open Sans Bold", "Open Sans", sans-serif',
    fontSize: 13,
    color: 'salmon',
    fontWeight: '500',
    marginTop: 4,
  },
});
