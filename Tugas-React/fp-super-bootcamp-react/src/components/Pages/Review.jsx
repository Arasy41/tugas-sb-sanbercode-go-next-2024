import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import CulinaryReviewContext from "../../contexts/CulinaryReviewContext";

const Reviews = () => {
    const { reviews } = useContext(CulinaryReviewContext);

    return (
        <>            
            <div className="container min-h-screen mx-auto pt-24 px-4 py-8 dark:bg-gray-950">
                <h1 className="text-4xl font-bold text-center dark:text-white">Recipe Review</h1>
                <p className="text-center mb-8 dark:text-white">Share your experience with us</p>
                {reviews.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <h2 className="text-2xl font-semibold ">No reviews available</h2>
                        <p className="mt-2">Be the first to review!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.ID}
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 border border-gray-200"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={review.user.profile.avatar_url || <FaUser/>}
                                        alt={review.user.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{review.user.profile.full_name}</h2>
                                        <p className="text-sm text-gray-600">At Recipe : {review.recipe.title}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{review.content}</p>
                                <p className="text-sm text-gray-500 text-right relative">{getTimeAgo(review.created_at)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

const getTimeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

export default Reviews;
