"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "./_components/DashboardLayout";
import { fetchCurrentUser } from "@/app/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHooks";
import { useRouter } from "next/navigation";
import { PageLauncher } from "../common/components/PageLauncher";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (token) {
        try {
          // Dispatch fetchCurrentUser to validate token and get user data
          await dispatch(fetchCurrentUser()).unwrap();

          if (!isAuthenticated) {
            // If user is not authenticated, redirect to the landing
            router.push("/");
            setLoading(false);
          } else {
            setLoading(false);
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Failed to fetch current user:", error);
          router.push("/");
          setLoading(false);
        }
      } else {
        router.push("/");
      }
    };
    checkAuthStatus();
  }, [dispatch, isAuthenticated, router]);

  return (
    <>
      {loading ? (
        <PageLauncher />
      ) : (
        <DashboardLayout>{children}</DashboardLayout>
      )}
    </>
  );
}
