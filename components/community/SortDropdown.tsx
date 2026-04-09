// 정렬 드롭다운
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import AppText from '@/components/ui/AppText';

const SORT_OPTIONS = ['최신순', '조회순', '좋아요순', '댓글많은순'];

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity
                style={styles.trigger}
                onPress={() => setVisible(true)}
            >
                <AppText size="md" weight="medium" color={colors.textDark}>{value}</AppText>
                <AppText size="md" color={colors.textDark}>{visible ? ' ∧' : ' ∨'}</AppText>
            </TouchableOpacity>

            <Modal transparent visible={visible} onRequestClose={() => setVisible(false)}>
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.dropdown}>
                        {SORT_OPTIONS.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.option}
                                onPress={() => {
                                    onChange(option);
                                    setVisible(false);
                                }}
                            >
                                <AppText
                                    size="md"
                                    weight={value === option ? 'semibold' : 'regular'}
                                    color={value === option ? colors.main : colors.textDark}
                                >
                                    {option}
                                </AppText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
    },
    dropdown: {
        position: 'absolute',
        top: 160,
        left: spacing.md,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray3,
        paddingVertical: spacing.xs,
        minWidth: 120,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    option: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
});