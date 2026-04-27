import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isLoading: isInitializing || isLoggingIn,
    identity,
    loginStatus,
    login: handleLogin,
    logout: handleLogout,
    principalId: identity?.getPrincipal().toString() ?? null,
  };
}
