  // --- Connexion classique ---
      const form = document.getElementById("loginForm");
      form.onsubmit = async (e) => {
        e.preventDefault();
        try {
          await pb.collection("users").authWithPassword(
            form.email.value,
            form.password.value
          );

          // Vérifie si l'email est vérifié
          if (pb.authStore.model?.verified === false) {
            document.getElementById("msg").textContent =
              "Veuillez vérifier votre email avant de continuer.";
            return;
          }

          // Redirection après connexion
          location.href = "/students";
        } catch (err) {
          document.getElementById("msg").textContent = "Échec de connexion";
          console.error(err);
        }
      };

      // --- Connexion via Google ---
      const googleLogin = document.getElementById("googleLogin");
      googleLogin.onclick = async () => {
        try {
          await pb.collection("users").authWithOAuth2({ provider: "google" });
          location.href = "/students";
        } catch (err) {
          document.getElementById("msg").textContent =
            "Échec de connexion Google";
          console.error(err);
        }
      };