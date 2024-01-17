import React from 'react'
import "./SidebarChannel.scss"
import { DocumentData } from 'firebase/firestore'
import { useAppDispatch } from '../../app/hooks';
import { setChannelInfo } from '../../features/channelSlice';

type Props = {
  id: string,
  channel: DocumentData
};

const SidebarChannel = (props: Props) => {
  const {id, channel} = props;
  const dispatch = useAppDispatch()
  return (
    <div>
      <div className="sidebarChannel" onClick={()=>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channel.channel.channelname,
          }),
        )
      }>
        <h4>
          <span className='sidebarChannelHash'>#</span>
          {channel.channel.channelname}
        </h4>
      </div>      
    </div>
  )
}

export default SidebarChannel
