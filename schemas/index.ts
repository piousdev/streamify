import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string().min(1, {
        message: 'Please enter a password'
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string().min(8, {
        message: 'Minimum 8 characters required'
    }),
    name: z.string().min(1, {
        message: 'Please enter a name'
    })
});