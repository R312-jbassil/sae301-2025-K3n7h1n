import { OpenAI } from 'openai';

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: import.meta.env.PUBLIC_HF_TOKEN,
  dangerouslyAllowBrowser: true,
});

export async function POST({ request }) {
  try {
    const { messages } = await request.json();

    const systemMessage = {
      role: "system",
      content: `You are an SVG code generator. Generate SVG code based on user descriptions.
      Rules:
      - Always wrap your response in <svg> tags
      - Make the SVG responsive with proper viewBox
      - Use meaningful ids for each element (e.g., id="circle1", id="background")
      - Keep the code clean and well-structured
      - Only return the SVG code, no explanations outside the tags`,
    };

    const completion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0].message.content;
    
    // Extract SVG code using regex
    const svgMatch = responseText.match(/<svg[\s\S]*?<\/svg>/i);
    
    if (svgMatch) {
      return new Response(
        JSON.stringify({
          svg: {
            content: svgMatch[0],
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "No SVG code found in the response",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error generating SVG:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to generate SVG",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
