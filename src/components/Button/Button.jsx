import { LoadMoreBtn, BtnContainer } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <BtnContainer>
      <LoadMoreBtn type="button" onClick={onClick}>
        Load more
      </LoadMoreBtn>
    </BtnContainer>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
