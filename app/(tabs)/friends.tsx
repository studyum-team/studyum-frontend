import { View, Text, StyleSheet } from 'react-native';

export default function FriendListScreen() {
    return (
        <View style={styles.container}>
            <Text>친구 목록</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});