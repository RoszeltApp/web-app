import { WrapperProps } from '../types/Props'
import {
    Paper,
    createStyles,
    rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://sun9-4.userapi.com/impg/wZ6QuJyQ_-xH-KmA7yv6MXzHVewQ--dtqrKKRA/4J85PuEq3i4.jpg?size=1068x801&quality=96&sign=584fef2ec443302b4f018454fd6636bf&type=album)',
    },

    form: {
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        minHeight: '100vh',
        maxWidth: rem(450),
        paddingTop: rem(80),

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

export default function AuthLayout(props: WrapperProps) {
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                {props.children}
            </Paper>
        </div>
    );
}