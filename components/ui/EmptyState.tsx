import { View, StyleSheet } from 'react-native';
import {colors, spacing, typography} from '@/constants/index';
import AppText from './AppText';

interface EmptyStateProps {
    title: string;
    description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <AppText style={styles.iconText}>!</AppText>
            </View>
            <AppText size="md" color={colors.textMain} weight="semibold" style={styles.title}>
                {title}
            </AppText>
            {description && (
                <AppText size="sm" color={colors.gray1} style={styles.description}>
                    {description}
                </AppText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: colors.gray3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    iconText: {
        fontSize: 36, // 추가 해야함
        color: colors.gray3,
        fontFamily: typography.fontFamily.bold,
    },
    title: {
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
    },
});

/*
 * [사용법]
 * import EmptyState from '@/components/ui/EmptyState';
 *
 * // 친구 없을 때
 * <EmptyState
 *     title="친구를 기다리고 있습니다."
 *     description="친구를 추가해 다양한 사람과 공부해요!"
 * />
 *
 * // 알림 없을 때
 * <EmptyState
 *     title="새로운 알림이 없습니다."
 *     description="알림이 생기면 알려드릴게요!"
 * />
 *
 * // description 없이도 사용 가능
 * <EmptyState title="데이터가 없습니다." />
 *
 * [Props]
 * title       : string - 메인 텍스트 (필수)
 * description : string - 서브 텍스트 (선택)
 */