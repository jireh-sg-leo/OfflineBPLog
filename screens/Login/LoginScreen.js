import React from 'react';
import {StyleSheet} from 'react-native';

import {Heading} from '../../components/UI/Heading';
import {Input} from '../../components/UI/SimpleInput';
import {FilledButton} from '../../components/UI/FilledButton';
import {TextButton} from '../../components/UI/TextButton';
import {Error} from '../../components/UI/Error';
import {AuthContainer} from '../../components/UI/AuthContainer';
import {AuthContext} from '../../contexts/AuthContext';
import {Loading} from '../../components/UI/Loading';

export function LoginScreen({navigation}) {
    const {login} = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('doeivan49@gmail.com');
    const [password, setPassword] = React.useState('abcd$1234');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    return (
        <AuthContainer>
            <Heading style={styles.title}>Welcome to GetDoc RPM</Heading>
            <Error error={error} />
            <Input
                style={styles.input}
                placeholder={'Email'}
                keyboardType={'email-address'}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <FilledButton
                title={'Login'}
                style={styles.loginButton}
                onPress={async () => {
                    try {
                        setLoading(true);
                        await login(email, password);
                    } catch (e) {
                        setError(e.message);
                        setLoading(false);
                    }
                }}
            />
            <Loading loading={loading} />
        </AuthContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 48,
    },
    input: {
        marginVertical: 8,
    },
    loginButton: {
        marginVertical: 32,
    },
});