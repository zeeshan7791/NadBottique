import PropTypes from "prop-types";

import Helmet from "react-helmet";
const MetaData = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </>
  );
};
MetaData.propTypes = {
  title: PropTypes.shape({
    title: PropTypes.string.isRequired, // Assuming userRef is a required string
  }).isRequired,
};

export default MetaData;
