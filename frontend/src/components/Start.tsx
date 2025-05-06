import axios from "axios";

const CASDOOR_CLIENT_ID = "5c55295efdb3c5849e51";
const CASDOOR_REDIRECT_URI = "https://localhost:3000/auth/casdoor/callback";
const CASDOOR_AUTH_URL = "https://localhost:8443/login/oauth/authorize";

function StartPage() {
  const handleLogin = () => {
    const authUrl = `${CASDOOR_AUTH_URL}?client_id=${CASDOOR_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      CASDOOR_REDIRECT_URI
    )}&response_type=code&scope=openid profile email`;
    window.location.href = authUrl;
  };

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        "https://localhost:3000/auth/casdoor/profile",
        {
          withCredentials: true,
        }
      );
      alert(`Користувач увійшов як: ${response.data.name}`);
    } catch (error) {
      alert("Користувач не авторизований.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", color: "#333" }}>
        Ласкаво просимо до додатку
      </h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          onClick={handleLogin}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#007bff")
          }
        >
          Увійти через Casdoor
        </div>
        <div
          onClick={checkLoginStatus}
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#1e7e34")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#28a745")
          }
        >
          Перевірити статус входу
        </div>
      </div>
    </div>
  );
}

export default StartPage;
