import React, { useState } from 'react';
import { AppShell, Navbar, createStyles, Paper, Container, Group, Title, SimpleGrid, Text } from '@mantine/core';
import { CalendarEvent, CalendarStats, LayoutDashboard, User, UserPlus } from 'tabler-icons-react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import TopBar from '../components/Navbar'
import { CalendarView, ProfileMenu, TableView, UserCalendarView } from '../components';

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
            justifyContent: 'flex-end',
        },
    },
    root: {
        paddingTop: theme.spacing.xl * 1.5,
        paddingBottom: theme.spacing.xl * 1.5,
    },

    value: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1,
    },
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));


export default function DashboardPage({ colorScheme }) {
    const { classes, cx } = useStyles();
    const { user } = useSelector(state => state.auth)
    const { currentDayRecord } = useSelector(state => state.attendance)
    const { users } = useSelector(state => state.user)

    const [active, setActive] = useState('Dashboard');
    const [userActive, setUserActive] = useState('Attendance');
    const [openedDashboard, setOpenedDashboard] = useState(false);

    const navItems = [
        { link: '', label: 'Dashboard', icon: LayoutDashboard },
        { link: '', label: 'User', icon: User },
        { link: '', label: 'Attendance', icon: CalendarStats },
    ]

    return (
        <AppShell className={classes.main} navbarOffsetBreakpoint="sm" asideOffsetBreakpoint="sm" fixed
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!openedDashboard} width={{ sm: 200, lg: 300 }} style={{ zIndex: 5, }}>
                    <Navbar.Section grow mt="xl">
                        {user?.is_admin ?
                            navItems.map((item) => (
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
                            ))
                            :
                            <a className={cx(classes.link, { [classes.linkActive]: 'Attendance' === userActive })}
                                href={'/'} onClick={(event) => { event.preventDefault(); setUserActive('Attendance'); setOpenedDashboard(false) }} >
                                <CalendarStats className={cx(classes.linkIcon, { [classes.linkActive]: 'Attendance' === userActive })} />
                                <span>{'Attendance'}</span>
                            </a>
                        }
                        <Group position="apart" grow pl="sm" pr="sm" mt="lg" className={classes.left}>
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
                <Helmet>
                    <title>Dashboard - SNNHS Attendance System</title>
                </Helmet>
                {user?.is_admin ?
                    <>
                        <div className={classes.root}>
                            <SimpleGrid
                                cols={2}
                                breakpoints={[
                                    { maxWidth: 'md', cols: 2 },
                                    { maxWidth: 'xs', cols: 1 },
                                ]}
                            >
                                <Paper withBorder p="md" radius="md">
                                    <Group position="apart">
                                        <Text size="xs" color="dimmed" className={classes.title}>
                                            Student Count
                                        </Text>
                                        <User className={classes.icon} size={22} />
                                    </Group>
                                    <Text className={classes.value}>{users.length - 1}</Text>
                                    <Text size="xs" color="dimmed" mt={7}>
                                        All students in the database excluding the admin
                                    </Text>
                                </Paper>
                                <Paper withBorder p="md" radius="md">
                                    <Group position="apart">
                                        <Text size="xs" color="dimmed" className={classes.title}>
                                            Today's Attendance Count
                                        </Text>
                                        <CalendarEvent className={classes.icon} size={22} />
                                    </Group>
                                    <Text className={classes.value}>{currentDayRecord.length}</Text>
                                    <Text size="xs" color="dimmed" mt={7}>
                                        All attendance recorded today
                                    </Text>
                                </Paper>
                            </SimpleGrid>
                        </div>
                        {(active === "User" || active === "Dashboard") &&
                            <Paper className={classes.paper2}>
                                <Title order={1} align='center'>User Table</Title>
                                <TableView colorScheme={colorScheme} />
                            </Paper >}

                        {(active === "Attendance" || active === "Dashboard") &&
                            <Paper className={classes.paper2} mt="lg">
                                <Title order={1} align='center' mb='md'>Attendance</Title>
                                <CalendarView />
                            </Paper>}
                    </>
                    :
                    (userActive === "Attendance") &&
                    <Paper className={classes.paper2} mt="lg">
                        <Title order={1} align='center' mb='md'>Attendance</Title>
                        <UserCalendarView />
                    </Paper>
                }
            </Container>
        </AppShell>
    );
}