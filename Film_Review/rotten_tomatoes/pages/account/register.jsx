import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import NextLink from 'next/link';
import { userService} from '../../services/user.service';
import { alertService} from '../../services/alert.service';


export default Register;

function Register() {
    const router = useRouter();


    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required('Firstname is required'),
        lastname: Yup.string()
            .required('Lastname is required'),
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Account created successfully', { keepAfterRouteChange: true });
                router.push('login');
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

    return (
        <div className="col-xl-6 col-md-12">
            <div className="card">
                <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
                <h4 className="card-header">Register</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Firstname</label>
                            <input name="firstname" type="text" {...register('firstname')} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Lastname</label>
                            <input name="lastname" type="text" {...register('lastname')} className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-danger">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link href="/account/login" className="btn btn-link">Cancel</Link>
                    </form>
                </div>
            </div>
            </div>
    );
}