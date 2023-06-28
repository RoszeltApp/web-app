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
            'url(https://sun9-12.userapi.com/impg/6fEqtmUyGq5v-lz1vSr8nGBP9kE5Sau-vfo2yg/0eZ_pzZdU5c.jpg?size=1280x853&quality=96&sign=8b0b44bcd9edcceff47bea0e4544f6e9&type=album)',
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