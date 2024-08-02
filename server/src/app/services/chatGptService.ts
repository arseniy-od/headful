import axios from 'axios';

export const getChatGptResponse = async (prompt: string): Promise<string> => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {Authorization: 'Bearer ' + process.env.OPENAI_API_KEY},
            data: {
                model: 'gpt-4o-mini',
                messages: [{role: 'user', content: prompt}],
                temperature: 0,
            },
        });

        // Assuming the response from ChatGPT is in apiResponse.data.choices[0].text
        console.log('response:', response.data.choices[0].message.content);

        const chatGptResponse = response.data.choices[0].message.content;
        return chatGptResponse;
    } catch (error: any) {
        console.error('Error calling ChatGPT API:', error);
        const errorDetail = error.response.data.error.message;
        console.log('Error detail:', errorDetail);
        throw new Error(
            `Failed to fetch response from ChatGPT: ${errorDetail}`,
        );
    }
};
