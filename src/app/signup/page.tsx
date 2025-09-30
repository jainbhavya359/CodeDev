'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage(){
    const router = useRouter();
    const [ user, setUser ] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [ loading, setLoading ] = useState(false);
    const [ buttonDisabled, setButtonDisabled ] = useState(true);

    const onSignUp = async () => {
        try{
            setLoading(true);
            console.log("loading");
            setButtonDisabled(true);
            const response = await axios.post("/api/user/signup", user);
            console.log(response.data);
            setLoading(false);
            setButtonDisabled(false);
            router.push('/login');
        }catch(error: any){
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
            <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700">
                
                {/* Heading */}
                <h1 className="text-3xl font-extrabold text-center mb-2 text-white">
                {loading ? "Processing..." : "Create Account"}
                </h1>
                <p className="text-gray-400 text-center mb-6">
                Sign up to get started 🚀
                </p>
                <hr className="border-gray-700 mb-6" />

                {/* Username */}
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
                </label>
                <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Enter your username"
                className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />

                {/* Email */}
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
                </label>
                <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />

                {/* Password */}
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
                </label>
                <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />

                {/* Button */}
                <button
                onClick={onSignUp}
                disabled={buttonDisabled}
                className={`w-full py-3 rounded-lg font-semibold transition 
                    ${buttonDisabled 
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
                    }`}
                >
                {buttonDisabled ? "No signup" : "Signup"}
                </button>

                {/* Link */}
                <p className="text-center text-gray-400 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-400 hover:underline">
                    Login here
                </Link>
                </p>
            </div>
            </div>
        </>
    )
}