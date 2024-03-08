import React,{useContext} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
const Main = () => {
    const {onSent,recentprompt, showres,load,resdata,setInput,input} = useContext(Context);
    // const {onSent, recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSent();
        }
    };

  return (
    <div className='main'>
        <div className="nav">
            <p>Assistify</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showres
            ?<>
            <div className="welcome">
                <p><span>Hello, User!</span></p>
                <p>How can I assist you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Could you please give me directions to the closest coffee shop? I need a caffeine fix ASAP. Thanks!</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Could you suggest me a few creative and significant ideas to consider for the upcoming hackathons?</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>In what tone should I write the mail to my school principal demanding a day's leave for some work?</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Write me a code snippet function for Sieve of Eratosthenes algorithm for prime numbers in C++ language</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            : <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentprompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {load?
                    <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>:
                    <p dangerouslySetInnerHTML={{__html:resdata}}></p>}
                </div>
            </div>
            }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>{setInput(e.target.value)}} onKeyPress={handleKeyPress} value={input} type="text" placeholder="Enter the prompt here!" />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    Assistify may generate incorrect information! User discretion is advised!!
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
//
//