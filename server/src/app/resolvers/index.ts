import {getChatGptResponse} from '../services/chatGptService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvers: any[] = [
    {
        Query: {
            // eslint-disable-next-line
            translate: async (_: any, {text}: {text: string}) => {
                const prompt = `Translate this text to english. Write only translated text: ${text}`;
                const chatGptResponse = await getChatGptResponse(prompt);
                return chatGptResponse;
            },
            // eslint-disable-next-line
            rephrase: async (_: any, {text}: {text: string}) => {
                const prompt = `Rephrase content to make it sound more professional. Answer in initial language: ${text}`;
                const chatGptResponse = await getChatGptResponse(prompt);
                return chatGptResponse;
            },
            // eslint-disable-next-line
            summarize: async (_: any, {text}: {text: string}) => {
                const prompt = `Summarize text below. Answer in initial language: ${text}`;
                const chatGptResponse = await getChatGptResponse(prompt);
                return chatGptResponse;
            },
        },
    },
];

export default resolvers;
