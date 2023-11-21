import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, useWindowDimensions } from 'react-native';
import { UserContext } from '../../../store/context/context';
import styles from '../../../styles';
import AppBar from '../../../components/menu';
import { Button, Card, IconButton, Surface } from 'react-native-paper';
import { SearchCard } from '../../../controllers/user/cardfetchcontroller';
import colors from '../../../assets/colors';
import { CardsHome } from '../../../components/card/rowthreecards';
import { handleTravel } from '../../../controllers/user/travelcheck';
import { Skeleton } from '@rneui/themed';
import ButtonComp from '../../../components/button';
import { shareLink } from '../../../controllers/configs/sharebutton';

export default function SystemController() {
    const { token, userContext } = useContext(UserContext);
    const [mostrarSaldo, setMostrarSaldo] = useState(false);
    const [dataCard, setDataCard] = useState<any>()
    const [use, setUse] = useState<any>()
    const [loading, setLoading] = useState(true)
    const { height } = useWindowDimensions();

    useEffect(() => {
        SearchCard(token, setDataCard, userContext);
        handleTravel({ setUse, setLoading, token, userContext })
    }, [token, userContext])

    const OnShare = () => {
        shareLink()
    }

    return (
        <>
            <View style={styles.alignTop}>
                <AppBar />
            </View>
            <ScrollView style={[styles.form, { width: '100%'}]} showsVerticalScrollIndicator={false}>
                {
                    dataCard && (
                        <>
                            <View style={{ marginTop: 20, marginLeft: '10%', width: '100%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 22, borderBottomWidth: 2, borderBottomColor: colors.sc }}>
                                        R$ {mostrarSaldo ? (dataCard.card_saldo ? dataCard.card_saldo : '000.00') : "•••••••"}
                                    </Text>
                                    <IconButton
                                        icon={mostrarSaldo ? 'eye-off' : 'eye'}
                                        onPress={() => setMostrarSaldo(!mostrarSaldo)}
                                    />
                                </View>
                                <ButtonComp text={'Ver extrato'} mode={'text'} color={colors.pm} style={[{ backgroundColor: 'white', fontWeight: '600', fontSize: 14, width: '30%', alignSelf: 'flex-start', marginTop: -5,  marginLeft: -13, marginBottom: 10}]} click={() => { console.log('aaaaa');
                                }}/>
                            </View>
                        </>
                    )
                }
                <View style={{ gap: 10, marginTop: 20 }}>
                    <CardsHome />
                </View>
                <View style={[styles.alignCenter, { marginTop: 40 }]}>
                    <Text style={[styles.textSubTitle, { color: colors.pm, fontWeight: 'bold', marginBottom: 20 }]}>Última viagem:</Text>
                    {
                        loading ? (
                            <Skeleton
                                animation="wave"
                                width={180}
                                height={40}
                                style={{ borderRadius: 20 }}
                            />
                        ) : (use ? (
                            <Card style={[styles.alignCenter, styles.list, { gap: 10 }]}>
                                {use.slice(0, 2).map((viagem: any, index) => (
                                    <>
                                        <IconButton icon={'bus'} style={{ alignSelf: 'flex-start', width: '50%' }} />
                                        <View style={{ alignSelf: 'flex-end', width: '50%', display: 'flex', flexDirection: 'column' }}>
                                            <Text>
                                                {viagem.route_numF}
                                            </Text>
                                            <Text>
                                                {viagem.route_nome}
                                            </Text>
                                        </View>
                                    </>
                                ))}
                            </Card>
                        ) : (
                            <Card style={[styles.alignCenter, { width: '70%', marginTop: 10, marginBottom: 10 }]}>
                                <Text style={[styles.textSubTitle, { fontSize: 14, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }]}>Sem viagens...</Text>
                            </Card>
                        ))
                    }

                </View>
                <Surface style={[styles.footer, { display: 'flex', flexDirection: 'row', gap: 30, marginTop: 60 }]}>
                <View style={{ width: '50%', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <Text style={[styles.textSubTitle, { fontWeight: 'bold' }]}>Convide amigos</Text>
                    <Text style={{ opacity: 0.5, fontSize: 13 }}>Indique para seus amigos o aplicativo da EasyPass!</Text>
                    <ButtonComp text={'Indicar'} mode={'contained'} click={OnShare} />
                </View>
                <View style={{ width: '40%' }}>
                    <Image source={require('../../../assets/ads.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
                </View>
            </Surface>
            </ScrollView>
            
            </>
    );
}