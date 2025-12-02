/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import type { PersistStorage } from "zustand/middleware";
import { useUvStore } from "./uvStore";
import { useUvTermBasedStore } from "./uvTermBasedStore";

export interface User {
  majorId?: number;
  year?: number;
  universityId?: number;
}

interface UserStore {
  user: User | null;
  setUser: (userData: User) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;
}

export const cookieStorage: PersistStorage<any> = {
  getItem: (name: string) => {
    const cookie = Cookies.get(name);
    if (!cookie) return null;
    try {
      return JSON.parse(cookie);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: any) => {
    Cookies.set(name, JSON.stringify(value), {
      expires: 365 * 100,
      path: "/",
      sameSite: "lax",
    });
  },
  removeItem: (name: string) => {
    Cookies.remove(name, { path: "/" });
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      updateUser: (partial) =>
        set((state) => {
          const prev = state.user;
          const next = { ...(prev || {}), ...partial };

          if (
            (prev && partial.majorId && partial.majorId !== prev.majorId) ||
            (partial.year && partial.year !== prev?.year) ||
            (partial.universityId &&
              partial.universityId !== prev?.universityId)
          ) {
            useUvStore.getState().clearAll();
            useUvTermBasedStore.getState().clearAll();
          }

          return { user: next };
        }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: cookieStorage,
      version: 1,
      migrate: (persistedState: any, version) => {
        if (version === 0 && persistedState) {
          return {
            ...persistedState,
            user: {
              ...persistedState.user,
              universityId: persistedState.user?.universityId ?? 1,
            },
          };
        }
        return persistedState;
      },
    },
  ),
);
