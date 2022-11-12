
function UserMsg({msg, avatarImg}) {
    return(
    <div className="userMsg">
        <p>{msg}</p>
        <img className='avatar msg' src={avatarImg}></img>
    </div>
    )
}

export default UserMsg