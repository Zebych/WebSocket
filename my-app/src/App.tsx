import React from 'react';
import './App.css';
import {ChatClass} from "./ui/ChatClass";
import {ChatHooks} from "./ui/ChatHooks";
import ChatOnHooks from "./ui/chatOnHooks/chatOnHooks";

function App() {
    return (
        <div className="App">
          {/*  <ChatClass/>
            <ChatHooks/>*/}
            <ChatOnHooks/>
        </div>
    );
}

export default App;
