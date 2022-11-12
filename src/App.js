import avatarImg from './picture/avatat.jpg'
import sendImg from './picture/send.png'
import ellipsisImg from './picture/ellipsis.png'
import restImg from './picture/rest state.webp'
import UserMsg from './components/userMsg'
import regexArray from './components/words'
import replies from './components/reply'
import './index.css'
import { useEffect, useRef, useState } from 'react'
import BotMsg from './components/botMsg'
function App() {
  const alternative = [
    "same",
    "go on...",
    "try again",
    "im listenning",
    "i dont understand",
    "omoshirohie"
];
let badWord = ['fuck', 'bitch', 'dick', 'pussy']
  let input = useRef()
  let chatBody = useRef()
  let [childMode, setchildMode] = useState(false)
  let [sujestArrComp, setSujestArrComp] = useState([])
  let [msgArray, setMsgArray]= useState([])
  let [displayOpt, setDisplayOpt] =  useState(false)
  let [sujestArr, setSujestArr] =  useState(null)
  let chatBodyref =useRef()
  let sendMsg =()=>{
    if (!/\w/.test(input.current.value)) return alert(`YOU CAN'T SEND EMPTY MESSAGES`)
    let currentMsg = msgArray.concat(<UserMsg msg={input.current.value} avatarImg={avatarImg} key={msgArray.length}/>)
    let pattern = input.current.value.split(' ')
    if (childMode) {
      for (const value of badWord) {
        let regPattern = new RegExp(`(${value})`, 'gi')
        for (const key of pattern) {
          if(regPattern.test(key)){
            reply('bad word', currentMsg)
            input.current.value = ''
            return 
          }
        }
      }
    }
    setMsgArray(currentMsg)
    setSujestArrComp(sujestArrComp.concat(indexChecker(input.current.value.split(' '))))
    reply(input.current.value, currentMsg)
    input.current.value = ''
  }
  let indexChecker = (array)=>{
    let returnArray = []
    for (let ele of array) {
      if(!returnArray.includes(ele, 0)){
        returnArray.push(ele)
      }
    }
    return returnArray
    }
  let reply =(msg, currentMsg)=>{
    if (msg === 'bad word') {
      let adequeteReply = 'Your message will not be replied cause child mode is on. Turn of child mode to use bad words :)'
      let currentMsgbot = currentMsg.concat(<BotMsg msg={adequeteReply} avatarImg={avatarImg} key={currentMsg.length}/>)
      setTimeout(()=> setMsgArray(currentMsgbot), 2000)
      return 
    }
    let adequeteReply = alternative[Math.floor(Math.random()*alternative.length)]
    for (let index = 0; index < regexArray.length; index++) {
      for(let index2 = 0; index2< regexArray[index].length; index2++){
        let item = regexArray[index][index2]
        let regularExp = new RegExp(`(${item})`,'gi')
        if(regularExp.test(msg)){
          let array = replies[index]
          adequeteReply = array[Math.floor(Math.random()*array.length)]
          let currentMsgbot = currentMsg.concat(<BotMsg msg={adequeteReply} avatarImg={avatarImg} key={currentMsg.length}/>)
          setTimeout(()=> setMsgArray(currentMsgbot), 2000)
          return 
        }
      }
    }
    let currentMsgbot = currentMsg.concat(<BotMsg msg={adequeteReply} avatarImg={avatarImg} key={currentMsg.length}/>)
    setTimeout(()=> setMsgArray(currentMsgbot), 2000)
  }
  let sujestionFunc =()=>{
    let pattern = input.current.value.split(' ')
    let currentPattern = pattern[pattern.length - 1]
    if (currentPattern[currentPattern.length-1] == '\\' || currentPattern[currentPattern.length-1] === '+' || currentPattern[currentPattern.length-1] === '?'){
      alert('symbols like this could make the bot not give adequate answers')
    }
    let reg = new RegExp(`${currentPattern}`,'gi')
    let sujestMap = sujestArrComp.map((index, id)=>{      
      if (reg.test(index)) { 
        return <div onClick={()=>{pattern[pattern.length - 1] = index; input.current.value = pattern.join(' ')}} className={ id === 1? 'sujest first': 'sujest'} key={id}>{index}</div>
      }
    })
    if (currentPattern === '' || currentPattern === ' ') {
      sujestMap = null
    }
    setSujestArr(sujestMap)
  }
  useEffect(()=>{
    if (msgArray.length !== 0) chatBodyref.current.scrollTop = msgArray.length * 100
  }, [msgArray])
  return (
    <>
    <div className="chatbotBody">
      <div className="top">
        <img className='avatar' src={avatarImg}></img>  
        <div className="right">
          <div className="rightTop">
            <form>
              <input onChange={sujestionFunc} ref={input} placeholder={'send a message'}></input>
              <img src={sendImg} onClick={sendMsg}></img>
            </form>
            <img src={ellipsisImg} onClick={()=>setDisplayOpt(!displayOpt)}></img>
            {displayOpt? 
            <ul className='opt'>
              <li className={childMode ? 'active' : ''} onClick={()=> setchildMode(!childMode) }>Child mode</li>
              <li className='' onClick={()=> setMsgArray([])}>Clear chat</li>
            </ul> : null}
          </div>
          <div className="rightBottom" ref={chatBody}>
            {sujestArr}
          </div>
        </div>
      </div>
      <div className="bottom">
        { msgArray.length === 0 ? <img className='restImg' src={restImg}></img> : 
        <div ref={chatBodyref} className="chatbotMessages">
          {msgArray}
        </div>}
      </div>
    </div>
    </>
  );
}

export default App;
