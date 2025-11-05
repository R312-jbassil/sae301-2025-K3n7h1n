import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function POST({ request, cookies }) {
  try {
    // Get auth from cookies
    const authCookie = cookies.get("pb_auth");
    if (authCookie) {
      try {
        pb.authStore.loadFromCookie(authCookie.value);
        console.log("Auth loaded:", pb.authStore.isValid);
      } catch (authError) {
        console.error("Auth error:", authError);
      }
    } else {
      console.log("No auth cookie found");
    }

    const body = await request.json();
    console.log("Received data:", body);
    
    const { modele_ia, code_svg, chat_history } = body;

    if (!modele_ia || !code_svg) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: modele_ia and code_svg",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Creating record in lunette_ia collection...");
    
    const record = await pb.collection("lunette_ia").create({
      modele_ia: modele_ia,
      code_svg: code_svg,
      chat_history: chat_history || [],
    });

    console.log("Record created successfully:", record.id);

    return new Response(
      JSON.stringify({
        success: true,
        id: record.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving SVG:", error);
    console.error("Error details:", error.response?.data || error.message);
    
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to save SVG",
        details: error.response?.data || error.toString(),
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
