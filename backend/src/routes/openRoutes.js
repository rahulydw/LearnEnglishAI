import express from 'express';
import {getLatestReviews} from '../controllers/LandingPage/index.js'

const router = express.Router();

router.route('/reviews-latest').get(getLatestReviews);

export default router;