// 게시글 카드
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import AppText from '@/components/ui/AppText';

interface Post {
    id: string;
    badge: '모집중' | '모집완료' | '일반';
    title: string;
    content: string;
    author: string;
    time: string;
    likes: number;
    views: number;
    comments: number;
}

interface PostCardProps {
    post: Post;
    onPress: () => void;
}

const BADGE_COLORS: Record<string, string> = {
    '모집중':  colors.main,
    '모집완료': colors.gray1,
    '일반':   colors.textMain,
};

export default function PostCard({ post, onPress }: PostCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {/* 뱃지 */}
            <View style={[styles.badge, { backgroundColor: BADGE_COLORS[post.badge] + '20' }]}>
                <AppText size="xs" weight="medium" color={BADGE_COLORS[post.badge]}>
                    {post.badge}
                </AppText>
            </View>

            {/* 제목 */}
            <AppText size="lg" weight="semibold" style={styles.title}>
                {post.title}
            </AppText>

            {/* 내용 */}
            <AppText size="sm" color={colors.textMain} numberOfLines={1} style={styles.content}>
                {post.content}
            </AppText>

            {/* 하단 정보 */}
            <View style={styles.footer}>
                <AppText size="xs" color={colors.gray1}>
                    {post.author ? `${post.author} · ` : ''}{post.time}
                </AppText>
                <View style={styles.stats}>
                    <AppText size="xs" color={colors.gray1}>🤍 {post.likes}</AppText>
                    <AppText size="xs" color={colors.gray1}>👁 {post.views}</AppText>
                    <AppText size="xs" color={colors.gray1}>💬 {post.comments}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray4,
        gap: spacing.xs,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: 4,
    },
    title: {
        marginTop: spacing.xs,
    },
    content: {
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
    },
    stats: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
});