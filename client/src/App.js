import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import {useEffect, useState} from 'react'
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [tasks, setTasks] = useState(null)



  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()

      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }}
      , [])

  console.log(tasks)
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return (
    <div className= "app">
      {!authToken && <Auth></Auth>}
      {authToken && 
      <>
      <ListHeader listName={"Holiday Check List"} getData={getData}></ListHeader>
      <p className="user-email">Welcome back {userEmail}</p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}</>}
      <p className="copyright">©️ Creative Coding LLC</p>
    </div>
  );
}

export default App;
