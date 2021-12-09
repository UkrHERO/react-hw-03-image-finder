import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import apiImages from './api/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loaderr from './components/Loader/Loader';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    query: '',
    currentPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.query;
    const nextName = this.state.query;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      if (nextName.length > 0) {
        this.fetchArticles();
      } else {
        this.setState({ status: Status.REJECTED });
      }
    }
  }

  fetchArticles = () => {
    const { currentPage, query } = this.state;
    const options = { query, currentPage };
    apiImages
      .api(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };
  handleFormSubmit = query => {
    this.setState({ query, currentPage: 1, images: [], error: null });
  };

  loadMore = () => {
    this.fetchArticles();
  };

  render() {
    const { status, images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === Status.REJECTED && <h1>Please enter a valid name!</h1>}
        {status === Status.PENDING && (
          <div className={s.Box}>
            <Loaderr />
          </div>
        )}
        {status === Status.RESOLVED && (
          <ImageGallery images={images} onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export default App;
