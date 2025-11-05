import { OpenAI } from 'openai';

export async function POST({ request }) {
  try {
    // Get API key from environment variables (works in both dev and production)
    const apiKey = import.meta.env.PUBLIC_HF_TOKEN || process.env.PUBLIC_HF_TOKEN ;
    
    if (!apiKey) {
        
      console.error("HuggingFace API token not found in environment variables");
      return new Response(
        JSON.stringify({
          error: "API configuration error: Missing HuggingFace token",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Create client inside the function to access runtime environment variables
    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: apiKey,
    });

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
