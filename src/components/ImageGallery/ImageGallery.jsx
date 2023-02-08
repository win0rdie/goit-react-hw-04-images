import { GalleryList } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onModal }) => {
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          onModal={onModal}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;

// import { Component } from 'react';

// export default class ImageGallery extends Component {
//   render() {
//     return (
//       <ul className="gallery">
//         {images.map(({ id, webformatURL, largeImageURL }) => (
//           <li key={id}>
//             <img src={webformatURL} alt="" />
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }
