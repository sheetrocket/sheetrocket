"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { fetchCurrentUser, logout } from "../redux/slice/authSlice";
import { PageLauncher } from "../common/components/PageLauncher";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
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

          if (isAuthenticated) {
            // If user is authenticated, redirect to the dashboard
            router.replace("/dashboard");
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error("Failed to fetch current user:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch, isAuthenticated, router]);

  if (loading) {
    return <PageLauncher />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <main>{children}</main>
      </>
    );
  }

  return null;
};

export default AuthLayout;
