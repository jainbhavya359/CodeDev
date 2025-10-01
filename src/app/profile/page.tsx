"use client";
import axios from "axios";
import Link from "next/link";
import React, {useActionState, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import User from "@/models/userModel";
import { useUserStore } from "@/store/useCodeEditorStore";

export default function ProfilePage() {
    const router = useRouter()
    const [id, setId] = useState("nothing")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const { clearUserId } = useUserStore();

    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            clearUserId;
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/user/me')
            console.log(res.data);
            setId(res.data.data._id)

            setUsername(res.data.data.user);
            setEmail(res.data.data.email);
            setIsVerified(res.data.data.isVerified);
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700 text-center">
            
            {/* Heading */}
            <h1 className="text-3xl font-extrabold text-white mb-2">Profile</h1>
            <p className="text-gray-400 mb-6">Your personal account details</p>
            <hr className="border-gray-700 mb-6" />

            {/* Profile Data */}
            <h2
            className={`p-2 mb-3 rounded-lg font-semibold ${
                id === "nothing"
                ? "bg-gray-700 text-gray-300"
                : "bg-green-500 text-black"
            }`}
            >
            {id === "nothing" ? (
                "No profile data available"
            ) : (
                `Username: ${username}`
            )}
            </h2>

            <h2
            className={`p-2 mb-3 rounded-lg font-semibold ${
                id === "nothing"
                ? "bg-gray-700 text-gray-300"
                : "bg-green-500 text-black"
            }`}
            >
            {id === "nothing" ? (
                "No profile data available"
            ) : (
                `Email: ${email}`
            )}
            </h2>

            <h2
            className={`p-2 rounded-lg font-semibold ${
                id === "nothing"
                ? "bg-gray-700 text-gray-300"
                : "bg-green-500 text-black"
            }`}
            >
            {id === "nothing" ? (
                "No profile data available"
            ) : (
                `IsVerified: ${isVerified}`
            )}
            </h2>

            <hr className="border-gray-700 my-6" />

            {/* Actions */}
            <div className="flex flex-col gap-4">
            <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
            >
                Logout
            </button>
            <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition">
                Home
            </Link>
            </div>
        </div>
        </div>
    )
}