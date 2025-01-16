'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';

interface JwtPayload {
  nombre: string;
  role: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleNoticeRedirect = () => {
    router.push('/notices');
  };

  const DeleteUser = (id: number) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:3500/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        setError('Error al eliminar el usuario.');
        console.error(err);
      });
  };

  const UpdateUser = (updatedData: any) => {
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:3500/api/admin/users/${updatedData.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(users.map((user) => (user.id === updatedData.id ? response.data.user : user)));
        setSelectedUser(null);
        closeModal();
      })
      .catch((err) => {
        setError('Error al actualizar el usuario.');
        console.error(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login');
      return;
    }

    const decoded = jwtDecode<JwtPayload>(token);
    if (Number(decoded.role) !== 1) {
      setError('Acceso denegado. Solo administradores.');
      router.push('/notices');
      return;
    }

    axios
      .get('http://localhost:3500/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        setError('Error al obtener usuarios');
        console.error(err);
      });
  }, [router]);

  const openModal = () => {
    const modal: HTMLDialogElement | null = document.querySelector('#edit_user_modal');
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    const modal: HTMLDialogElement | null = document.querySelector('#edit_user_modal');
    if (modal) modal.close();
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <div className="flex items-center mx-auto m-2">
            <Image src="/logoWPITCOM.png" alt="Logo" width={100} height={100} />
          </div>
          <a className="font-bold text-gray-200 text-left w-full h-12 m-2 p-2 text-4xl">
            WPitcom News
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="justify-between p-6">
        <button className="btn btn-circle w-24 btn-warning" onClick={handleNoticeRedirect}>
          Back
        </button>
        <h1 className="text-3xl font-bold text-center p-5 text-black">Users registered in the database</h1>
      </div>

      {/* Error message */}
      {error && <div className="text-center text-red-600">{error}</div>}

      {/* User table */}
      <div className="container mx-auto border border-black bg-white rounded-lg shadow-md p-4">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2">id</th>
              <th className="p-2">Name</th>
              <th className="p-2">email</th>
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-200">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border p-2">{user.email || 'N/A'}</td>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">
                    <button
                      className="btn btn-sm btn-warning mr-2"
                      onClick={() => {
                        setSelectedUser(user);
                        openModal();
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => DeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center border p-4 text-gray-500">
                  {error ? 'Error cargando usuarios.' : 'No hay usuarios disponibles.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      <dialog id="edit_user_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Editar Usuario</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              UpdateUser(selectedUser);
            }}
          >
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                value={selectedUser?.firstName || ''}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, firstName: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Apellido</span>
              </label>
              <input
                type="text"
                value={selectedUser?.lastName || ''}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, lastName: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                value={selectedUser?.username || ''}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                value={selectedUser?.role || ''}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: parseInt(e.target.value, 10) })
                }
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="1">Administrator</option>
                <option value="2">User</option>
              </select>
            </div>


            <div className="modal-action">
              <button className="btn btn-primary" type="submit">
                Guardar
              </button>
              <button className="btn btn-error" type="button" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
