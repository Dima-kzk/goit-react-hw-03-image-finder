import { Component } from 'react';
import { Header } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputCange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return alert('Не можна зробити запит по пустій квері');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
            <ImSearch />
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputCange}
          />
        </form>
      </Header>
    );
  }
}
