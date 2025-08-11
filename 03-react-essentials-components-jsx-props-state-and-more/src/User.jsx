function User(props){
  return (
    <div id="server">
      <h1>{props.mainTitle}</h1>
      <p>Welcome on board of this course! You got this</p>
      <div id="user">
        <h2>{props.userTitle}</h2>
        <p>{props.profession}</p>
      </div>
    </div>
  )
}

export default User