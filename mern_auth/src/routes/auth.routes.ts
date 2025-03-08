// import express from 'express';
// import { RegisterUser } from '../controllers/auth.controllers';


// const router = express.Router();

// router.post('/register', RegisterUser);

// export default router;

import express from 'express';
import { RegisterUser, loginUser } from '../controllers/auth.controllers';

const router = express.Router();

// Define the /register route
router.post('/register', RegisterUser);
router.post('/login', loginUser);

export default router;