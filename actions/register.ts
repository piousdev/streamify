'use server';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Registration failed, invalid fields' };
  }

  const {email, password, name} = validatedField.data;
  const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: 'User already exists' };
    }

    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    });

    // TODO: Send verification email

  return { success: 'User created' };
};
