import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {colors, spacing, typography} from '@/constants/index';
import AppText from './AppText';

// ──────────────────────────────────────────
// 타입 정의
// ──────────────────────────────────────────
interface CalendarProps {
    onDateSelect?: (year: number, month: number, day: number) => void;
    initialDate?: Date;
}

// ──────────────────────────────────────────
// 달력 유틸 함수
// ──────────────────────────────────────────
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

function buildCalendarWeeks(year: number, month: number): (number | null)[][] {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const startOffset = (firstDay + 6) % 7; // 월요일 시작
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = Array(startOffset).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
        week.push(d);
        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }
    if (week.length > 0) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
    }
    return weeks;
}

function getSatSunDays(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const sat: number[] = [];
    const sun: number[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
        const dow = new Date(year, month - 1, d).getDay();
        if (dow === 6) sat.push(d);
        if (dow === 0) sun.push(d);
    }
    return { sat, sun };
}

function getDayColor(
    day: number | null,
    isSelected: boolean,
    sat: number[],
    sun: number[]
): string {
    if (!day) return colors.gray1;
    if (isSelected) return colors.white;
    if (sat.includes(day)) return colors.blue;
    if (sun.includes(day)) return colors.red;
    return colors.gray1;
}

// ──────────────────────────────────────────
// 컴포넌트
// ──────────────────────────────────────────
export default function Calendar({ onDateSelect, initialDate }: CalendarProps) {
    const today = initialDate ?? new Date();
    const TODAY = today.getDate();
    const THIS_YEAR = today.getFullYear();
    const THIS_MONTH = today.getMonth() + 1;

    const [currentYear, setCurrentYear] = useState(THIS_YEAR);
    const [currentMonth, setCurrentMonth] = useState(THIS_MONTH);
    const [selectedDate, setSelectedDate] = useState<number | null>(TODAY);

    const isCurrentMonth = currentYear === THIS_YEAR && currentMonth === THIS_MONTH;
    const calendarWeeks = buildCalendarWeeks(currentYear, currentMonth);
    const { sat, sun } = getSatSunDays(currentYear, currentMonth);
    const monthLabel = `${currentYear}년 ${String(currentMonth).padStart(2, '0')}월`;

    const goPrev = () => {
        if (currentMonth === 1) {
            setCurrentYear(y => y - 1);
            setCurrentMonth(12);
        } else {
            setCurrentMonth(m => m - 1);
        }
        setSelectedDate(null);
    };

    const goNext = () => {
        if (currentMonth === 12) {
            setCurrentYear(y => y + 1);
            setCurrentMonth(1);
        } else {
            setCurrentMonth(m => m + 1);
        }
        setSelectedDate(null);
    };

    const goToday = () => {
        setCurrentYear(THIS_YEAR);
        setCurrentMonth(THIS_MONTH);
        setSelectedDate(TODAY);
    };

    const handleDayPress = (day: number) => {
        setSelectedDate(day);
        onDateSelect?.(currentYear, currentMonth, day);
    };

    return (
        <View style={styles.container}>
            {/* 월 이동 */}
            <View style={styles.monthRow}>
                <TouchableOpacity onPress={goPrev}>
                    <AppText style={styles.chevron}>‹</AppText>
                </TouchableOpacity>
                <AppText style={styles.monthText}>{monthLabel}</AppText>
                <TouchableOpacity onPress={goNext}>
                    <AppText style={styles.chevron}>›</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.todayBadge} onPress={goToday}>
                    <AppText style={styles.todayBadgeText}>오늘</AppText>
                </TouchableOpacity>
            </View>

            {/* 요일 헤더 */}
            <View style={styles.dayHeader}>
                {DAYS.map(d => (
                    <AppText key={d} style={styles.dayLabel}>{d}</AppText>
                ))}
            </View>

            {/* 날짜 */}
            {calendarWeeks.map((week, wi) => (
                <View key={wi} style={styles.weekRow}>
                    {week.map((day, di) => {
                        const isToday = isCurrentMonth && day === TODAY;
                        const isSelected = day === selectedDate;
                        return (
                            <TouchableOpacity
                                key={di}
                                style={styles.dayCell}
                                onPress={() => day && handleDayPress(day)}
                                disabled={!day}
                            >
                                {day ? (
                                    <View style={[
                                        styles.dayCellInner,
                                        isSelected && styles.selectedCircle,
                                    ]}>
                                        <AppText style={[
                                            styles.dayNum,
                                            { color: getDayColor(day, isSelected, sat, sun) },
                                            isToday && !isSelected && styles.todayNum,
                                            isSelected && styles.selectedDayNum,
                                        ]}>
                                            {day}
                                        </AppText>
                                    </View>
                                ) : null}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

// ──────────────────────────────────────────
// 스타일
// ──────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: spacing.md,
    },
    monthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    chevron: {
        fontSize: 22, // size 추가 해야함
        color: colors.textMain,
        paddingHorizontal: spacing.sm,
    },
    monthText: {
        flex: 1,
        textAlign: 'center',
        fontSize: typography.fontSizes.lg,
        fontFamily: typography.fontFamily.semibold,
        color: colors.textMain,
        letterSpacing: -0.4,
    },
    todayBadge: {
        backgroundColor: colors.textMain,
        borderRadius: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    todayBadgeText: {
        color: colors.white,
        fontSize: typography.fontSizes.sm,
        fontFamily: typography.fontFamily.medium,
    },
    dayHeader: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    dayLabel: {
        flex: 1,
        textAlign: 'center',
        fontSize: typography.fontSizes.sm,
        color: colors.gray1,
        fontFamily: typography.fontFamily.medium,
    },
    weekRow: {
        flexDirection: 'row',
        marginBottom: spacing.xs,
    },
    dayCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
    },
    dayCellInner: {
        width: 34,
        height: 34,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCircle: {
        backgroundColor: colors.main,
    },
    dayNum: {
        fontSize: typography.fontSizes.lg,
        fontFamily: typography.fontFamily.regular,
    },
    todayNum: {
        fontFamily: typography.fontFamily.bold,
        color: colors.textMain,
    },
    selectedDayNum: {
        color: colors.white,
        fontFamily: typography.fontFamily.bold,
    },
});

/*
 * [사용법]
 * import Calendar from '@/components/ui/Calendar';
 *
 * // 기본 사용 (날짜 선택 콜백 없이)
 * <Calendar />
 *
 * // 날짜 선택 시 콜백 받기
 * <Calendar
 *     onDateSelect={(year, month, day) => {
 *         console.log(`선택한 날짜: ${year}-${month}-${day}`);
 *     }}
 * />
 *
 * // 홈 화면처럼 카드 안에 넣기
 * <View style={{ margin: 12 }}>
 *     <Calendar
 *         onDateSelect={(year, month, day) => setSelectedDate({ year, month, day })}
 *     />
 * </View>
 *
 * // 스터디룸처럼 그냥 바로 사용
 * <Calendar
 *     onDateSelect={(year, month, day) => fetchStudySchedule(year, month, day)}
 * />
 *
 * [Props]
 * onDateSelect : (year, month, day) => void - 날짜 선택 시 콜백 (선택)
 * initialDate  : Date                       - 초기 날짜 (선택, 기본값: 오늘)
 */