'use client';

import router from "next/router";
import React, { useState } from "react";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
        const response = await fetch("http://localhost:3003/api/ApiUsers.txs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "login",
              username,
              password,
            }),
          });
          
          const text = await response.text();  
          console.log("Respuesta cruda del servidor:", text);
          
          const data = JSON.parse(text);
          console.log(data)

      if (response.ok) {
        alert(data.message);
        router.push("/notices");
      } else {
        setErrorMessage(data.message || "Hubo un error al intentar iniciar sesión - Intenta de Nuevo");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="hero min-h-screen w-screen" style={{ backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)' }}>
        <div className="hero-content flex-col lg:flex-row-reverse bg-neutral rounded-lg w-full max-w-[900px] h-auto lg:h-[500px]">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-green-600">Login Now! If you don't have an account, please create one.</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              {/*User Box*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User</span>
                </label>
                <input
                  type="text"
                  placeholder="user"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/*Password Box*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                 {/*Create account label*/}
                 <label className="label">
                    <a href="register" className="label-text-alt link link-hover py-4">Create an Account</a>
                </label>
              </div>

              {/* Error message */}
              {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

              <div className="form-control mt-2">
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Cargando..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
