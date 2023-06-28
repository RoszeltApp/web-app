import { Button, Group, Input, Radio, Stack, TextInput, Title, Text, Anchor } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { IMaskInput } from 'react-imask';
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../../types/UserType";
import { useForm } from "@mantine/form";
import { register } from "../../api/register";
import { AxiosError } from "axios";
import { useState } from "react";

export default function RegisterForm() {
    const id = useId();
    const router = useNavigate();
    const [register_done, setRegDone] = useState(false);

    const initialValues: UserRegister = {
        name: '',
        company_name: '',
        mail: '',
        phone: '',
        password: '',
        role_code: 0
    }

    const form = useForm({
        initialValues,
        validate: {
            name: (value) => value.length > 3 ? null : 'Не может быть такого имени',
            password: (value) => value.length >= 3 ? null : 'Пароль слишком короткий',
            role_code: (value) => value == 0 ? 'Выфберите роль!!' : null,
            mail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неправильный формат электронной почты'),
        }
    })

    const handleSubmit = (formValues: UserRegister) => {
        register(formValues).then(() => {
            setRegDone(true);
        }
        ).catch((e: AxiosError<{ err: string, msg: string }>) => {
            console.log(e)
            form.setFieldError('name', e.response?.data.msg)
        })
    }

    if (register_done) {
        return (
            <Stack spacing='sm'>
                <Title order={2} ta="center" mt="md" mb={50}>
                    Регистрация Завершена
                </Title>

                <Text>
                    Начните пользоваться уже сейчас
                </Text>

                <Button fullWidth mt="xl" size="md" type='submit' onClick={() => router('/login')}>
                    Войти
                </Button>

            </Stack>
        )
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack spacing='sm'>
                <Title order={2} ta="center" mt="md" mb={50} >
                    Регистрация
                </Title>

                <TextInput label="Имя пользователя" placeholder="user123" required size="md" {...form.getInputProps('name')} />

                <Input.Wrapper id={id} label="Ваш номер телефона" required size="md"  >
                    <Input<any>
                        component={IMaskInput}
                        mask="+7 (000) 000-00-00"
                        id={id}
                        placeholder="Номер телефона"
                        size="md"
                        required
                        {...form.getInputProps('phone')}
                    />
                </Input.Wrapper>

                <TextInput label="Компания" placeholder="Microsoft" required size="md" {...form.getInputProps('company_name')} />

                <TextInput label="Адрес электронной почты"
                    placeholder="microsoft@mail.ru"
                    required size="md"
                    {...form.getInputProps('mail')} />

                <TextInput label="Пароль" placeholder="Пароль" required size="md"   {...form.getInputProps('password')} />

                <Radio.Group
                    name="role"
                    label="Выберите как будете пользоваться системой"
                    description="Это очень важно"
                    withAsterisk
                    {...form.getInputProps('role_code')}
                >
                    <Group mt="xs">
                        <Radio value='1' label="Поставщик" />
                        <Radio value='2' label="Организация" />
                    </Group>


                </Radio.Group>

                <Button fullWidth mt="xl" size="md" type='submit'>
                    Регистрация
                </Button>
                <Text ta="center" mt="md">
                    Уже есть аккаун?{' '}
                    <Anchor<'a'> href="/login" weight={700} onClick={(event) => { event.preventDefault(); router('/login') }}>
                        Войти
                    </Anchor>
                </Text>
            </Stack>
        </form>
    )
}
