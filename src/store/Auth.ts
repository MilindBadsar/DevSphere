import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;
  isLoading: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;
  logout(): Promise<void>;
  setUser: (user: Models.User<UserPrefs> | null) => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,
      isLoading: true,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          set({ isLoading: true });
          const session = await account.getSession("current");
          const user = await account.get<UserPrefs>();

          if (!user.prefs?.reputation) {
            await account.updatePrefs<UserPrefs>({ reputation: 0 });
            user.prefs = { reputation: 0 };
          }

          set((state) => {
            state.session = session;
            state.user = user;
            state.isLoading = false;
          });
        } catch (error) {
          console.error(error);
          set((state) => {
            state.session = null;
            state.user = null;
            state.isLoading = false;
          });
        }
      },
      async login(email, password) {
        try {
          const session = await account.createEmailPasswordSession(
            email,
            password
          );
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          if (!user.prefs?.reputation)
            await account.updatePrefs<UserPrefs>({ reputation: 0 });
          set({ session, user, jwt });
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async createAccount(name, email, password) {
        try {
          await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.error(error);
        }
      },
      setUser: (user) => {
        set({ user });
      },
    })),
    {
      name: "auth-storage",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
