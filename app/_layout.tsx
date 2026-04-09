// 앱 전체 레이아웃
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from '@expo-google-fonts/inter'; // font import
import * as SplashScreen from 'expo-splash-screen'; // SplashScreen
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync(); // SplashScreen

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
    }); // useFonts 폰드 로드 여부 확인

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]); // useEffect 폰트 로드 완료시 splash 숩기기

    if (!fontsLoaded) return null; // 폰트 로드 전 렌더링 방지

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
