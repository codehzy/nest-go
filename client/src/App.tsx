import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { Todo } from "../types/Todo";
import axios from 'axios'

const baseURL = "http://localhost:3333";

const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [newTodoDescription, setNewTodoDescription] = useState<string>("");

    // 获取todos列表
    const fetchTodos = async () => {
        setLoading(true)
        const { data: { data: { res } } } = await axios.request(({
            baseURL: baseURL,
            url: '/todos/findAll',
            method: 'GET'
        }))
        setTodos(res)
        setLoading(false)
    }

    useEffect(() => {
        fetchTodos().then()
        // 获取todos
    }, []);

    const createTodo = async () => {
        // 添加 todo
        setLoading(true)

        const newTodo: Omit<Todo, 'id'> = {
            title: newTodoTitle,
            description: newTodoDescription,
            status: 0
        }

        await axios.request(({
            baseURL: baseURL,
            url: '/todos/createOne',
            method: 'POST',
            data: newTodo
        }))

        setLoading(false)
        await fetchTodos()
    }

    // 改变todoTitle函数
    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value)
    }

    // 改变todoDescription函数
    const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoDescription(e.target.value)
    }

    const deleteTodo = async (title: string) => {
        setLoading(true)
        await axios.request(({
            baseURL: baseURL,
            url: '/todos/deleteOne',
            method: 'DELETE',
            data: {
                title
            }
        }))

        setLoading(false)
        await fetchTodos()
    }

    const changeTodoStatus = async (todo: Todo) => {
        setLoading(true)
        try {
            await axios.request(({
                baseURL: baseURL,
                url: '/todos/updateOne',
                method: 'PUT',
                data: {
                    title: todo.title,
                    description: todo.description,
                    status: todo.status === 0 ? 1 : 0
                }
            }
            ))
        } catch (error) {
            console.error(error)
        }
        fetchTodos()
        setLoading(false)
    }


    return (
        <>
            {loading ? <div>loading...</div> : <div className="App">
                <div>
                    请输入新待办事项： <input type="text" placeholder='请输入新待办事项' onChange={changeTitle} />
                    <br />
                    请输入代办事项描述： <input type="text" placeholder='请输入代办事项描述' onChange={changeDescription} />
                    <br />
                    <button onClick={createTodo}>添加</button>
                </div>

                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <p>待办事项状态：
                                <input type="checkbox" checked={!!todo.status} onChange={() => changeTodoStatus(todo)} />
                            </p>
                            <p>代办事项标题：{todo.title}</p>
                            <small>
                                <strong>待办事项描述:</strong>
                                {todo.description}</small>
                            <div>
                                操作：
                                <button onClick={() => deleteTodo(todo.title)}>移除</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>}

        </>

    );
}

export default App;
