"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Import auth จากไฟล์ที่เราตั้งค่าไว้
import Login from "@/components/admin/Login";
import Dashboard from "@/components/admin/Dashboard";
import { Loader2 } from "lucide-react";

const AdminPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged จะคอยเช็คสถานะการ login อยู่ตลอดเวลา
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup function เพื่อยกเลิกการ lắng nghe เมื่อ component ถูก unmount
    return () => unsubscribe();
  }, []);

  // ขณะกำลังโหลด ให้แสดงหน้า loading
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-accent" />
      </div>
    );
  }

  // ถ้า user login อยู่ ให้แสดงหน้า Dashboard
  // ถ้ายังไม่ login ให้แสดงหน้า Login
  return <div>{user ? <Dashboard /> : <Login />}</div>;
};

export default AdminPage;