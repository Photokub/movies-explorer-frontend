import React, {useEffect} from "react";
import Form from "../Form/Form";
import {useForm} from "react-hook-form";
import {
    EMAIL_REG_EXP,
    INCORRECT_EMAIL,
    MAX_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD_MESSAGE,
    MIN_LENGTH_PASSWORD,
    MIN_LENGTH_PASSWORD_MESSAGE,
    REQUIRED_FIELD
} from "../../utils/constants";

export default function LoginForm({login, loggedIn, userData, setUserData, errorToolTip, hasError, setHasError}) {

    useEffect(() => {
        setHasError(false)
    }, [])


    const {register, handleSubmit, watch, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    });

    const email = watch('email')
    const password = watch('password')


    const handleLoginSubmit = () => {
        login({email, password})
        hasError ? setHasError(true) : setHasError(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    return (
        <Form
            name='register'
            method='post'
            btnText='Войти'
            login={login}
            loggedIn={loggedIn}
            userData={userData}
            handleSubmit={handleSubmit(handleLoginSubmit)}
            isValid={isValid}
            errorToolTip={errorToolTip}
            hasError={hasError}
        >
            <label className='form__field'>
                <span className='form__input__title'>E-mail</span>
                <input className='form__input'
                       type='email'
                       required
                       value={email}
                       onChange={handleChange}
                       {...register('email', {
                           required: REQUIRED_FIELD,
                           pattern: {
                               value: EMAIL_REG_EXP,
                               message: INCORRECT_EMAIL
                           }
                       })}
                />
                {errors.email && <span className='form__input__err' id='name_field-err'>{errors?.email?.message}</span>}
            </label>
            <label className='form__field'>
                <span className='form__input__title'>Пароль</span>
                <input className='form__input'
                       type='password'
                       required
                       value={password}
                       onChange={handleChange}
                       {...register('password', {
                           required: REQUIRED_FIELD,
                           minLength: {
                               value: MIN_LENGTH_PASSWORD,
                               message: MIN_LENGTH_PASSWORD_MESSAGE
                           },
                           maxLength: {
                               value: MAX_LENGTH_PASSWORD,
                               message: MAX_LENGTH_PASSWORD_MESSAGE
                           },
                       })}
                />
                {errors.password &&
                    <span className='form__input__err' id='name_field-err'>{errors?.password?.message}</span>}
            </label>
        </Form>
    )
}

