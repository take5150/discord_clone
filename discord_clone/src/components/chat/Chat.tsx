import React, { useEffect, useState } from 'react'
import "./Chat.scss"
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useAppSelector } from '../../app/hooks';
import { CollectionReference, DocumentData, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import useSubCollection from '../../hooks/useSubCollection';


const  Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => state.channel.channelName)
  const channelId = useAppSelector((state) => state.channel.channelId)
  const user = useAppSelector((state) => state.user.user)
  const {subDocuments: messages} = useSubCollection("Channels", "messages")



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

    setInputText("")

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
          <input type="text" placeholder='メッセージを送信' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} value={inputText}/>
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
