import express from 'express';
import { translateHinglishController } from '../controllers/translate/translate.controller.js';

const router = express.Router();

router.post('/english', translateHinglishController);
// router.post('/hindi', translateToHindiController);

export default router;
