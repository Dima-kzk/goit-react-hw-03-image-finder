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
  };

  onSubmit = query => {
    if (query === this.state.query) return;

    this.setState({ images: [], query, page: 1 });
  };

  setIsVisibleModal = v => {};

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (
        // це умова якщо змінюється або query або page
        prevState.query !== this.state.query ||
        prevState.page !== this.state.page
      ) {
        // це для організації приховання кнопки та відображення Loader під час загрузки
        if (!prevState.isLoading) this.setState({ isLoading: true });

        const { hits, totalHits } = (
          await getImages(this.state.query, this.state.page)
        ).data;

        this.isVisibleButton = this.state.page < Math.ceil(totalHits / 12);

        if (
          // це умова коли page змінився, а query - ні
          prevState.page !== this.state.page &&
          prevState.query === this.state.query
        ) {
          this.setState({
            // тоді до існуючої колекції додаємо нову порцію із запиту
            images: [...prevState.images, ...hits],
          });
          // це умова коли змінився соме query
        } else if (prevState.query !== this.state.query) {
          this.setState({ images: hits }); // тоді створюємо нову колекцію по новому query
        }
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      if (prevState.isLoading) this.setState({ isLoading: false });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = (largeImageURL = null) => {
    this.setState(prevState => ({ isVisibleModal: !prevState.isVisibleModal }));

    this.largeImageURL = largeImageURL;
  };

  render() {
    return (
      <>
        <Grid>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={this.state.images} onClick={this.toggleModal} />
          {this.state.error && (
            <p>Whoops, something went wrong: {this.state.error.message}</p>
          )}
          {this.state.images.length > 0 &&
            this.isVisibleButton &&
            (this.state.isLoading ? (
              <Loader />
            ) : (
              <Button onClick={this.handleLoadMore} />
            ))}
        </Grid>
        {this.state.isVisibleModal && (
          <Modal src={this.largeImageURL} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}

export default App;
