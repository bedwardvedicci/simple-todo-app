import { createStore } from "redux";

const CRTODO = "CRTODO";
const DELTODO = "DELTODO";
const EDITTODO = "EDITTODO";
const TODOINPUT = "TODOINPUT";
const BARINPUTCHANGE = "BARINPUTCHANGE";

const createTodo = () => ({
  type: CRTODO
})

const handleEntryBarChange = (e) => ({
  type: BARINPUTCHANGE
  , value: e.target.value
})

const delTodo = (id) => ({
  type: DELTODO
  , id
})

const editTodo = (id) => ({
  type: EDITTODO
  , id
})

const handleTodoInput = (id, e) => {
  return ({
    type: TODOINPUT
    , value: e.target.value
    , id
  });
}

const initialState = {
  todos: []
  , entryBar: {
    value: ""
    , color: "#3cba54"
  }

}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case CRTODO
    : {
      const colors = ["#3cba54", "#f4c20d", "#4885ed"];
      const nextColorIndex = (colors.indexOf(state.entryBar.color)+1)%3;
      
      return state.entryBar.value
      ? ({...state, todos: [...state.todos, {
        todoText: state.entryBar.value
        , todoId: state.entryBar.value.length*Math.random(10)
        , todoEditing: false
        , color: state.entryBar.color
      }]
      , entryBar: {
        ...state.entryBar
        , value: ""
        , color: colors[nextColorIndex]
      }
      })
      : state
    }
    case EDITTODO
    : {
      const editingToggled = state.todos.map(todo=>{
        if(todo.todoId === action.id){
          todo.todoEditing = !todo.todoEditing;
        }
        if(todo.todoEditing) setTimeout(()=>{
          const textarea = document.getElementById(`textarea${action.id}`);
          const textLength = textarea.value.length;
          textarea.focus();
          textarea.setSelectionRange(textLength, textLength);
        })
        return todo;
      });

      return {
        ...state
        , todos: [...editingToggled]
      }
    }
    case DELTODO
    : {
      return ({
        ...state
        , todos: state.todos.filter(todo => todo.todoId!==action.id)
      });
    }
    case TODOINPUT
    : {
      const editedInput = state.todos.map(todo=>{
        if(todo.todoId === action.id) {
          todo.todoText = action.value;
        }
        return todo;
      })
      return {...state, todos: [...editedInput]};
    }
    case BARINPUTCHANGE
    : {
      return ({...state, entryBar: {...state.entryBar, value: action.value}})
    }
    default
    : return state
  }
}

export const store = createStore(reducer);

export const mapStateToProps = (state) => ({
  entryBar: state.entryBar
  , todos: state.todos
})

export const mapDispatchToProps = (dispatch) => ({
  createTodo: () => dispatch(createTodo())
  , delTodo: (id) => dispatch(delTodo(id))
  , editTodo: (id) => dispatch(editTodo(id))
  , handleEntryBarChange: (e) => dispatch(handleEntryBarChange(e))
  , handleTodoInput: (id, e) => dispatch(handleTodoInput(id, e))
})