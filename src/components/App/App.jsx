import Searchbar from 'components/Searchbar';
import { Grid } from './App.styled';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import getImages from '../../helper/api';

const { Component } = require('react');

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isVisibleModal: false,
    error: null,
    isVisibleButton: true,
    largeImageURL: '',
  };

  onSubmit = query => {
    if (query === this.state.query) return;

    this.setState({ images: [], query, page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    )
      this.getPhotos(query, page);
  }

  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = (await getImages(query, page)).data;
      if (hits.length === 0) {
        return alert(`We dont find ${query}`);
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isVisibleButton: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      isVisibleModal: !prevState.isVisibleModal,
      largeImageURL,
    }));
  };

  render() {
    return (
      <>
        <Grid>
          <Searchbar onSubmit={this.onSubmit} />
          {this.state.images.length > 0 && (
            <ImageGallery
              images={this.state.images}
              onClick={this.toggleModal}
            />
          )}
          {this.state.error && (
            <p>Whoops, something went wrong: {this.state.error.message}</p>
          )}
          {this.state.images.length > 0 &&
            this.state.isVisibleButton &&
            (this.state.isLoading ? (
              <Loader />
            ) : (
              <Button onClick={this.handleLoadMore} />
            ))}
        </Grid>
        {this.state.isVisibleModal && (
          <Modal
            src={this.state.largeImageURL}
            toggleModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default App;
