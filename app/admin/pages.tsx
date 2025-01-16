'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  nombre: string;
  role: string;
}


export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirigir al login
      router.push('/Login');
      return;
    }

    // Decodificar el token
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.role !== '1') {
      // Si el rol no es '1' (admin), redirigir a la página de inicio
      setError('Acceso denegado. Solo administradores.');
      return;
    }

    // Hacer la solicitud al backend para obtener los usuarios
    axios.get('http://localhost:3500/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(err => {
        setError('Error al obtener usuarios');
        console.error(err);
      });
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center p-5">Página de Administración</h1>

      {error && (
        <div className="text-center text-red-600">{error}</div>
      )}

      {!error && users.length > 0 && (
        <div className="p-4">
          <h2 className="text-xl">Lista de Usuarios</h2>
          <ul className="list-disc pl-5">
            {users.map(user => (
              <li key={user.id}>
                {user.firstName} {user.lastName} - {user.username} ({user.role})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
