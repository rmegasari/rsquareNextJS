"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ADMIN_USERNAME = "rsquareidea";
const ADMIN_PASSWORD = "Ultimate704554";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set cookie untuk authentication
      document.cookie = "admin_session=authenticated; path=/; max-age=86400"; // 24 jam
      sessionStorage.setItem("isAdminLoggedIn", "true");
      setError("");
      router.push("/admin");
    } else {
      setError("Username atau password yang Kamu masukkan salah!");
    }
  };

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-lg">
        <header className="text-center mb-12" data-animate-on-scroll>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text pb-2">Admin Area</h1>
          <p className="text-lg text-gray-600">Silakan masuk untuk mengelola konten website.</p>
        </header>
        <div className="card p-8 md:p-10 rounded-2xl" data-animate-on-scroll>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold text-lg text-white">
              🔑 Masuk
            </button>
            {error && <p className="text-red-500 text-center text-sm pt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
