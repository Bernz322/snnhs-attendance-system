import React, { useState } from 'react';
import { AppShell, Navbar, createStyles, Paper, Container, Group, Title } from '@mantine/core';
import { CalendarStats, LayoutDashboard, User } from 'tabler-icons-react';

import TopBar from '../components/Navbar'
import { CalendarView, LightDarkButton, ProfileMenu } from '../components';

const useStyles = createStyles((theme) => ({
    main: {
        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3],
        padding: 0,
    },
    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    linkIcon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.maroon[5] : theme.colors.maroon[5],
            color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[0],
        },
    },
    paper2: {
        borderRadius: 15,
        backgroundColor: theme.colorScheme === 'dark' ? '#424242' : theme.colors.gray[0],
        padding: 25,
        width: '100%'
    },
    left: {
        display: 'none',
        [theme.fn.smallerThan('xs')]: {
            display: 'flex',
        },
    }
}));


export default function DashboardPage() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Dashboard');
    const [openedDashboard, setOpenedDashboard] = useState(false);

    const account = [
        { link: '', label: 'Dashboard', icon: LayoutDashboard },
        { link: '', label: 'User', icon: User },
        { link: '', label: 'Attendance', icon: CalendarStats },
    ]

    return (
        <AppShell className={classes.main} navbarOffsetBreakpoint="sm" asideOffsetBreakpoint="sm" fixed
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!openedDashboard} width={{ sm: 200, lg: 300 }} style={{ zIndex: 5, }}>
                    <Navbar.Section grow mt="xl">
                        {account.map((item) => (
                            <a className={cx(classes.link, { [classes.linkActive]: item.label === active })}
                                href={item.link}
                                key={item.label}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setActive(item.label);
                                    setOpenedDashboard(false)
                                }}
                            >
                                <item.icon className={cx(classes.linkIcon, { [classes.linkActive]: item.label === active })} />
                                <span>{item.label}</span>
                            </a>
                        ))}
                        <Group position="apart" grow pl="sm" pr="sm" mt="lg" className={classes.left}>
                            <LightDarkButton />
                            <ProfileMenu />
                        </Group>
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <TopBar setOpenedDashboard={setOpenedDashboard} openedDashboard={openedDashboard} dashboard={true} />
            }
        >
            <Container size="xl" className={classes.filter}>
                {(active === "User" || active === "Dashboard") &&
                    <Paper className={classes.paper2}>
                        <Title order={1} align='center'>User Table</Title>
                    </Paper >
                }

                {(active === "Attendance" || active === "Dashboard") &&
                    <Paper className={classes.paper2} mt="lg">
                        <Title order={1} align='center' mb='md'>Attendance</Title>
                        <CalendarView />
                    </Paper>
                }
            </Container>
        </AppShell>
    );
}