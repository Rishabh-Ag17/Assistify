import React, {useState, useContext} from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context';

const Sidebar = () => {

    const [collapsed,setCollapsed] = useState(false);
    const {onSent,previousprompt,setrecentPrompt,newChat} =  useContext(Context)

    const loadPrompt = async(prompt)=>{
        setrecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick = {()=>setCollapsed(last=>!last )}className="menu" src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {collapsed?<p>New Chat</p>:null}
            </div>
            {collapsed?
            <div className="recent">
                <p className="recent-title">Recent</p>
                {previousprompt.map((item,index)=>{
                    return (
                        <div onClick={()=>loadPrompt(item)} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)}</p>
                        </div>
                    )
                })}
            </div>
            :null}
        </div>

        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {collapsed?<p>Help!</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {collapsed?<p>History</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {collapsed?<p>Settings</p>:null}
            </div>
        </div>

    </div>
  )
}

export default Sidebar