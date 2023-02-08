import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled.jsx';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onModal, tags }) => {
  return (
    <div>
      <GalleryItem>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={() => onModal(largeImageURL)}
        />
      </GalleryItem>
    </div>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  id: PropTypes.string,
};

export default ImageGalleryItem;
