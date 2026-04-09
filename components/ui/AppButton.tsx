// 버튼
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/index';
import AppText from './AppText';

interface AppButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'delete' | 'outline';
    disabled?: boolean;
    style?: ViewStyle;
}

export default function AppButton({
                                      label,
                                      onPress,
                                      variant = 'primary',
                                      disabled = false,
                                      style,
                                  }: AppButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.base, styles[variant], disabled && styles.disabled, style]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <AppText
                size="md"
                weight="semibold"
                color={variant === 'outline' ? colors.main : colors.white}
            >
                {label}
            </AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    primary: {
        backgroundColor: colors.main,
    },
    secondary: {
        backgroundColor: colors.sub1,
    },
    delete: {
        backgroundColor: colors.red,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.main,
    },
    disabled: {
        opacity: 0.4,
    },
});

/*
<AppButton label="확인" onPress={() => {}} />
<AppButton label="취소" onPress={() => {}} variant="outline" />
<AppButton label="삭제" onPress={() => {}} variant="delete" />
<AppButton label="비활성" onPress={() => {}} disabled />

사용법 
*/