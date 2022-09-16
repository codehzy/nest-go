import React, { FC } from 'react';
import './App.css';
import { Todo } from './components/Todo/Todo';
import { SignIn } from './components/SignIn/SignIn';
import Books from './components/Books/Books';
import { Divider } from 'antd';

const App: FC = () => {
    return (
        <>
            <SignIn />
            <Divider plain>优雅的分割线</Divider>
            <Todo />
            <Divider plain>优雅的分割线</Divider>
            <Books />
        </>
    );
}

export default App;
