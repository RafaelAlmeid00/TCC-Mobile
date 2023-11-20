import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import colors from '../../assets/colors';
import { View } from 'react-native-animatable';
import styles from '../../styles';

function Loading() {

    return (
        <View style={styles.container}>
        <ActivityIndicator size={60}  style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}} animating={true} color={colors.pm} />
        </View>
    )
}

export default Loading;