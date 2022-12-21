export interface ITodo {
    id: number,
    content: string,
    completed: boolean
}

// IState表示useReducer的state
export interface IState {
    todoList: ITodo[]
}

// IAction表示useReducer的action
export interface IAction {
    type: ACTION_TYPE,
    payload: ITodo | number
}

export enum ACTION_TYPE {
    ADD_TODO = "ADD_TODO",
    REMOVE_TODO = "REMOVE_TODO",
    TOGGLE_TODO = "TOGGLE_TODO"
}
