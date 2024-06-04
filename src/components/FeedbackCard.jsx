import PropTypes from 'prop-types';

const FeedbackCard = ({feedback}) => {
    const { from, rating, comment } = feedback;
    return (
        <div className="card card-compact bg-[#F2613F] bg-opacity-10 shadow-xl">
            <div className="card-body">
                <div className="rating mt-2">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 1} />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 2} />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 3} />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 4} />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 5} />
                </div>
                <h2 className="card-title">{from}</h2>
                <p>{comment}</p>
            </div>
        </div>
    );
};

FeedbackCard.propTypes = {
    feedback: PropTypes.object.isRequired,
};

export default FeedbackCard;