import {ITodo} from "../types";

interface IProps {
    todo: ITodo,
    toggleTodo: (id: number) => void,
    removeTodo: (id: number) => void,
}

const Item = (props: IProps) => {
    const {todo, toggleTodo, removeTodo} = props
    const {id, content, completed} = todo
    return <div className="todo-item">
        <div>
            <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)}/>
            <span style={{textDecoration: completed ? "line-through" : ""}}>{content}</span>
        </div>
        <button onClick={() => removeTodo(id)}>删除</button>
    </div>
}
export default Item

