import React from 'react'
import "./SidebarChannel.scss"
import { DocumentData } from 'firebase/firestore'

type Props = {
  id: string,
  channel: DocumentData
};

const SidebarChannel = (props: Props) => {
  const {id, channel} = props;
  return (
    <div>
      <div className="sidebarChannel">
        <h4>
          <span className='sidebarChannelHash'>#</span>
          {channel.channel.channelname}
        </h4>
      </div>      
    </div>
  )
}

export default SidebarChannel
