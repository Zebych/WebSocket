import React from 'react';

let chatStyles = {
    padding: '10px',
    border: '1px solid black',
    height: '60px',
    overFlowy: 'scroll'
}

export class ChatClass extends React.Component {
    state = {messages: []}
    socket = null

    componentDidMount() {
        let baseURL = "social-network.samuraijs.com"
        this.socket = new WebSocket("wss://" + baseURL + "/handlers/ChatHandler.ashx")
        this.socket.onmessage = this.onMessage.bind(this)
    }

    onMessage(messageEvent) {
        if (messageEvent.data) {
            let messages = JSON.parse(messageEvent.data)
            this.setState({
                messages: [...this.state.messages, ...messages]
            })
        }
    }

    onKeyPress(e) {
        if (e.ctrlKey && e.charCode === 13) {
            this.socket.send(e.target.value)
            e.target.value = ''
        }
    }

    render() {
        return <div>
            <h3>Chat</h3>
            <div style={chatStyles}>
                {this.state.messages.map(m => <div>
                       <b>{m.username}</b> {m.message}
                    </div>
                )}
            </div>
            <div style={{padding: '10px'}}>
                <textarea onKeyPress={this.onKeyPress.bind(this)}/>


            </div>
        </div>
    }
}