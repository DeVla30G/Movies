import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { userService } from "../../services/user.service";
import { alertService } from "../../services/alert.service";
import { ReactSession } from 'react-client-session';
// import "../../styles/globals.css"

export default Login;

function Login() {
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };


    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ email, password }) {
        return userService.login(email, password)
        .then(() => {
            alertService.success('Logged in !', { keepAfterRouteChange: true });
            router.push('/profile');
        })
        .catch(alertService.error);
    }

    function Link({ href, children, ...props }) {
        return (
            <NextLink href={href}>
                <a {...props}>
                    {children}
                </a>
            </NextLink>
        );
    }
    ReactSession.set('user', 'role');
    ReactSession.get('user', 'role');
    
    return (
        <div className="col-xl-6 col-md-12">
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-danger">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        <Link href="/register" className="btn btn-link">Register</Link>
                    </form>
                </div>
            </div>
</div>
    );
}