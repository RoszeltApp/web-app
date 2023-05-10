import { useState } from 'react';
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
//import { MantineLogo } from '@mantine/ds';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AccountHeaderMenu from '../AccountHeaderfMenu/AccountHeaderMenu';
import { useAppRoutes } from '../../../hooks/useAppRoutes';


const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));


export default function MyHeader() {
    const locale = useLocation();

    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(locale.pathname);
    const { classes, cx } = useStyles();

    const router = useNavigate();

    const routes = useAppRoutes();

    const items = routes.map((link) => (
        link.menu &&
        <Link
            key={link.path}
            to={link.path}
            className={cx(classes.link, { [classes.linkActive]: active === link.path })}
            onClick={(event) => {
                event.preventDefault();
                setActive(link.path);
                close();
                router(link.path)
            }}
        >
            {link.name}
        </Link>
    ));

    return (
        <Header height={HEADER_HEIGHT} mb={50} className={classes.root}>
            <Container className={classes.header}>
                {/* <MantineLogo size={28} /> */}
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                        </Paper>
                    )}
                </Transition>
                <Group>
                    <AccountHeaderMenu></AccountHeaderMenu>
                </Group>
            </Container>
        </Header>
    );
}
