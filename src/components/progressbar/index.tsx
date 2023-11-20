import React from "react";
import { ProgressBar } from "react-native-paper";
import colors from "../../assets/colors";

interface InterfaceProgress {
    pointprogress: number;
    style?: {};
    visible?: boolean;
}

const Progress: React.FC<InterfaceProgress> = ({
    pointprogress,
    style,
    visible = true,
}) => {
    return (
        <ProgressBar
            progress={pointprogress / 10} 
            color={colors.sc}
            style={style}
            visible={visible}
        />
    );
};

export default Progress;
