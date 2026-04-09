// 구분선
import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/index';

interface AppDividerProps {
    color?: string;
    thickness?: number;
    style?: object;
}

export default function AppDivider({
                                       color = colors.gray4,
                                       thickness = 1,
                                       style,
                                   }: AppDividerProps) {
    return (
        <View
            style={[styles.divider, { borderBottomColor: color, borderBottomWidth: thickness }, style]}
        />
    );
}

const styles = StyleSheet.create({
    divider: {
        width: '100%',
    },
});

/*
<AppDivider />
<AppDivider color={colors.gray3} thickness={2} />

사용법
 */