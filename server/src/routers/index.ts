const { Configuration, OpenAIApi } = require("openai")
const express = require("express")
const router = express.Router()

const dotenv = require("dotenv")
dotenv.config("../.env")
const GPT_API_KEY = process.env.OPENAI_API_KEY

router.post("/convert", async function(req: any, res: any) {
    let str = "";
    req.on("data", function(chunk: string) {
        str += chunk;
    });

    req.on("end", async function() {
        let { value } = JSON.parse(str);

        if(GPT_API_KEY) {
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
                    ]
                }, {
                    proxy: {
                        host: "127.0.0.1",
                        port: 7890
                    }
                })

                res.json({
                    code: 0, 
                    message: "Successful",
                    response: completion.data.choices[0].message.content
                })
            } catch(error) {
                console.log("error: ", error)
                res.json({code: 1001, errMsg: "OpenAI拒绝访问"})
            }
            
        }else{
            res.json({code: 1005, errMsg: `请配置 ChatGPT API Key`});
        }
    })
})

module.exports = router