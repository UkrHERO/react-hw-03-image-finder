import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

      //   apiImages
      //     .api(nextName)
      //     .then(images => this.setState({ images, status: Status.RESOLVED }))
      //     .catch(error => this.setState({ error, status: Status.REJECTED }));
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
    // if (this.state.query.trim() === '') {
    //   this.state.status = Status.REJECTED;
    // }
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
        {status === 'rejected' && <h1>Oops... Something went wrong!</h1>}
        {status === 'pending' && (
          <div className={s.Box}>
            <Loaderr />
          </div>
        )}
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

export default App;
