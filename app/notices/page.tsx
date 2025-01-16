'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import NoticeInfoComponent from '../components/CardComponent';
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload as DefaultJwtPayload } from 'jwt-decode';

interface JwtPayload extends DefaultJwtPayload {
  nombre: string;
  role: string;
}

export default function NoticesPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>("Select a Topic");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleAdminRedirect = () => {
    router.push('/admin');
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const userData = jwtDecode<JwtPayload>(token);

      console.log("Datos decodificados del token:", userData);
      
      setUserName(userData.nombre);
      setUserRole(userData.role.toString());
    } else {
      router.push('/Login');
    }
  }, [router]);

  return (
    <div className='min-h-screen bg-gray-300'>
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <div className="flex items-center mx-auto m-2">
            <Image
              src="/logoWPITCOM.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <a className="font-bold text-gray-200 text-left w-full h-12 m-2 p-2 text-4xl">
            WPitcom News
          </a>
        </div>
        <div className="flex-none gap-2">
          <span className=''>Welcome {userName}</span>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-3"
            >
              <li>
                <button
                  onClick={handleLogout}
                  className="justify-between flex items-center gap-2 btn btn-outline btn-error"
                >
                  LogOut
                </button>
              </li>
              {/* Mostrar el botón de administración solo si el rol es 1 */}
              {userRole === "1" && (
                <li>
                  <button
                    onClick={handleAdminRedirect}
                    className="justify-between flex items-center gap-2 btn btn-outline btn-primary"
                  >
                    Go to the AdminPage
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between my-4 px-6">
        <select
          id="option"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="select select-primary w-full max-w-xs items-center justify-center"
        >
          <option value="Select a Topic">Select a Topic</option>
          <option value="general">General</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      {/* News Section */}
      <NoticeInfoComponent selectedCategory={selectedCategory} selectedLanguaje="en" />
    </div>
  );
}
