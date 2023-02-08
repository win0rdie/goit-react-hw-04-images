import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchbarHeader,
  SearchbarForm,
  SearchButton,
  SearchbarLabelBtn,
  Input,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (values, actions) => {
    if (values.query.trim() === '') {
      return toast.error('this field must not be empty');
    }
    await onSubmit(values.query);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <SearchbarHeader>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <SearchbarForm>
            <SearchButton type="submit" disabled={isSubmitting}>
              <SearchbarLabelBtn />
            </SearchButton>
            <Input
              name="query"
              type="search"
              placeholder="Search images and photos"
            />
          </SearchbarForm>
        )}
      </Formik>
      <ToastContainer autoClose={2000} theme={'colored'} />
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
