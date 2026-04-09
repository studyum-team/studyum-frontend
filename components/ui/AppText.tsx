// 텍스트
import { Text, TextStyle, TextProps } from 'react-native';
import { colors, typography } from '@/constants/index';
interface AppTextProps extends TextProps {
    children: React.ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'| 'header';
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
    color?: string;
    style?: TextStyle;
}

export default function AppText({
                                    children,
                                    size = 'md',
                                    weight = 'regular',
                                    color = colors.textDark,
                                    style,
                                    ...props
                                }: AppTextProps) {
    return (
        <Text
            style={[
                {
                    fontSize: typography.fontSizes[size],
                    fontFamily: typography.fontFamily[weight],
                    color,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}

/*
<AppText size="header" weight="bold">제목</AppText>
<AppText size="md" weight="regular" color={colors.textMain}>본문</AppText>
<AppText size="sm" color={colors.gray1}>작은 텍스트</AppText>

사용법
 */