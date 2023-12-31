'use client';
import {useTransition, useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";
import {RegisterSchema} from "@/schemas";

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };
    
    return (
        <CardWrapper
            headerLabel='It’s easy doing what you love'
            backButtonLabel='Already have an account?'
            backButtonHref='/auth/login'
            showSocial
        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='John Doe'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>;
                            }}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type='email'
                                            placeholder='john.doe@example.com'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>;
                            }}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type='password'
                                            placeholder='********'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>;
                            }}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        variant='default'
                        className='w-full'
                    >
                        Create account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};