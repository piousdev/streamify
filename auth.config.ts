import Credentials from "@auth/core/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import {LoginSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import bcrypt from "bcryptjs";

// @ts-ignore
export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = await LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig