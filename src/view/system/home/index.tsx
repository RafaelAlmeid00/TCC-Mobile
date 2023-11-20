import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { UserContext } from '../../../store/context/context';
import getToken from '../../../controllers/tokencontroller';
import styles from '../../../styles';
import AppBar from '../../../components/menu';
import { ConnectionSocket } from '../../../controllers/socketcontroller';
import { IconButton } from 'react-native-paper';
import { SearchCard } from '../../../controllers/cardfetchcontroller';
import colors from '../../../assets/colors';

export default function SystemController() {
    const { token } = useContext(UserContext);
    const [mostrarSaldo, setMostrarSaldo] = useState(false);
    const [dataCard, setDataCard] = useState<any>('')

    console.log('ta mec o token', token);

    useEffect(() => {
        SearchCard(token, setDataCard)
    }, [token])

    return (
        <View style={styles.container}>
            <View style={styles.alignTop}>
                <AppBar />
            </View>
            <View style={styles.form}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        dataCard && (
                            <>
                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>Saldo:</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 22, borderBottomWidth: 2, borderBottomColor: colors.sc }}>
                                        R$ {mostrarSaldo ? (dataCard.card_saldo ? dataCard.card_saldo : '000.00') : "•••••••"}
                                    </Text>
                                    <IconButton
                                        icon={mostrarSaldo ? 'eye-off' : 'eye'}
                                        onPress={() => setMostrarSaldo(!mostrarSaldo)}
                                    />
                                </View>
                            </>
                        )
                    }

                </ScrollView>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}