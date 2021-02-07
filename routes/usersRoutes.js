import express from 'express';
import {getUser, updateUser} from "../controllers/userContollers";
import {authenticateJWT} from "../utils/helpers";

const router = express.Router();

router.route('/im').get(authenticateJWT, getUser);
router.route('/im').put(authenticateJWT, updateUser);

export default router;
