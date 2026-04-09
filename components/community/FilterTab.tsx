// 탭 필터
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing } from '@/constants/index';
import AppText from '@/components/ui/AppText';

const TABS = ['전체', '모집중', '모집완료', '일반'];

interface FilterTabProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function FilterTab({ activeTab, onTabChange }: FilterTabProps) {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.container}
            >
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={styles.tab}
                        onPress={() => onTabChange(tab)}
                    >
                        <AppText
                            size="md"
                            weight={activeTab === tab ? 'semibold' : 'regular'}
                            color={activeTab === tab ? colors.main : colors.gray1}
                        >
                            {tab}
                        </AppText>
                        {activeTab === tab && <View style={styles.underline} />}
                     </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 48,
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray4,
    },
    tab: {
        flex: 1,
        paddingHorizontal: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: colors.main,
    },
});