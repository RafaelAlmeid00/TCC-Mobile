import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpController from '../../view/signup';
import styles from '../../styles';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <SignUpController/>
    </View>
  );
}
