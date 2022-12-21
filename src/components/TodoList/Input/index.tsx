import {ITodo} from "../types";
import {useRef} from "react";

interface IProps {
    addTodo: (todo: ITodo) => void,
    todoList: ITodo[]
}

const Input = (props: IProps) => {
    const {addTodo, todoList} = props
    // 必须指定useRef的类型, 否则会报错
    const inputRef = useRef<HTMLInputElement>(null)
    const addItem = (): void => {
        // !表示非空断言,表示这里一定不为空, 否则TS会提示 TS2531: Object is possibly 'null'.
        const val: string = inputRef.current!.value.trim()
        if (val.length) {
            const isExist = todoList.find(todo => todo.content == val)
            if (isExist) {
                alert("content already exist!")
                return
            }
            addTodo({
                id: new Date().getTime(),
                content: val,
                completed: false
            })
        }
    }
    return <form className="todo-input" onSubmit={addItem}>
        <input type="text" placeholder="What needs to be done?" ref={inputRef}/>
    </form>
}
export default Input
