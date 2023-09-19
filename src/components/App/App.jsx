import Searchbar from 'components/Searchbar';
import { Grid } from './App.styled';
// import axios from 'axios';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import getImages from '../../helper/api';

const { Component } = require('react');

// axios.defaults.baseURL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isVisibleModal: false,
    error: null,
  };

  // largeImageURL = null;

  onSubmit = query => {
    if (query === this.state.query) return;

    this.setState({ images: [], query, page: 1 });
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   try {
  //     if (
  //       prevState.query !== this.state.query ||
  //       prevState.page !== this.state.page
  //     ) {
  //       if (!prevState.isLoading) this.setState({ isLoading: true });

  //       const response = await getImages(this.state.query, this.state.page);

  //       if (
  //         prevState.page !== this.state.page &&
  //         prevState.query === this.state.query
  //       ) {
  //         this.setState({
  //           images: [...prevState.images, ...response.data.hits],
  //         });
  //       } else if (prevState.query !== this.state.query) {
  //         this.setState({ images: response.data.hits });
  //       }
  //     }
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     if (prevState.isLoading) this.setState({ isLoading: false });
  //   }
  // }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = largeImageURL => {
    this.setState(prevState => ({ isVisibleModal: !prevState.isVisibleModal }));

    this.largeImageURL = largeImageURL;

    return largeImageURL;
  };

  // handleKeyBoard = e => {
  //   if (e.key === 'Escape') {
  //     this.setState(prevState => {
  //       if (prevState.isVisibleModal) return { isVisibleModal: false };
  //     });
  //   }
  // };

  render() {
    // if (window.onkeydown === null) window.onkeydown = this.handleKeyBoard;
    return (
      <>
        <Grid>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={this.state.images} onClick={this.toggleModal} />
          {this.state.error && (
            <p>Whoops, something went wrong: {this.state.error.message}</p>
          )}
          {this.state.images.length > 0 &&
            (this.state.isLoading ? (
              <Loader />
            ) : (
              <Button onClick={this.handleLoadMore} />
            ))}
        </Grid>
        {this.state.isVisibleModal && (
          <Modal src={this.largeImageURL} onClick={this.toggleModal} />
        )}
      </>
    );
  }
}

export default App;
