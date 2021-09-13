import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      message: '',
      breed: '',
      loading: true,
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { message } = nextState;
    return !message.includes('terrier');
  }

  fetchDog = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const responseRaw = await fetch('https://dog.ceo/api/breeds/image/random');
      const responseJson = await responseRaw.json();
      this.setState({
        loading: false,
        message: responseJson.message,
        breed: responseJson.message.split('/')[4],
      })
    })
  }

  componentDidMount() {
    this.fetchDog();
  }

  componentDidUpdate(_nextProps, nextState) {
    const { message } = this.state;
    localStorage.setItem('imgUrl', message);
    alert(nextState.breed);
  }

  render() {
    const { message, loading } = this.state;
    const loadingMessage = <span>Loading...</span>;
    return (
      <>
        <div>
          <h1>Doguinho aleatório <span role="img" aria-label="dog">🐶</span></h1>
          { loading ? loadingMessage : <img src={ message } alt="Cachorro Aleatório" /> }
        </div>
        <div className="button-container">
          <button onClick={ this.fetchDog }>Clique para mais Doguinhos!</button>
        </div>
      </>
    )
  }
}

export default App;
