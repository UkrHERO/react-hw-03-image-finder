import React from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';

const ImageGallery = ({ images, onClick }) => {
  return (
    <>
      <ul className={s.ImageGallery}>
        <ImageGalleryItem images={images} />
      </ul>
      <div>{images.length > 0 && <Button onClick={onClick} />}</div>
    </>
  );
};

export default ImageGallery;
