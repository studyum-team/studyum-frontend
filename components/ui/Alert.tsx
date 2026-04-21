import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '@/constants/index';
import AppText from './AppText';

type AlertType = 'friend' | 'study' | 'comment';

interface AlertProps {
    type: AlertType;
    title: string;
    description?: string;
    createdAt: string;
    onPress?: () => void;
    onClose?: () => void;
}

export default function Alert({
                                  type,
                                  title,
                                  description,
                                  createdAt,
                                  onPress,
                                  onClose,
                              }: AlertProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.content}>
                <AppText size="sm" weight="semibold">{title}</AppText>
                {description && (
                    <AppText size="xs" color={colors.textMain}>{description}</AppText>
                )}
                <AppText size="xs" color={colors.gray1}>{createdAt}</AppText>
            </View>
            {onClose && (
                <TouchableOpacity onPress={onClose} hitSlop={8}>
                    <AppText size="md" color={colors.textMain}>✕</AppText>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        marginTop: spacing.md,
        padding: spacing.md,
        borderRadius: 12,
        shadowColor: colors.textMain,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    content: {
        flex: 1,
        gap: 4,
    },
});

/*
 * [사용법]
 * import Alert from '@/components/ui/alert';
 *
 * // 친구 신청 알림
 * <Alert
 *     type="friend"
 *     title="친구 신청이 왔어요"
 *     description="홍길동님이 친구 신청을 보냈습니다."
 *     createdAt="방금 전"
 *     onPress={() => {}}
 *     onClose={() => {}}
 * />
 *
 * // 스터디방 요청 알림
 * <Alert
 *     type="study"
 *     title="스터디방 초대 요청"
 *     description="토익 스터디방에 초대되었습니다."
 *     createdAt="5분 전"
 *     onPress={() => {}}
 *     onClose={() => {}}
 * />
 *
 * // 댓글 알림 (description 없이도 사용 가능)
 * <Alert
 *     type="comment"
 *     title="댓글이 달렸어요"
 *     createdAt="1시간 전"
 *     onPress={() => {}}
 * />
 *
 * [Props]
 * type        : 'friend' | 'study' | 'comment' - 알림 종류 (필수)
 * title       : string                          - 알림 제목 (필수)
 * description : string                          - 알림 상세 내용 (선택)
 * createdAt   : string                          - 알림 시간 (필수)
 * onPress     : () => void                      - 카드 클릭 시 동작 (선택)
 * onClose     : () => void                      - X 버튼 클릭 시 동작, 없으면 X버튼 미노출 (선택)
 */