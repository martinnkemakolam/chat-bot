function BotMsg({msg, avatarImg}) {
    return(
        <div className="botMsg">
            <img className='avatar msg' src={avatarImg}></img>
            <p>{msg}</p>
          </div>
    )
}

export default BotMsg