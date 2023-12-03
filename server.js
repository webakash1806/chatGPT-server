const express = require('express');
require('dotenv').config()
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')

// app.use(express.json());
const app = express();
app.use(bodyParser.json())
app.use(cors());


app.post('/ask', async (req, res) => {
    const { question } = req.body

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": question }],
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
    }



    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    }
    catch (e) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
