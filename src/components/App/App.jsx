import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import { useEffect, useState } from 'react';
import { AppSearchbar } from './App.styled';
import * as API from '../services/image-api';
import Loader from 'components/Loader';

const PER_PAGE = 12;

export default function App({ q }) {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(PER_PAGE);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState('');
  const [tags] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    API.getImages(query, amount)
      .then(({ data }) => {
        setImages(data.hits);
        setTotal(Math.round(data.total / (PER_PAGE + 2)));
      })
      .catch(error => setError(error.message('')))
      .finally(() => setIsLoading(false));
  }, [amount, query]);

  const openModal = image => {
    setImageModal(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMoreImages = () => {
    setAmount(amount => amount + PER_PAGE);
    setPage(p => p + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setError('');
    setAmount(PER_PAGE);
    setIsLoading(true);

    setImages(
      API.getImages(query, amount)
        .then(({ data }) => {
          setImages(data.hits);
          setTotal(Math.round(data.total / (PER_PAGE + 2)));
        })
        .catch(error => setError(error.message('')))
        .finally(() => setIsLoading(false))
    );
  };

  useEffect(() => {
    if (images.length > PER_PAGE) {
      window.scrollBy({
        top: window.innerHeight - 300,
        behavior: 'smooth',
      });
    }
  }, [images.length]);

  return (
    <AppSearchbar>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}

      {images.length > 0 ? (
        <ImageGallery images={images} imageName={query} onModal={openModal} />
      ) : null}

      {error && <h3>{error}</h3>}

      {page < total && <Button onClick={loadMoreImages} disabled={isLoading} />}

      {showModal && (
        <Modal onClose={closeModal}>
          <img src={imageModal} alt={tags} />
        </Modal>
      )}
    </AppSearchbar>
  );
}

// import { AppSearchbar } from './App.styled';
// import { Component } from 'react';
// import Searchbar from 'components/Searchbar';
// import Button from 'components/Button';
// import ImageGallery from 'components/ImageGallery';
// import Loader from 'components/Loader';
// import Modal from 'components/Modal';
// import * as API from '../services/image-api';

// export default class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     isLoading: false,
//     error: '',
//     amount: 12,
//     showModal: false,
//     imageModal: '',
//     tags: '',
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.query;
//     const currentName = this.state.query;
//     const prevAmount = prevState.amount;
//     const currentAmount = this.state.amount;
//     const prevPage = prevState.page;
//     const currentPage = this.state.page;

//     if (prevName !== currentName || prevAmount !== currentAmount) {
//       currentName === ''
//         ? this.setState({ images: null })
//         : API.getImages(this.state.query, this.state.amount)
//             .then(res => this.setState({ images: res.data.hits }))
//             .catch(error => this.setState({ error: error.message }));
//     }
//     if (currentPage > prevPage) {
//       this.loadMoreImages(prevPage);
//     }
//     this.scrollImages();
//   }

//   // toggleModal = () => {
//   //   this.setState(({ showModal }) => ({
//   //     showModal: !showModal,
//   //   }));
//   // };

//   openModal = image => {
//     this.setState({ imageModal: image });
//     this.setState({ showModal: true });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false });
//   };

//   loadMoreImages = () => {
//     this.setState(({ amount }) => ({ amount: amount + 12 }), this.scrollImages);
//   };

//   handleFormSubmit = query => {
//     this.setState({ query });
//   };

//   scrollImages = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { images, isLoading, error, query, showModal, imageModal, tags } =
//       this.state;
//     return (
//       <AppSearchbar>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {images.length > 0 ? (
//           <ImageGallery
//             images={images}
//             imageName={query}
//             onModal={this.openModal}
//           />
//         ) : null}

//         {isLoading && <Loader />}

//         {error && <h3>{error}</h3>}

//         {images.length > 11 && !isLoading && <Loader /> && (
//           <Button onClick={this.loadMoreImages} />
//         )}

//         {showModal && (
//           <Modal onClose={this.closeModal}>
//             <img src={imageModal} alt={tags} />
//           </Modal>
//         )}
//       </AppSearchbar>
//     );
//   }
// }
