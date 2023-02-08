import { LoadMoreBtn, BtnContainer } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick, disabled }) => {
  return (
    <BtnContainer>
      <LoadMoreBtn type="button" onClick={onClick} disabled={disabled}>
        Load more
      </LoadMoreBtn>
    </BtnContainer>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
