import React from 'react'
import Header from "./components/Header"
import TodoItem from "./components/TodoItem"
import todosData from "./todosData"

function App(){

//  const date = new Date()
//  const hours = date.getHours()

//  let timeOfDay

//  if(hours < 12) {
//    timeOfDay = "morning"
//  } else if (hours >= 12 && hours < 17){
//    timeOfDay = "afternoon"
//  } else {
//    timeOfDay = "night"
//  }

  const todoItems = todosData.map(item => <TodoItem key={item.id} item={item} />)
  return(
   
     <div className="todo-list">
         {/* <h1>Good {timeOfDay}!</h1> */}
       <Header />
        {todoItems}
     </div>
  )
}


export default App