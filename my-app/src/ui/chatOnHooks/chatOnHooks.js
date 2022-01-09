import React, {useEffect, useRef, useState} from 'react';
import styles from './chatOnHooks.module.css'

const ChatOnHooks = () => {
    const messagesBlockRef = useRef()
    const [messageText, setMessageText] = useState('')
    const [socket, setSocket] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        let baseURL = "social-network.samuraijs.com"
        let localSocket = new WebSocket("wss://" + baseURL + "/handlers/ChatHandler.ashx")
        setSocket(localSocket)
    }, [])

    if (socket) {
        socket.onmessage = (messageEvent) => {
            const messages = JSON.parse(messageEvent.data)
            setUsers([...users, ...messages])
            messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight)
        }
    }


    const onMessageChange = (e) => {
        setMessageText(e.currentTarget.value)
    }

    const sendMessage = () => {
        socket.send(messageText)
        setMessageText('')
    }

    return (
        <div className={styles.chat}>
            <div className={styles.messages} ref={messagesBlockRef}>
                {users.map(({photo, userName, message, userId}, index) => <div
                        className={styles.message}
                        key={index}>
                        <img src={photo} alt="photo"/>
                        <b>{userName}</b>
                        <span>{message}</span>
                    </div>
                )}
            </div>
            <div className={'footer'}>
                <textarea onChange={onMessageChange} value={messageText}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatOnHooks;