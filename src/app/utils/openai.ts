import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

export async function generateGPTResponse(city: string) {
    try {
        const res = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature: 0.6,
            messages: [{ "role": "system", "content": "Você deverá fornecer um descrição curta sobre uma cidade." },
            {
                "role": "user",
                "content": "Descreva New York"
            },
            {
                "role": "assistant",
                "content": "New York é uma das cidades mais icônicas e vibrantes do mundo. Localizada na costa leste dos Estados Unidos, no estado de Nova Iorque, a cidade é um importante centro financeiro, cultural e de mídia."
            },
            {
                "role": "user",
                "content": `Descreva ${city}`
            }]
        })

        console.log(res.choices[0].message.content)
        return res.choices[0].message.content
    } catch (e) {
        return undefined
    }
}
