import express from 'express';
import { translateHinglishController } from '../controllers/translate/translate.controller.js';
import {translateHinglishToEnglish, translateEnglishToHindi} from '../controllers/translate/translateController.js'
const router = express.Router();

router.post('/suggest/english', translateHinglishToEnglish);
router.post('/english', translateHinglishController);
router.post('/hindi', translateEnglishToHindi);

export default router;
