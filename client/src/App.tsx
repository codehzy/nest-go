import React, { FC } from 'react';
import './App.css';
import { Todo } from './components/Todo/Todo';
import { SignIn } from './components/SignIn/SignIn';



const App: FC = () => {
    return (
        <>
            <SignIn />
            <Todo />
        </>
    );
}

export default App;
