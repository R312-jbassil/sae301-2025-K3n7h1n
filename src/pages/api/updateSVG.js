import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function POST({ request, cookies }) {
  try {
    // Get auth from cookies
    const authCookie = cookies.get("pb_auth");
    if (authCookie) {
      pb.authStore.loadFromCookie(authCookie.value);
    }

    const { id, code_svg, chat_history } = await request.json();

    if (!id || !code_svg) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: id and code_svg",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const record = await pb.collection("lunette_ia").update(id, {
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
    console.error("Error updating SVG:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to update SVG",
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
