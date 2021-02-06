import express from 'express';
import {createGroup} from "../controllers/groupController";

const router = express.Router();

router.route('/create').post(createGroup);

export default router;
