import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      api: undefined,
      loading: true,
    }
  }

  fetchDog = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const responseRaw = await fetch('https://dog.ceo/api/breeds/image/random');
      const responseJson = await responseRaw.json();
      this.setState({
        loading: false,
        api: responseJson,
      })
    })
  }

  handleClick = () => {
    this.fetchDog();
  }

  componentDidMount() {
    this.fetchDog();
  }

  render() {
    const { api, loading } = this.state;
    const loadingMessage = <span>Loading...</span>;
    return (
      <>
        <div>
          <h1>Doguinho aleatório <span role="img" aria-label="dog">🐶</span></h1>
          { loading ? loadingMessage : <img src={ api.message } alt="Cachorro Aleatório" /> }
        </div>
        <div className="button-container">
          <button onClick={ this.handleClick }>Clique para mais Doguinhos!</button>
        </div>
      </>
    )
  }
}

export default App;
