import s from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    src: '',
  };

  onImgClick = e => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      src: e.target.getAttribute('src'),
    }));
  };

  onClose = () => {
    this.setState({ showModal: false, src: '' });
  };

  render() {
    return (
      <>
        {this.props.images.map(image => (
          <li key={image.id} className={s.ImageGalleryItem}>
            <img
              className={s.ImageGalleryItemImage}
              src={image.largeImageURL}
              alt=""
              onClick={this.onImgClick}
            />
          </li>
        ))}
        {this.state.showModal && (
          <Modal
            // onClick={this.onImgClick}
            onClose={this.onClose}
            img={this.state.src}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ImageGalleryItem: PropTypes.string,
    }),
  ),
};

export default ImageGalleryItem;
