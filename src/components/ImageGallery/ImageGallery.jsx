import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

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

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};

export default ImageGallery;
