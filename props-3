function Avatar(props) {
  return <img src={props.img} />
}

function Label(props) {
  return <h1>Name: {props.name}</h1>
}

function ScreenName(props) {
  return <h3>Username: {props.username}</h3>
}

function Badge(props) {
  const user = props.user
  return (
    <div>
      <Avatar img={user.img} />
      <Label name={user.name} />
      <ScreenName username={user.username} />
    </div>
  )
}

ReactDOM.render(
  <Badge user={{
    name: 'Tyler McGinnis',
    img: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460',
    username: 'tylermcginnis'
  }} />,
  document.getElementById('app')
)
