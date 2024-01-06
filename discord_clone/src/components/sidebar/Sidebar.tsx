import React from 'react'
import "./Sidebar.scss"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import { auth } from '../../firebase';
import { useAppSelector } from '../../app/hooks';


const Sidebar = () => {

  const user = useAppSelector((state)=> state.user);
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
              <SidebarChannel/>
              <SidebarChannel/>
              <SidebarChannel/>
              <SidebarChannel/>
              <SidebarChannel/>
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
