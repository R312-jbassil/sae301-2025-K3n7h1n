import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function POST({ request, cookies }) {
  try {
    // Get auth from cookies
    const authCookie = cookies.get("pb_auth");
    if (authCookie) {
      pb.authStore.loadFromCookie(authCookie.value);
    }

    const { modele_ia, code_svg, chat_history } = await request.json();

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

    const record = await pb.collection("lunette_ia").create({
      modele_ia,
      code_svg,
      chat_history: chat_history || [],
    });

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
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to save SVG",
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
