import {reviewsList} from '../../constant.js';

export const getLatestReviews = async (_, res) => {
    try {
        const data = reviewsList;
        // Send Reviews Dummy Data:
        res.status(200).json({success: true, data})
    } catch (error) {
        console.log(`LandingPage getLatestReviews Controller : ${error}`)
        throw error;
    }
};

