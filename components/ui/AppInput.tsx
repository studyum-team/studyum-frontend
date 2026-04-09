// 인풋
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { colors, typography, spacing } from '@/constants/index';
import AppText from './AppText';

interface AppInputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

export default function AppInput({
                                     label,
                                     placeholder,
                                     disabled = false,
                                     ...props
                                 }: AppInputProps) {
    return (
        <View style={styles.container}>
            {label && (
                <AppText size="sm" weight="medium" style={styles.label}>
                    {label}
                </AppText>
            )}
            <TextInput
                style={[styles.input, disabled && styles.disabled]}
                placeholder={placeholder}
                placeholderTextColor={colors.gray1}
                editable={!disabled}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.xs,
    },
    label: {
        color: colors.textMain,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: colors.gray3,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        fontSize: typography.fontSizes.md,
        fontFamily: typography.fontFamily.regular,
        color: colors.textDark,
        backgroundColor: colors.white,
    },
    disabled: {
        backgroundColor: colors.gray5,
        color: colors.gray1,
    },
});

/*
<AppInput label="이름" placeholder="이름을 입력하세요" />
<AppInput placeholder="검색" disabled />

사용법
 */