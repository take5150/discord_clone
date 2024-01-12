import React, { useEffect, useState } from 'react'
import "./Sidebar.scss"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import { auth, db } from '../../firebase';
import { useAppSelector } from '../../app/hooks';
// firebase/firestore/liteから取得するとエラーとなってしまった
import { DocumentData, collection, query } from 'firebase/firestore';
import { onSnapshot  } from 'firebase/firestore'

interface Channel {
  id: string,
  channel: DocumentData;
}

const Sidebar = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  const user = useAppSelector((state)=> state.user);

  const q = query(collection(db, "Channels"));
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const channelsResults:Channel[] = [];
      querySnapshot.docs.forEach((doc) => 
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
        })
      );
      setChannels(channelsResults);
    });
  }, [])

  return (
    <div>
      <div className="sidebar">
        {/* サイドバー左 */}
        <div className="sidebarLeft">
          <div className="serverIcon">
            <img src="./logo192.png" alt="" />
          </div>
          <div className="serverIcon">
            <img src="./logo192.png" alt="" />
          </div>
        </div>
        {/* サイドバー右 */}
        <div className="sidebarRight">
          <div className="sidebarTop">
            <h3>Discord</h3>
            <ExpandMoreIcon />
          </div>
          {/* サイドバーチャンネル */}
          <div className="sidebarChannels">
            <div className="sidebarChannelsHeader">
              <div className="sidebarHeader">
                <ExpandMoreIcon />
                <h4>プログラミングチャンネル</h4>
              </div>
              <AddIcon className="sidebarAddIcon"/>
            </div>
            
            <div className="sidebarChannelList">
              {channels.map((channel) => (
                <SidebarChannel channel={channel} id={channel.id} key={channel.id} />
              ))}
            </div>

            <div className="sidebarFooter">
              <div className="sidebarAccount">
                <img src={user?.photo} alt="" onClick={() => auth.signOut()}/>
                <div className="accountName">
                  <h4>{user?.displayName}</h4>
                  <span>#{user?.uid.substring(0, 4)}</span>
                </div>
              </div>

              <div className="sidebarVoice">
                <MicIcon />
                <HeadphonesIcon />
                <SettingsIcon />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
