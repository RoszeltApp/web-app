import { Anchor, Button, Checkbox, PasswordInput, TextInput, Title, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../stores/reducers/AuthReducer";
import { createUser } from "../../stores/reducers/userReducer";
import { useForm } from "@mantine/form";
import { UserLogin } from "../../types/UserType";
import { useState } from "react";
import { fetchLogin } from "../../api/login";
import { AxiosError } from "axios";



export default function LoginForm() {
    const router = useNavigate();
    const dispatch = useAppDispatch();
    const [saveLogin, setSave] = useState<boolean>(false);

    const initialValues: UserLogin = {
        name: '',
        password: ''
    }

    const form = useForm({
        initialValues,
        validate: {
            name: (value) => value.length >= 3 ? null : 'Не может быть такого имени',
            password: (value) => value.length >= 3 ? null : 'Пароль слишком короткий'
        }
    })

    const handleSubmit = (formValues: UserLogin) => {
        fetchLogin(formValues).then((tokens) => {
            dispatch(login(tokens));
            dispatch(createUser(tokens.access_token));

            if (saveLogin) {
                console.log(saveLogin)
                localStorage.setItem('access_token', tokens.access_token);
                localStorage.setItem('refresh_token', tokens.refresh_token);
            }
            router('/');
        }).catch((e: AxiosError<{ err: string, msg: string }>) => {
            console.log(e)
            form.setFieldError('name', e.response?.data.msg)
        })
    }


    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Title order={2} ta="center" mt="md" mb={50}>
                Добро пожаловать!
            </Title>

            <TextInput label="Пользователь" placeholder="user123" size="md" {...form.getInputProps('name')} />

            <PasswordInput label="Пароль" placeholder="Пароль" mt="md" size="md" {...form.getInputProps('password')} />


            <Checkbox label="Запомнить меня" mt="xl" size="md" checked={saveLogin} onChange={(event) => setSave(event.currentTarget.checked)} />
            <Button fullWidth mt="xl" size="md" type='submit'>
                Вход
            </Button>

            <Text ta="center" mt="md">
                Нет аккаунта?{' '}
                <Anchor<'a'> href="/register" weight={700} onClick={(event) => { event.preventDefault(); router('/register') }}>
                    Зарегистрируйте
                </Anchor>
            </Text>
        </form>
    )
}
