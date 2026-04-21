import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/constants/index';
import AppText from './AppText';

interface AppButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'delete' | 'outline';
    disabled?: boolean;
    style?: ViewStyle;
    size?: 'sm' | 'md' | 'lg';
}

export default function AppButton({
                                      label,
                                      onPress,
                                      variant = 'primary',
                                      disabled = false,
                                      style,
                                      size = 'md',
                                  }: AppButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.base, styles[variant], styles[size], disabled && styles.disabled, style]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <AppText
                size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
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
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sm: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        height: 36,
    },
    md: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        height: 48,
    },
    lg: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        height: 56,
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
<AppButton label="작은버튼" onPress={() => {}} size="sm" />
<AppButton label="기본버튼" onPress={() => {}} />
<AppButton label="큰버튼" onPress={() => {}} size="lg" />
<AppButton label="큰삭제" onPress={() => {}} size="lg" variant="delete" />
*/