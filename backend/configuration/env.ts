import dotenv from 'dotenv';

dotenv.config({ 
    path: './configuration/.env'
}); 

console.log('Loaded key:', process.env.OPENAI_API_KEY?.slice(0, 10));