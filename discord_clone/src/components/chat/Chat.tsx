import React, { useEffect, useState } from 'react'
import "./Chat.scss"
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useAppSelector } from '../../app/hooks';
import { CollectionReference, DocumentData, Timestamp, addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface Messages {
  timestamp: Timestamp;
  message: String;
  user: {
    uid: string,
    photo: string,
    email: string,
    displayName: string
  }
}

const  Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([])
  const channelName = useAppSelector((state) => state.channel.channelName)
  const channelId = useAppSelector((state) => state.channel.channelId)
  const user = useAppSelector((state) => state.user.user)

  useEffect(() => {
    let collectionRef = collection(db, "Channels", String(channelId), "messages")
    onSnapshot(collectionRef, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        })
      });
      setMessages(results);
    })
  }, [channelId]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // channelsコレクションにあるmessageコレクションの中にメッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(
      db, 
      "Channels", // 親コレクション名
      String(channelId), //親子コレクションID
      "messages" // 子コレクション名
    );

    const docRef = await addDoc(collectionRef,{
      message: inputText,
      timestamp:serverTimestamp(),
      user: user
    });

  }
  
  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message.message}
            timestamp={message.timestamp}
            user={message.user} />
        ))}
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form action="">
          <input type="text" placeholder='メッセージを送信' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}/>
          <button type='submit' className='chatInputButton' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)} >
            送信
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon/>
        </div>
      </div>
    </div>
  )
}

export default  Chat
