"use client";
import axios from "axios";
import Link from "next/link";
import React, {useActionState, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import User from "@/models/userModel";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useCodeEditorStore";
import { CheckCircle, LogOut, XCircle } from "lucide-react";
import Home from "../(root)/page";

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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700 relative overflow-hidden"
      >
        {/* Floating gradient glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Profile Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
          >
            {username ? username[0]?.toUpperCase() : "?"}
          </motion.div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold text-white mb-1">Profile</h1>
          <p className="text-gray-400 mb-6">Your personal account details</p>
          <hr className="border-gray-700 mb-6" />

          {/* Profile Data */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div className="p-3 bg-gray-800/50 rounded-lg text-gray-200 font-medium">
              {id === "nothing" ? "No profile data" : `Username: ${username}`}
            </div>

            <div className="p-3 bg-gray-800/50 rounded-lg text-gray-200 font-medium">
              {id === "nothing" ? "No profile data" : `Email: ${email}`}
            </div>

            <div
              className={`flex items-center justify-center gap-2 p-3 rounded-lg font-semibold ${
                isVerified ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}
            >
              {isVerified ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Verified
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" /> Not Verified
                </>
              )}
            </div>
          </motion.div>

          <hr className="border-gray-700 my-6" />

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
            >Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
    )
}