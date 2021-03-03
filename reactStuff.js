import React from "react";
import Marked from "marked";
import "./index.css";
import "/Users/WINUSER/Desktop/fontawesome-free-5.15.2-web/css/all.css";


export const Presentational = (props) => (
  <App propys={props} />
)

const App = (props) => {
  props=props.propys;
  
  const todosToRender = (() => {
    return props.todos.map((todo, i)=> {
      return (
        <ToDo 
          key={i}
          todoText={todo.todoText}
          delTodo={props.delTodo} //fx
          editTodo={props.editTodo} //fx
          handleTodoInput={props.handleTodoInput} //fx
          todoEditing={todo.todoEditing}
          color={todo.color}
          id={todo.todoId}
        />
      );
    })
  })()

  return (
    <div id="pageWrapper">
      <div id="notice">
        <span>You can write markdown</span>
        <i onClick={()=>{document.getElementById("notice").remove()}} className="fas fa-times"></i>
      </div>
      <h1 className="title">A simple ToDo App{" "}
      <i className="fas fa-clipboard-check"></i>
      </h1>
      <div>
        <EntryBar
          handleEntryBarChange={props.handleEntryBarChange}
          entryBarValue={props.entryBar.value}
          createTodo={props.createTodo}
          color={props.entryBar.color}
        />
        <div className="todosWrapper">
        {todosToRender}
        </div>
      </div>
    </div>
  );
}

const EntryBar = (props) => {

  return (
    <div className="entrybarWrapper">
      <textarea
        value={props.entryBarValue}
        onChange={props.handleEntryBarChange.bind(this)}
        placeholder="Write Your Todo Here..."
      />
      <TodoButton 
        icon="plus" 
        buttonCategory="addButton"
        color={props.color}
        onClick={props.createTodo}
      />
    </div>
  )
}

const TodoButton = (props) => {
  return (
    <div className="todoButtonWrapper">
      <button
        className="todoButton"
        style={{color: props.color}}
        onClick={props.onClick}
      >
        <i className={`fas fa-${props.icon||"pen pen"} ${props.buttonCategory||"sideButtons"}`}></i>
      </button>
    </div>
  )
}

const ToDo = (props) => {

  const todoSheet = (() => {
    return props.todoEditing
      ? (
        <textarea 
          id={`textarea${props.id}`}
          className="todo"
          style={{background: props.color, boxShadow: `0px 0px 5px 1px ${props.color}`}}
          value={props.todoText}
          onChange={props.handleTodoInput.bind(this, props.id)}
          >
        </textarea>
      )
      : (
        <div 
          className="todo"
          style={{background: props.color}}
          dangerouslySetInnerHTML={{__html: Marked(props.todoText, {breaks: true})}}>
        </div>
      )
      
  })()
  return (
    <div className="todoWrapper">
      {todoSheet}
      <div className="sideButtonsWrapper">
        <TodoButton 
          onClick={props.editTodo.bind(this, props.id)}
          color={props.color}
        />
        <TodoButton 
          icon="times"
          onClick={props.delTodo.bind(this, props.id)}
          color="#db3236"
        />
      </div>
    </div>
  )
}