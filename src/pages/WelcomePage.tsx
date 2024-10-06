import { createStyles, Overlay, Container, Title, Button, Text, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const useStyles = createStyles((theme) => ({
    hero: {
        position: 'relative',
        backgroundImage:
            'url(https://sun9-34.userapi.com/impg/B-t_x1qN0IeF2swDyWWKY0jo6aQ4xSaYY0a6vA/dYvUEJAEkNg.jpg?size=1280x853&quality=96&sign=0814b8f86139a5dcbddae941d655bdf4&type=album)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: `calc(${theme.spacing.xl} * 6)`,
        zIndex: 1,
        position: 'relative',

        [theme.fn.smallerThan('sm')]: {
            height: rem(500),
            paddingBottom: `calc(${theme.spacing.xl} * 3)`,
        },
    },

    title: {
        color: theme.white,
        fontSize: rem(60),
        fontWeight: 900,
        lineHeight: 1.1,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(40),
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
            lineHeight: 1.3,
        },
    },

    description: {
        color: theme.white,
        maxWidth: 600,

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
            fontSize: theme.fontSizes.sm,
        },
    },

    control: {
        marginTop: `calc(${theme.spacing.xl} * 1.5)`,

        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },
}));

export default function WelcomePage() {
    const { classes } = useStyles();

    const { isAuth } = useAppSelector(state => state.auth);

    const navigate = useNavigate();

    const handleClick = () => {
        if (isAuth) {
            navigate('/main')
        }
        else {
            navigate('/login');
        }
    }

    return (
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container}>
                <Title className={classes.title}>Выпускная квалификационная работа</Title>
                <Text className={classes.description} size="xl" mt="xl">
                    Выполнил: ст. гр. ИСТ-412 Фархутдинов А.Т.
                </Text>

                <Button variant="gradient" size="xl" radius="xl" className={classes.control} onClick={handleClick}>
                    {isAuth ? <>Начать</> : <>Войти в систему</>}

                </Button>
            </Container>
        </div>
    );
}