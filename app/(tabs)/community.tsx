import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import AppText from '@/components/ui/AppText';
import FilterTab from '@/components/community/FilterTab';
import SearchBar from '@/components/community/SearchBar';
import SortDropdown from '@/components/community/SortDropdown';
import PostCard from '@/components/community/PostCard';

const DUMMY_POSTS = [
    {
        id: '1',
        badge: '모집중' as const,
        title: '[Flutter] 플러터 개발 같이 하실 분',
        content: '혹시 플러터 개발 하실 분 있으신가요? 모여서 같이 개발하혹시 플러터 개발 하실 분 있으신가요? 모여서 같이 개발하실 분 구합니다. 혼자서는 도저히 할 용기가 안납니다... 허허',
        author: '조연희',
        time: '8분 전',
        likes: 12,
        views: 20,
        comments: 0,
    },
    {
        id: '2',
        badge: '모집완료' as const,
        title: '[Flutter] 플러터 개발 같이 하실 분',
        content: '혹시 플러터 개발 하실 분 있으신가요? 모여서 같이 개발하혹시 플러터 개발 하실 분 있으신가요? 모여서 같이 개발하실 분 구합니다. 혼자서는 도저히 할 용기가 안납니다... 허허',
        author: '조연희',
        time: '1시간 전',
        likes: 12,
        views: 20,
        comments: 0,
    },
    {
        id: '3',
        badge: '모집중' as const,
        title: '[Flutter] 플러터 개발 같이 하실 분',
        content: '혹시 플러터 개발 하실 분 있으신가요? 모여서 같이 개발하혹시 플러터 개발 하실 분 있으신가요? 모여서 같이 개발하실 분 구합니다. 혼자서는 도저히 할 용기가 안납니다... 허허',
        author: '조연희',
        time: '3일 전',
        likes: 12,
        views: 20,
        comments: 0,
    },
];

export default function CommunityScreen() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('전체');
    const [searchText, setSearchText] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [sortValue, setSortValue] = useState('최신순');

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* 헤더 */}
            <View style={styles.header}>
                <AppText size="header" weight="bold">커뮤니티</AppText>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
                        <AppText size="lg">🔍</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AppText size="lg">🔔</AppText>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 탭 필터 */}
            <FilterTab activeTab={activeTab} onTabChange={setActiveTab} />

            <FlatList
                data={DUMMY_POSTS}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View>
                        {/* 검색 영역 (검색 아이콘 클릭 시 표시) */}
                        {showSearch && (
                            <SearchBar
                                value={searchText}
                                onChangeText={setSearchText}
                                onSearch={() => {}}
                            />
                        )}

                        {/* 정렬 + 글쓰기 */}
                        <View style={styles.sortRow}>
                            <SortDropdown value={sortValue} onChange={setSortValue} />
                            <TouchableOpacity style={styles.writeButton}>
                                <AppText size="sm" weight="semibold" color={colors.white}>글쓰기 ⊕</AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <PostCard post={item} onPress={() => {}} />
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <AppText size="xl" color={colors.gray2}>⚠️</AppText>
                        <AppText size="md" color={colors.textMain}>등록된 게시글이 없습니다.</AppText>
                        <AppText size="sm" color={colors.gray1}>새로운 게시글을 등록해보세요!</AppText>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    sortRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    writeButton: {
        backgroundColor: colors.textDark,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        marginTop: 100,
    },
});