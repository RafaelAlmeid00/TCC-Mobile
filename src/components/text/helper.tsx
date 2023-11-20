import { HelperText as Text } from "react-native-paper";

interface interfaceHelperText {
    textChildren: string, 
    type: 'error' | 'info', 
    visible: any
}

export default function HelperText({textChildren, type, visible}: interfaceHelperText) {


    return (
        <>
            <Text type={type} visible={visible}>
                {textChildren}
            </Text>
        </>
    )
}