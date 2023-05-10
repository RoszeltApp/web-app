import { Menu, UnstyledButton, Group, Avatar, rem, Text, createStyles, useMantineColorScheme } from '@mantine/core'
import { IconChevronDown, IconSettings, IconLogout, IconMoonStars, IconSun, IconBasket } from '@tabler/icons-react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logout } from '../../../stores/reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

}));


export default function AccountHeaderMenu() {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const user = useAppSelector(state => state.user);
    const image = 'https://sun9-7.userapi.com/impg/GPYr61C4eexBPAlcPfFDfZKNUFpHs9kl_28_QA/SWUK-6p3Xpk.jpg?size=1615x2160&quality=95&sign=e963ba10b4bbf31f74be14bae0d81e82&type=album';
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dispatch = useAppDispatch();
    const route = useNavigate()

    const handleLogout = () => {
        dispatch(logout());
        route('/');
    }

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                    <Group spacing={7}>
                        <Avatar src={image} alt={user.name} radius="xl" size={20} />
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                            {user.name}
                        </Text>
                        <IconChevronDown size={rem(12)} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    icon={<IconBasket size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
                >
                    Корзина
                </Menu.Item>


                <Menu.Label>Настройки</Menu.Label>
                <Menu.Item icon={colorScheme === 'dark' ? <IconSun size="0.9rem" /> : <IconMoonStars size="0.9rem" />} onClick={() => toggleColorScheme()}>
                    Сменить тему
                </Menu.Item>
                <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                    Личный кабинет
                </Menu.Item>
                <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />} onClick={() => handleLogout()}>Выход</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
