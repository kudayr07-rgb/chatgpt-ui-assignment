import express from 'express';
import { streamCompletion } from '../services/openAiService';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log("BODY:", req.body);

    const { messages, preferences } = req.body;
    try {
        const stream = await streamCompletion(messages, preferences);
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content || "";
            res.write(token)
        }
        res.end();
    } catch (error: any) {

            console.error("Error in chat route:", error);

            let fallback = "Something went wrong while generating the response.";

            if (!process.env.OPENAI_API_KEY) {
                fallback =
                "⚠ OpenAI API key is not configured. Please add OPENAI_API_KEY in the backend .env file.";
            }
            else if (error?.status === 429) {
                fallback =
                "⚠ OpenAI API quota exceeded. Please check your billing or try again later.";
            }

            res.setHeader('Content-Type', 'text/event-stream');

            for (let i = 0; i < fallback.length; i++) {
                res.write(fallback[i]);
                await new Promise(r => setTimeout(r, 20));
            }

            res.end();
    }   
});

export default router;