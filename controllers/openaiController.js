const { OpenAIApi, Configuration } = require('openai');

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

    const { size } = req.body;
    const prompt = req.body.prompt;


    // if (!prompt) {
    //     return res.status(400).json({
    //         success: false,
    //         error: 'prompt is required'
    //     });
    // } else {
    //     console.log(prompt)
    // }

    const imgSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    try {
        const response = await openai.createImage({
            prompt: prompt,
            // model: 'image-alpha-001',
            n: 1,
            size: imgSize
        })

        const imgUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imgUrl
        });
    } catch (err) {
        console.error(err);
        if (err.response) {
            console.log(err.response.status)
            console.log(err.response.data)
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        })
    }
}

module.exports = { generateImage };
