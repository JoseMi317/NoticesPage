import React from "react"
import Image from "next/image";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="hero min-h-screen w-screen" 
            style={{ backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)'}}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-pink-500">Create your account!</h1>
                        <p className=" text-pink-500 text-2xl">
                                Please fill the form to create your account.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl flex-col col-span-1">
                        <form className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/*FirstName Box*/}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input type="text" placeholder="First Name" className="input input-bordered" required />
                            </div>

                            {/*LastName Box*/}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input type="text" placeholder="Last Name" className="input input-bordered" required />
                            </div>

                            {/*User Box*/}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User</span>
                                </label>
                                <input type="user" placeholder="user" className="input input-bordered" required />
                            </div>

                            {/*Email Box*/}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>

                            {/*Password Box*/}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                            </div>

                            {/*Button Box*/}
                            <div className="form-control mt-6 sm:col-span-2">
                                <a href="/Login" className="btn btn-secondary">Accept</a>
                            </div>

                        </form>
                    </div>

                    </div>
                </div>
            </div>
    );
}

