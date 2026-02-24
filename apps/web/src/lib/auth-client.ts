import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

export const { useSession, deleteUser, getSession, signIn, signOut, signUp } =
	authClient;
