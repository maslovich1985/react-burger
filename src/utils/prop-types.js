import PropTypes from "prop-types";

const DataPropTypes = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['main', 'bun', 'sauce']),
    __v: 0,
    _id: PropTypes.string.isRequired,
});

export default DataPropTypes;