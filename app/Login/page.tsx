import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="hero min-h-screen w-screen"
            style={{ backgroundImage: 'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)' }}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-6xl font-bold text-indigo-700">Login Now! If you don't have an account, please create one.</h1>
                    <p className="py-6 text-indigo-700">
                        Welcome to our platform. Please login to continue or create a new account if you don't have one yet.
                    </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">

                            {/*User Box*/}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User</span>
                                </label>
                                <input type="email" placeholder="user" className="input input-bordered" required />
                            </div>

                            {/*Password Box*/}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />

                                {/*Create account label*/}
                                <label className="label">
                                    <a href="register" className="label-text-alt link link-hover py-4">Create an Account</a>
                                </label>
                            </div>
                            <div className="form-control mt-2">
                            <a href="" className="btn btn-primary">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
}

