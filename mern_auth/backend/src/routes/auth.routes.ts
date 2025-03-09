// import express from 'express';
// import { RegisterUser } from '../controllers/auth.controllers';


// const router = express.Router();

// router.post('/register', RegisterUser);

// export default router;

import express from 'express';
import { RegisterUser, loginUser, logOutuser } from '../controllers/auth.controllers';

const router = express.Router();

// Define the /register route
router.post('/register', RegisterUser);
router.post('/login', loginUser);
router.post('/logout', logOutuser);

export default router;