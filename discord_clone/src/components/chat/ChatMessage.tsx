import React from 'react'
import "./ChatMessage.scss"
import { Avatar } from '@mui/material'

function ChatMessage() {
  return (
    <div className="message">
      <Avatar/>
      <div className="messageInfo">
        <h4>
          Take Code
          <span className='messageTimestamp'>2024/01/05</span>
        </h4>

        <p>メッセージ本文</p>
      </div>
    </div>
  )
}

export default ChatMessage
