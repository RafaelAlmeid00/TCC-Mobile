import { Text, View, Image } from 'react-native';
import styles from "../../styles";
import stylesLog from '../../styles/login';

interface title {
    fontSize: any, height: any, width: any
}

export function TitleEasyPass({fontSize, height, width}: title) {

    return (
        <View style={[styles.list, { gap: 10 }]}>
            <Image source={require('../../assets/logopass.png')} style={[stylesLog.logo, {height: height, width: width, }]} />
            <Text style={[styles.title, {fontSize: fontSize}]}>EasyPass</Text>
        </View>
    )
}