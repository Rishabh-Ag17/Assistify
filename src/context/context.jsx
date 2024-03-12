import { createContext , useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext()
const ContextProvider = (props) => {
    const [input,setInput] = useState("");
    const [recentprompt, setrecentPrompt] = useState("");
    const [previousprompt,setPreviousprompt] = useState([]);
    const [showres,setShowres] = useState(false);
    const [load,setLoad] = useState(false);
    const [resdata, setResdata] = useState("");

    const delayPara =(index,nextWord) =>{
        setTimeout(function(){
            setResdata(prev=>prev+nextWord)
        },75*index)
    }

    const newChat = ()=>{
        setLoad(false)
        setShowres(false)

    }
    const onSent = async (prompt)=>{
        setResdata("");
        setLoad(true)
        setShowres(true)
        let response;
        if(prompt!==undefined){
            response = await runChat(input);
            setrecentPrompt(prompt)
        }
        else{
            setPreviousprompt(previousprompt=>[...previousprompt,input])
            setrecentPrompt(input)
            response=await runChat(input)
        }
        // setPreviousprompt(previousprompt=>[...previousprompt,input])
        setrecentPrompt(input)
        let responseArray = response.split("**")
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i===0 || i%2!==1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        
        let newResponseArray = newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWords = newResponseArray[i];
            delayPara(i,nextWords+" ")
        }
        setLoad(false)


    }
    
    const contextValue = {
        previousprompt,
        setPreviousprompt,
        onSent,
        setrecentPrompt,
        recentprompt,
        showres,
        load,
        resdata,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider