import PropTypes from "prop-types";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      {/* <img src={profilePng} alt="User" /> */}
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    // Add more properties as needed
  }).isRequired,
};

export default ReviewCard;
