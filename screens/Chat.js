import { useState, useEffect, useRef, useCallback } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TimeStamp, SelfPOV, OppPOV } from "../components/ChatComponents";
import { Theme, Typeface } from "../utils/Theme";
import moment from "moment";
import { useTranslation } from "react-i18next";

const { colors } = Theme;

export default function Chat({ route, navigation }) {
    console.log(route.params)
    const msgData = [];
    const { t } = useTranslation();
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState(msgData); // Assuming msgData is your initial array of messages
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const scrollViewRef = useRef();
    
    // Function to handle sending message
    const handleSend = () => {
        if (msg.trim()) {
            const newMessage = {
                text: msg,
                time: new Date().getTime(), // Generate a timestamp for the message
                user: { id: 1 } // Mock user ID for the sender
            };

            sendMessageToDatabase(newMessage)
                .then(() => {
                    setMessages(prevMessages => [...prevMessages, newMessage]); // Add new message to state
                    setMsg(''); // Clear input box
                    Keyboard.dismiss(); // Dismiss keyboard
                })
                .catch((error) => {
                    console.error("Failed to send message:", error);
                });
        }
    };

    // Mock function to simulate sending a message to a database
    const sendMessageToDatabase = async (message) => {
        console.log("Message to be sent to the database:", message);
        return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async database operation
    };

    // Format time for time stamps
    const formatTime = useCallback((timestamp) => {
        if (moment(timestamp).isSame(moment(), 'day')) {
            return t('screen.chat.today');
        } else {
            return moment(timestamp).format("ddd, D MMM YYYY");
        }
    }, [t]);

    // Render messages in the chat area
    function renderMsg(messages) {
        const ordered = messages.sort((a, b) => a.time - b.time); // Note: Fixed sorting to show messages chronologically
        let prevDate = null;

        const components = [];

        ordered.forEach(msg => {
            const currentDate = new Date(msg.time).toISOString().slice(0, 10);
            if (currentDate !== prevDate) {
                components.push(<TimeStamp key={msg.time + "-time"} time={formatTime(msg.time)} />);
                prevDate = currentDate;
            }

            if (msg.user.id === 1) {
                components.push(<SelfPOV key={msg.time + "-self"} msg={msg.text} />);
            } else {
                components.push(<OppPOV key={msg.time + "-opp"} msg={msg.text} />);
            }
        });

        return components;
    }

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <View style={styles.container}>
                <SafeAreaView style={styles.topContainer}>
                    {/* Book and Owner Info */}
                    <View style={styles.pageHeader}>
                    <Image source={{uri: `https://cs350-bookswap-backend-production.up.railway.app${route.params.image}`}} style={[styles.image]}/>
                        <View style={styles.bookInfoContainer}> 
                            <Text style={[styles.text, styles.ownerText]}>{ route.params.owner }</Text>
                            <Text style={[styles.text, styles.titleText]}>{route.params.bookTitle}</Text>
                            <Text style={[styles.text, styles.authorText]}>{route.params.bookAuthor}</Text>
                        </View>
                    </View>

                    {/* Chat Area */}
                    <ScrollView 
                        ref={scrollViewRef}
                        style={styles.chatArea}
                        contentContainerStyle={{
                            paddingBottom: keyboardVisible ? 100 : 10,
                            paddingTop: 10,
                        }}
                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                    >
                        <View style={styles.msgContainer}>
                            {renderMsg(messages)}
                        </View>
                    </ScrollView>
                </SafeAreaView>

                {/* Chat Entry */}
                <View style={[styles.msgInput, styles.layerShadowUp, { paddingBottom: keyboardVisible ? 20 : 10 }]}> 
                    <View style={styles.componentContainer}>
                        <TextInput
                            style={styles.msgBox}
                            onChangeText={setMsg}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                            value={msg}
                            placeholder={t('screen.chat.msg')}
                            placeholderTextColor="rgba(31, 30, 30, 0.4)"
                        />
                        <TouchableOpacity onPress={handleSend}>
                            <Ionicons name="send" size={25} color={colors.PrimaryBlue} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.White,
        flex: 1,
    },
    topContainer: {
        marginHorizontal: 32,
        flex: 1,
    },
    text: {
        fontFamily: Typeface.font,
        color: colors.Black,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    pageHeader: {
        flexDirection: "row",
        flex: 0,
        columnGap: 10,
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
        backgroundColor: colors.White,
        padding: 15,
        borderRadius: 10,
    },
    bookInfoContainer: {
        gap: 5,
    },
    ownerText: {
        fontWeight: "700",
        fontSize: 20,
        color: colors.PrimaryBlue,
    },
    titleText: {
        fontSize: 14,
        color: colors.PrimaryBlue,
    },
    authorText: {
        fontSize: 12,
        fontWeight: "300",
    },
    msgInput: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.White,
        paddingHorizontal: 32,
        paddingTop: 15,
    },
    componentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    msgBox: {
        borderWidth: 0.75,
        borderRadius: 20,
        width: "90%",
        minHeight: 30,
        paddingHorizontal: 10,
        borderColor: colors.PrimaryBlue,
    },
    layerShadowUp: {
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 10,
    },
    chatArea: {
        flex: 1,
    },
    msgContainer: {
        flexDirection: "column",
        gap: 10,
    }
});
