import PropTypes from 'prop-types';

const SectionTitle = ({text, marginTop}) => {
    return (
        <div className={`mt-${marginTop} p-8 border-b-4 rounded-lg border-[#F2613F] bg-[#0C0C0C]`}>
            <h2 className='text-center font-bold text-2xl md:text-4xl text-[#F2613F]'>{text}</h2>
        </div>
    );
};

SectionTitle.propTypes = {
    text: PropTypes.string.isRequired,
    marginTop: PropTypes.number.isRequired
};

export default SectionTitle;