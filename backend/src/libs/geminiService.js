import {GoogleGenerativeAI} from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)


export async function getAIHint(problemDescription,userCode,query) {
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"})
    
    const prompt = `
    Problem: ${problemDescription}
    User Code: ${userCode}
    Task:  ${query},dont give full code/solution || Suggest a small hint without giving the full solution
    `;

    const result = await model.generateContent(prompt)
    return result.response.text();
}
