'use client';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {LoginSchema} from "@/schemas";
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

export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values);
    };
    
    return (
        <CardWrapper
            headerLabel='It’s easy doing what you love'
            backButtonLabel='Don’t have an account?'
            backButtonHref='/auth/register'
            showSocial
        >
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => {
                                return <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
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
                                            type='password'
                                            placeholder='********'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>;
                            }}
                        />
                    </div>
                    <FormError message=''/>
                    <FormSuccess message='' />
                    <Button
                        type='submit'
                        variant='default'
                        className='w-full'
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
};