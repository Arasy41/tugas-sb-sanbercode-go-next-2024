import React, { useEffect, useState } from "react";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await Api.get('/api/reviews');
                if (Array.isArray(response.data)) {
                    setReviews(response.data);
                    console.log('Reviews:', response.data);
                } else {
                    console.error('Error: Reviews data is not an array');
                    setReviews([]);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [])

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.map((review) => (
                <div key={review.ID}>
                    <h2>{review.title}</h2>
                    <p>{review.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Reviews;