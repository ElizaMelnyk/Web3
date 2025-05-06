import { useState } from "react";
import axios from "axios";

interface ServerUser {
  name: string;
  displayName: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

const CallbackPage = () => {
  const [user, setUser] = useState<ServerUser | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleLoadUser = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get("https://localhost:3000/auth/casdoor/profile", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error loading profile:", error);
      alert("Не вдалося отримати дані користувача.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Інформація про користувача</h2>

      <button
        onClick={handleLoadUser}
        disabled={isFetching}
        style={{
          padding: "0.6rem 1.2rem",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginBottom: "1rem",
        }}
      >
        {isFetching ? "Завантаження..." : "Отримати дані з сервера"}
      </button>

      {user && (
        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <p><strong>Ім'я користувача:</strong> {user.name}</p>
          <p><strong>Пошта:</strong> {user.email}</p>
          <p><strong>Відображуване ім'я:</strong> {user.displayName}</p>
          <p><strong>Роль:</strong> {user.isAdmin ? "Адміністратор" : "Звичайний користувач"}</p>
          <img src={user.avatar} alt="Аватар користувача" width={100} style={{ marginTop: "1rem" }} />
        </div>
      )}
    </div>
  );
};

export default CallbackPage;
