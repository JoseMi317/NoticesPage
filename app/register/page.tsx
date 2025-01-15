'use client';

import router from "next/router";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3500/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstName,
          lastName,
          role: 2,
        }),
      });
    
      // Intenta convertir la respuesta a JSON directamente
      const data = await response.json();
      console.log("Respuesta procesada del servidor:", data);
    
      if (response.ok) {
        alert(data.message); // Mensaje del servidor en caso de éxito
        router.push("/Login"); // Redirecciona al login
      } else {
        setErrorMessage(data.message || "Hubo un error al crear la cuenta");
      }
    } catch (error) {
      console.error("Error en la conexión o durante la solicitud:", error);
      setErrorMessage("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="hero min-h-screen w-screen" style={{ backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)' }}>
        <div className="hero-content flex-col lg:flex-row-reverse bg-neutral rounded-lg w-full max-w-[900px] h-auto lg:h-[580px]">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-pink-500">Create your account!</h1>
            <p className=" text-pink-500 text-2xl">
              Please fill the form to create your account.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
            <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4 bg-base-100 w-full max-w-sm shrink-0 flex-col col-span-1">
                            {/*FirstName Box*/}
                            <div className="form-control">
                                <label className="label">
                                  <span className="label-text">First Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="First Name"
                                    className="input input-bordered" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    required 
                                    />
                            </div>
                             {/*LastName Box*/}
                             <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Last Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Last Name"
                                    className="input input-bordered" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} 
                                    required 
                                    />
                            </div>
                             {/*Username Box*/}
                             <div className="form-control">
                                <label className="label">
                                  <span className="label-text">UserName</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="UserName"
                                    className="input input-bordered" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                    />
                            </div>
                             {/*Email Box*/}
                             <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Email</span>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    className="input input-bordered" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
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
                                    placeholder="Password"
                                    className="input input-bordered" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    />
                            </div>
                    </div>
              {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-secondary" disabled={loading}>
                  {loading ? "Cargando..." : "Crear Cuenta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
