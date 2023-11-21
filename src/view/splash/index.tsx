import React, { useContext, useEffect } from 'react';
import { View, Image } from 'react-native';
import styles from '../../styles';
import wave from '../../styles/home/wave';
import logo from '../../styles/home/logo';
import FadeInView from '../../components/animated/fadein';
import useFadeInAnimation from '../../controllers/configs/fadeincontroller';
import { ConnectionSocket } from '../../controllers/token/socketcontroller';
import { UserContext } from '../../store/context/context';

export default function HomeController({ funVerify }) {
    const { fadeAnim, fadeIn, navigator } = useFadeInAnimation();
    const { userContext, setUserContext, setToken } = useContext(UserContext);

    useEffect(() => {
        ConnectionSocket({ setToken, setUserContext })

        if (navigator === 1) {
            funVerify()
        }
    }, [fadeAnim, navigator, userContext]);

    return (
        <FadeInView style={styles.container} fadeAnim={fadeAnim} fadeIn={fadeIn} >
            <View style={wave.top}>
                <Image source={require('../../assets/onda2.jpg')} style={wave.img} />
            </View>

            <View style={logo.container}>
                <Image source={require('../../assets/logo.png')} style={logo.img} />
            </View>

            <View style={wave.bottom}>
                <Image source={require('../../assets/onda.jpg')} style={wave.img} />
            </View>
        </FadeInView>
    );
}
