import Input from "./Input";
import List from "./List";
import {useCallback, useEffect, useReducer} from "react";
import {ACTION_TYPE, IAction, IState, ITodo} from "./types";
import "./index.css"


const TodoList = () => {
    // useReducer的init参数
    function todoInit(initValue: ITodo[]): IState {
        return {todoList: initValue}
    }

    // useReducer的reducer方法
    function todoReducer(state: IState, action: IAction) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPE.ADD_TODO:
                return {
                    todoList: [...state.todoList, payload as ITodo]
                }
            case ACTION_TYPE.REMOVE_TODO:
                return {
                    todoList: state.todoList.filter(todo => todo.id != payload)
                }
            case ACTION_TYPE.TOGGLE_TODO:
                return {
                    todoList: state.todoList.map(todo => {
                        return todo.id === payload ? {...todo, completed: !todo.completed} : {...todo}
                    })
                }
            default:
                return state
        }
    }
    // ?? 空值运算符,如果为空,则返回??运算符后面的值
    const [state, dispatch] = useReducer(todoReducer, JSON.parse(localStorage.getItem("todolist") ?? "[]"), todoInit)
    const addTodo = useCallback((todo: ITodo): void => {
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    },[])

    const removeTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    },[])

    const toggleTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    },[])

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(state.todoList))
    }, [state.todoList])

    return <div className="todo-container">
        <h1>Todos</h1>
        <Input todoList={state.todoList} addTodo={addTodo}></Input>
        <List todoList={state.todoList} toggleTodo={toggleTodo} removeTodo={removeTodo}></List>
    </div>
}
export default TodoList
