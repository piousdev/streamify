'use server';

import * as z from 'zod';
import {ResetSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";
import {sendPasswordResetEmail} from "@/lib/mail";
import {generatePasswordResetToken} from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Reset failed, invalid fields'};
    }

    const {email} = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {error: 'User does not exist'};
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return {success: 'Reset email sent'};
}