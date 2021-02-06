import express from 'express';
import {getUser} from "../controllers/userContollers";
import {authenticateJWT} from "../utils/helpers";

const router = express.Router();

router.route('/im').get(authenticateJWT, getUser);

export default router;
