"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    // ইউজার যদি লগইন থাকে এবং ডাটা সাকসেসফুলি লোড হয়
    if (isLoaded && isSignedIn && user) {
      const saveUserToDB = async () => {
        try {
          // full name তৈরি করা
          const fullName =
            `${user.firstName || ""} ${user.lastName || ""}`.trim();

          // আমাদের তৈরি করা API-তে POST রিকোয়েস্ট পাঠানো
          await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id, // Clerk এর ইউনিক আইডি
              email: user.primaryEmailAddress?.emailAddress,
              name: fullName || "Unknown User",
              imageUrl: user.imageUrl,
            }),
          });
        } catch (error) {
          console.error("Error syncing user to database:", error);
        }
      };

      saveUserToDB();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return <div className="p-8 text-center">Loading user profile...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="p-8 text-center text-red-500">
        Please Sign In first to view your dashboard.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">
        স্বাগতম, {user.firstName || "ইউজার"}!
      </h1>
      <p className="text-gray-600">
        আপনার ড্যাশবোর্ড সফলভাবে লোড হয়েছে এবং আপনার ডাটা ব্যাকগ্রাউন্ডে
        ডাটাবেজে সিঙ্ক করা হয়েছে।
      </p>

      {/* ইউজারের বেসিক ইনফো জাস্ট দেখার জন্য */}
      <div className="mt-6 p-4 border border-gray-200 rounded-lg max-w-md bg-gray-50">
        <h3 className="font-semibold mb-2">
          আপনার প্রোফাইল ইনফো (Clerk থেকে):
        </h3>
        <p>
          <strong>ইমেইল:</strong> {user.primaryEmailAddress?.emailAddress}
        </p>
        <p>
          <strong>আইডি:</strong> {user.id}
        </p>
      </div>
    </div>
  );
}
