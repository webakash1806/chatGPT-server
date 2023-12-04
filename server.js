const express = require('express');
require('dotenv').config()
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const axios = require('axios')
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
        res.send(data.choices[0].message.content.trim())
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/image', async (req, res) => {
    const { imageQuery } = req.body

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'dall-e-3',
            prompt: imageQuery,
            n: 1,
            size: "1024x1024"
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options)
        const data = await response.json()
        res.send(data)
    }
    catch (e) {
        console.log(e)
    }

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
