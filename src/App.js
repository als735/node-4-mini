import React, { Component } from 'react';
import HistoryModal from './components/HistoryModal';
import './App.css';
import axios from 'axios'; // We use axios to make HTTP requests from our react app to our node/ex[ress server so we can display them 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      allMessages: [],
      messageInputDisabled: true,
      showHistory: false
    };
    this.closeHistoryModal = this.closeHistoryModal.bind(this);
  }

  
  componentDidMount() {
    axios.get('/api/messages').then(res => { // get request to node/express api 
      this.setState({allMessages: res.data}); // Set state with the response. Update the allMessages property on state.
    }); 
  }

  createMessage() {
    axios.post('/api/message', { // Send this.state.username and this.state.message in the body of the request. Use username and message property names 
      username: this.state.username, 
      message: this.state.message 
    })
    .then(res => {
      this.setState({ // Set state with the response (which will be the updated array messages from the server) allMessages. 
        allMessages: res.data
      });  
    });
  }
  

  saveUsername() {
    if (this.state.username) {
      this.setState({ messageInputDisabled: !this.state.messageInputDisabled });
    }
  }

  showHistoryModal() {
    this.setState({ showHistory: true });
  }
  closeHistoryModal() {
    this.setState({ showHistory: false });
  }

  render() {
    let allMessages = this.state.allMessages.map((messageObj, i) => {
      return (
        <div className="message" key={i}>
          <span>{messageObj.username}</span>
          <span>{messageObj.message}</span>
        </div>
      );
    });

    return (
      <div className="app">
        <div className="content">
          <div className="messages-wrapper">{allMessages}</div>
          <div className="input-wrapper">
            <input
              disabled={!this.state.messageInputDisabled}
              onChange={e => this.setState({ username: e.target.value })}
              value={this.state.username}
              type="text"
              className="input-username"
              placeholder="Type in username..."
            />
            <button
              className="button-username"
              onClick={() => this.saveUsername()}>
              {this.state.messageInputDisabled ? 'save' : 'update'}
            </button>
            <input
              disabled={this.state.messageInputDisabled}
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
              type="text"
              className="input-message"
              placeholder={
                this.state.messageInputDisabled
                  ? 'Create a username before you send a message'
                  : 'Type in message...'
              }
            />
            <button
              onClick={() => this.createMessage()}
              disabled={this.state.messageInputDisabled}
              className="button-message">
              send
            </button>
            <button onClick={() => this.showHistoryModal()}>history</button>
          </div>
        </div>

        {/* If this.state.showHistory === true, modal will be displayed */}
        {this.state.showHistory ? (
          <HistoryModal closeHistoryModal={this.closeHistoryModal} />
        ) : null}
      </div>
    );
  }
}

export default App;
