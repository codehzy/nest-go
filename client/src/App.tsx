import React,{FC,useEffect,useState} from 'react';
import './App.css';
import {Todo} from "../types/Todo";

const App: FC = () => {
  const [todos,setTodos] = useState<Todo[]>([]);

  useEffect(() => {
      // 获取todos
  },[]);

  const addTodo = () => {
      // 添加 todo
  }

  return (
    <div className="App">
      <div>
        <input type="text" placeholder='请输入新待办事项' />
        <button onClick={addTodo}>添加</button>
      </div>

      <ul>
          {todos.map((todo) => {
              return <li key={todo.id}>{todo.title}</li>
          })}
      </ul>
    </div>
  );
}

export default App;
