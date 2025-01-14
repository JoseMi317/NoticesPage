import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 ">
        <div className="hero bg-base-200 min-h-screen w-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now o Create your account!</h1>
                    <p className="py-6">
                        
                    </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">User</span>
                        </label>
                        <input type="email" placeholder="user" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required />
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

