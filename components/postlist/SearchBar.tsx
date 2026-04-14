// 검색 영역
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import AppText from '@/components/ui/AppText';
import AppButton from '@/components/ui/AppButton';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSearch: () => void;
}

export default function SearchBar({ value, onChangeText, onSearch }: SearchBarProps) {
    return (
        <View style={styles.container}>
            {/* 대분류 / 소분류 */}
            <View style={styles.dropdownRow}>
                <TouchableOpacity style={styles.dropdown}>
                    <AppText size="md" color={colors.textMain}>대분류</AppText>
                    <AppText size="md" color={colors.textMain}> ∨</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown}>
                    <AppText size="md" color={colors.textMain}>소분류</AppText>
                    <AppText size="md" color={colors.textMain}> ∨</AppText>
                </TouchableOpacity>
            </View>

            {/* 검색창 */}
            <View style={styles.inputRow}>
                <AppText size="md" color={colors.gray1}>🔍</AppText>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="검색어를 입력하세요"
                    placeholderTextColor={colors.gray1}
                />
            </View>

            {/* 검색 버튼 */}
            <AppButton label="검색" onPress={onSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.sm,
        padding: spacing.md,
    },
    dropdownRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    dropdown: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray3,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.white,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray3,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
        backgroundColor: colors.white,
    },
    input: {
        flex: 1,
        fontSize: typography.fontSizes.md,
        fontFamily: typography.fontFamily.regular,
        color: colors.textDark,
    },
});