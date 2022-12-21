import {ITodo} from "../types";
import Item from "./Item";
import {useMemo, useRef} from "react";

interface IProps {
    todoList: ITodo[],
    toggleTodo: (id: number) => void,
    removeTodo: (id: number) => void,
}


const Index = (props: IProps) => {
    const {todoList, toggleTodo, removeTodo} = props
    const countLeft = useMemo(() => {
        return todoList.filter(todo => {
            return todo.completed == false
        }).length
    }, [todoList])
    const clearCompleted = () => {
        todoList.map((todo) => {
            if (todo.completed == true) {
                removeTodo(todo.id)
            }
        })
    }
    const toggleAll = () => {
        todoList.map((todo) => {
            if (todo.completed != true) {
                toggleTodo(todo.id)
            }
        })
    }
    const AllChecked = () => {
        return todoList.every((todo) => {
            if (todo.completed == true) {
                return true
            }
        })
    }
    return <div className="todo-list">
        <div style={{marginLeft: "15px", marginTop: "5px", textAlign: "left"}}>
            <input id="toggle-all" type="checkbox" checked={AllChecked()} onChange={() => toggleAll()}></input>
            <label htmlFor="toggle-all" style={{lineHeight:'30px'}}>Mark all as complete</label>
        </div>
        {
            todoList && todoList.map((todo: ITodo) => {
                return <Item todo={todo}
                             removeTodo={removeTodo}
                             toggleTodo={toggleTodo}
                             key={todo.id}/>
            })
        }
        <div className="footer">
            <span style={{float: "left", marginLeft: "30px"}}>{countLeft} items left</span>
            <a id="clear-completed" onClick={() => clearCompleted()}>Clear {todoList.length - countLeft} completed
                items</a>
        </div>
    </div>
}
export default Index

