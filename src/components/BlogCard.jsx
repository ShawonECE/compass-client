import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const { title, introduction, _id } = blog;
    const navigate = useNavigate();
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{ title }</h2>
                <p className='text-justify'>{ introduction }</p>
                <div className="card-actions justify-end">
                    <button onClick={() => navigate(`/blog/${_id}`)} className="btn bg-[#F2613F] text-white">Read more...</button>
                </div>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object.isRequired
};

export default BlogCard;