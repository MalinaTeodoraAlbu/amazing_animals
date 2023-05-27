import Conversation from "../conversations/Conversations";
import Message from "../message/message";
import "./messanger.css";

export default function Messanger(){
    return (
        <div className="messanger">
            <div className="chatMenu"> 
            <div className="chatMenuWrapper"> 
            <input placeholder="Search for friends" className="chatMenuInput" />
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
            </div>
            </div>
            <div className="chatBox"> 
            <div className="chatBoxWrapper"> 
            <div className="chatBoxTop">
           <Message></Message>
           <Message own={true}></Message>
           <Message></Message>
           <Message own={true} ></Message>
           <Message></Message>
           <Message own={true} ></Message>
           <Message></Message>
           <Message own={true} ></Message>
           <Message></Message>
           <Message own={true} ></Message>
            </div>
            <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    
                  ></textarea>
                  <button className="chatSubmitButton" >
                    Send
                  </button>
                </div>
            </div></div>
            
        </div>
    )
}