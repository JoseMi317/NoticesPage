'use client';

import React, { useState } from 'react';
import Image from "next/image";
import NoticeInfoComponent from '../components/CardComponent';

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Select a Topic");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };


  return (
    <div className='min-h-screen'>
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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a href='/' className="justify-between flex items-center gap-2 btn btn-outline btn-error">
                  LogOut
                </a>
              </li>
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

    
        <div className="join space-x-8 rounded">
          <button className="join-item btn">«</button>
          <button className="join-item text-2xl text-black">Page{/*number page*/}</button>
          <button className="join-item btn">»</button>
        </div>
      </div>

      {/* News Section */}
      <NoticeInfoComponent selectedCategory={selectedCategory} selectedLanguaje="en"/> 
    </div>
  );
}
