import { View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import styles from "../../styles";
import colors from "../../assets/colors";

export function CardsHome() {

    return (
        <>
            <View style={[styles.list, styles.alignTop, { gap: 10, marginBottom: 5 }]}>
                <Card style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20 }}>
                        <IconButton icon={'credit-card-plus'} iconColor={colors.pm} size={25} style={{ marginTop: 20 }} />
                        <Text style={{ fontWeight: 'bold', marginBottom: 20, color: colors.pm }}>Recarga</Text>
                    </View>
                </Card>
                <Card style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20 }}>
                        <IconButton icon={'smart-card'} iconColor={colors.pm} size={25} style={{ marginTop: 20 }} />
                        <Text style={{ fontWeight: 'bold', marginBottom: 20, color: colors.pm }}>Cartões</Text>
                    </View>
                </Card>
                <Card style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20 }}>
                        <IconButton icon={'comment-question'} iconColor={colors.pm} size={25} style={{ marginTop: 20 }} />
                        <Text style={{ fontWeight: 'bold', marginBottom: 20, color: colors.pm }}>SAC</Text>
                    </View>
                </Card>
            </View>

            <View style={[styles.list, styles.alignTop, { gap: 10, marginBottom: 5 }]}>
                <Card style={{ alignSelf: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20 }}>
                        <IconButton icon={'shopping'} iconColor={colors.pm} size={25} style={{ marginTop: 20 }} />
                        <Text style={{ fontWeight: 'bold', marginBottom: 20, color: colors.pm }}>Loja</Text>
                    </View>
                </Card>
                <Card style={{ alignSelf: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20 }}>
                        <IconButton icon={'bus'} iconColor={colors.pm} size={25} style={{ marginTop: 20 }} />
                        <Text style={{ fontWeight: 'bold', marginBottom: 20, color: colors.pm }}>Ônibus</Text>
                    </View>
                </Card>
                <Card style={{ alignSelf: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20 }}>
                        <IconButton icon={'routes'} iconColor={colors.pm} size={25} style={{ marginTop: 20 }} />
                        <Text style={{ fontWeight: 'bold', marginBottom: 20, color: colors.pm }}>Rotas</Text>
                    </View>
                </Card>
            </View>
        </>
    )
}