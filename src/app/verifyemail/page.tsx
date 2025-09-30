"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/user/verifyemail', {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.reponse);
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log(urlToken)
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-700 text-center">
            
            {/* Heading */}
            <h1 className="text-3xl font-extrabold text-white mb-4">
            Verify Email
            </h1>

            {/* Token Display (for dev/debug purposes) */}
            <h2 className="p-2 mb-6 rounded-lg bg-orange-500/90 text-black font-mono">
            {token ? token : "No token provided"}
            </h2>

            {/* Verified State */}
            {verified && (
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">
                ✅ Email Verified Successfully!
                </h2>
                <Link
                href="/login"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
                >
                Go to Login
                </Link>
            </div>
            )}

            {/* Error State */}
            {error && (
            <div className="mt-6">
                <h2 className="text-2xl font-semibold bg-red-600/80 text-white px-4 py-2 rounded-lg inline-block">
                ❌ Verification Failed
                </h2>
                <p className="text-gray-400 mt-3">
                The token may be invalid or expired.  
                Try signing up again.
                </p>
            </div>
            )}
        </div>
        </div>
    )

}