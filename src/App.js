import { useState } from "react";

import './App.css'

function App() {
 
    const [toDos, setTodos] = useState([])
   const [toDo, setTodo] = useState("")
   const [error, setError] = useState(null)
   const [edit, setEdit] = useState(null)
   const [select,selectTodo]=useState(false)
   function handleChange(evt) {

      if (evt.target.value) {
         setTodo(evt.target.value)
      }

   }
   function addTodo() {
      setError(null);
      selectTodo(null)
      setEdit(null)
      if (!toDo) {
         setError("Please add your List");
         return;
      }

      if (toDos.some(item => item === toDo)) {
         setError("Todo is already exist");
         return;
      }

      setTodos([...toDos, toDo]);
      setTodo(null)
   }
   function deleteTodo(props) {

      const newlist = toDos.filter(todo => todo !== props);
      setTodos([...newlist])
   }

   function editCall(props) {
      setEdit(null)
      selectTodo(null)
      setEdit(props)


   }

   function editChange(evt) {
      if (evt.target.value) {
         setTodo(evt.target.value)
      }
   }

   function editTodo(props) {
      setEdit(null)
      setError(null);
      selectTodo(null)
      if (!toDo) {
         setError("Please add your List");
         return;
      }

      if (toDos.some(item => item === toDo)) {
         setError("Todo is already exist");
         return;
      }

      var editIndex=toDos.findIndex((item)=>item===props)
      const arrayList=[...toDos]
      arrayList[editIndex]=toDo
      const List=arrayList[editIndex]
      setTodos([...arrayList])
   }
function selectList(){
   selectTodo(true)
}
function unselectList(){
   selectTodo(false)
}



return (

   <div className="app">

      
      <div className="mainHeading">
         <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
         <br />
         <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      {
         (error) && <h4>{error}</h4>
      }
      {
         (!edit) ?<div className="input">
         <input onChange={handleChange} type="text" placeholder="🖊️Add item... " />
         <i onClick={addTodo} className="fas fa-plus"></i>

      </div>  :
            <div className="input">
            <input onChange={editChange} type="text" placeholder={edit}  />
            <i onClick={() => { editTodo(edit) }} className="fas fa-edit"  ></i>

         </div>
      }

      {(toDos) &&
         toDos.map((item, index) =>
            <div className="todos">
               <div className="todo">
                  <div className="left">
                     <input onMouseEnter={()=>{selectList(item)}} onMouseLeave={()=>{unselectList(item)}} type="checkbox" name="" id="" />
                     {(select)?<p style={{textDecoration:'line-through'}} key={item}>{item}</p>: <p  key={item}>{item}</p>}
                    
                     <div className="right">
                        <i onClick={() => { deleteTodo(item) }} className="icon fas fa-times"></i>
                        <i onClick={() => { editCall(item) }} className="fas fa-edit"></i>
                     </div>
                  </div>
               </div>
            </div>

         )}

   </div>

)

}

export default App;
