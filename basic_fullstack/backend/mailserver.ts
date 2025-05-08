import express from 'express';
import { SendMail } from './mailer';

const app = express();


app.use(express.json());

app.get('/send-mail', async(req, res) => {
    try {
        await SendMail(
            'innocent@gmail.com',
            'Welcome to My App!',
      'Thanks for signing up. Welcome to the community!',
      '<h1>Welcome to My App!</h1><p>Thanks for signing up. Welcome to the community!</p>'
        );
        res.status(200).send("Test email sent successfully")
    } catch (error) {
        console.error(error);
    res.status(500).send("Failed to send test email.");
    }
})


app.listen(3001, ()=> {
    console.log(`Server running on Port 3001`); 
})

