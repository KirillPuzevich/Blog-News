import { apiUrl } from "./apiBack";

export const addFavorites = async () => {
    const response = await fetch(`${apiUrl}/me/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming you're using JWT
      },
      body: JSON.stringify({ categoryId }),
    });

    if (response.ok) {
      alert("Category added to favorites!");
    } else {
      alert("Failed to add category to favorites.");
    }
};

