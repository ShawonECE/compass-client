import PropTypes from 'prop-types';

const Button = ({text}) => {
    return (
        <button className="btn bg-[#0C0C0C] text-[#F2613F] border-x-0 border-t-0 border-b-2 border-b-[#F2613F] rounded-md">{text}</button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;