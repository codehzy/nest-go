import React, { useEffect, useRef, useState } from "react";
import { Todo as TodoType } from "../../../types/Todo";
import axios from "axios";
import { BASEURL } from "../../config/baseUrl";
import { Button, message, Input, Divider } from 'antd';
import classes from "./Todo.module.css";

const baseURL = BASEURL;

export const Todo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const renderRef = useRef(true);
  const [hasToken, setToken] = useState<boolean>(true);

  // 获取todos列表
  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warn("请先登录");
      setToken(false);
    }
    setLoading(true);
    try {
      const {
        data: {
          data: { res },
        },
      } = await axios.request({
        baseURL: baseURL,
        url: "/todos/findAll",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res);
    } catch (error) {
      setToken(false);
      message.warn("获取todos列表失败,可能是身份过期导致，请重新登录");
    }
    setLoading(false);
  };

  useEffect(() => {
    // 重要!!!
    if (renderRef.current) {
      renderRef.current = false;
      return;
    }
    fetchTodos();
    // 获取todos
  }, []);

  const createTodo = async () => {
    if (!newTodoTitle || !newTodoDescription) {
      message.warning("请检查代办事项或者代办事项描述是否为空");
      return
    }

    // 添加 todo
    setLoading(true);

    const newTodo: Omit<TodoType, "id"> = {
      title: newTodoTitle,
      description: newTodoDescription,
      status: 0,
    };

    await axios.request({
      baseURL: baseURL,
      url: "/todos/createOne",
      method: "POST",
      data: newTodo,
    });

    setLoading(false);
    await fetchTodos();
  };

  // 改变todoTitle函数
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  // 改变todoDescription函数
  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoDescription(e.target.value);
  };

  const deleteTodo = async (title: string) => {
    setLoading(true);
    await axios.request({
      baseURL: baseURL,
      url: "/todos/deleteOne",
      method: "DELETE",
      data: {
        title,
      },
    });

    setLoading(false);
    await fetchTodos();
  };

  const changeTodoStatus = async (todo: TodoType) => {
    setLoading(true);
    try {
      await axios.request({
        baseURL: baseURL,
        url: "/todos/updateOne",
        method: "PUT",
        data: {
          title: todo.title,
          description: todo.description,
          status: todo.status === 0 ? 1 : 0,
        },
      });
    } catch (error) {
      console.error(error);
    }
    fetchTodos();
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className={classes.todoList}>
          <div>
            请输入新待办事项：{" "}
            <Input
              type="text"
              placeholder="请输入新待办事项"
              onChange={changeTitle}
            />
            请输入代办事项描述：{" "}
            <Input
              type="text"
              placeholder="请输入代办事项描述"
              onChange={changeDescription}
            />
            <Button onClick={createTodo} disabled={!hasToken} type="primary">
              添加
            </Button>
          </div>
          <Divider plain>代办事项</Divider>

          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                待办事项状态：
                <input
                  type="checkbox"
                  checked={!!todo.status}
                  onChange={() => changeTodoStatus(todo)}
                />
                {!!todo.status ? (<strong>完成</strong>): (<strong>等待完成</strong>)}
                <p>
                  <strong>代办事项标题：</strong>
                  {todo.title}
                </p>
                <p>
                  <strong>待办事项描述：</strong>
                {todo.description}
                </p>
                <div>
                  操作：
                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteTodo(todo.title)}
                  >
                    移除
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
