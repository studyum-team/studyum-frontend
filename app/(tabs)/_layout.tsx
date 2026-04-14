// 탭 네비게이션 설정
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TabIconProps {
    focused: boolean;
    label: string;
}

const TabIcon = ({ focused, label }: TabIconProps) => (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{label}</Text>
)

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
        initialRouteName="index"
        screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
        <Tabs.Screen
            name="friends"
            options={{
                title: '친구 목록',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="👥" />,
            }}
        />
        <Tabs.Screen
            name="chat"
            options={{
                title: '채팅',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="💬" />,
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
                title: '홈',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="🏠" />,
            }}
        />
        <Tabs.Screen
            name="community"
            options={{
                title: '커뮤니티',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="🗣️" />,
            }}
        />
        <Tabs.Screen
            name="mypage"
            options={{
                title: '마이페이지',
                tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="👤" />,
            }}
        />
    </Tabs>
  );
}
