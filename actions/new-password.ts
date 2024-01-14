'use server';

import bcrypt from "bcryptjs";

import * as z from 'zod';
import {getUserByEmail} from "@/data/user";
import {db} from "@/lib/db";
import {NewPasswordSchema} from "@/schemas";
import {getPasswordResetTokenByToken} from "@/data/password-reset-token";


export const newPassword = async (
    value: z.infer<typeof NewPasswordSchema>,
    token: string | null,
    ) => {
    if (!token) {
        return {error: 'Invalid token'};
    }

    const validatedFields = NewPasswordSchema.safeParse(value);

    if (!validatedFields.success) {
        return {error: 'Invalid fields'};
    }

    const {password} = validatedFields.data;
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {error: 'Invalid token'};
    }

    const hasExpired = new Date(existingToken.expires) < existingToken.expires;

    if (hasExpired) {
        return {error: 'Token has expired'};
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {error: 'User with email does not exist'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            password: hashedPassword,
        },
    });

    await db.passwordResetToken.delete({
        where: {id: existingToken.id},
    });

    return {success: 'Password updated'};
}