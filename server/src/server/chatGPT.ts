const { Configuration, OpenAIApi } = require("openai")
const dotenv = require("dotenv")
dotenv.config("../.env")

const GPT_API_KEY = process.env.OPENAI_API_KEY
const NUM_SAMPLES = 10
const MAX_TOKENS = 2048
const TEMPERATURE = 0

export const postChatGPT = async (value: string) => {
    const configuration = new Configuration({
        apiKey: GPT_API_KEY
    })

    const openai = new OpenAIApi(configuration);
    
    // 向 ChatGPt 提问
    const prompt = `Convert the JSON object into Typescript interfaces \n ${value} Please, I need the only the code, I don't need any explanations.`;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: prompt }
            ],
            stream: true,
            temperature: TEMPERATURE
        }, {
            responseType: 'stream',
            proxy: {
                host: "127.0.0.1",
                port: 7890
            }
        })
        
        let result = ""
        completion.data.on("data", (data: Buffer) => {
            console.log(data.toString());

            const regex = /data:\s*(\{.*\})/;
            let str = data.toString();
            const match = str.match(regex);

            if (match) {
                const dataObject = JSON.parse(match[1]);

                // result += dataObject["choices"][0]["delta"]["content"]
            }
        })

        
    } catch(error) {
        console.log(error)
    }
}

export {}