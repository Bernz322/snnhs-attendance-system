import React from 'react';
import { createStyles, Header, Container, Group, Burger, MediaQuery, useMantineTheme } from '@mantine/core';

import { LightDarkButton, Logo, ProfileMenu } from '.';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    root: {
        position: 'fixed',
        zIndex: 5,
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        [theme.fn.smallerThan('xs')]: {
            justifyContent: 'left',
        },
    },

    left: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    }
}));

export default function Navbar({ setOpenedDashboard, openedDashboard, dashboard, user }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    if (dashboard) user = true

    return (
        <Header height={HEADER_HEIGHT} mb={10} className={classes.root}>
            <Container className={classes.header} size="xl">
                {dashboard &&
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                            opened={openedDashboard}
                            onClick={() => setOpenedDashboard((o) => !o)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                    </MediaQuery>
                }
                <Logo />
                <Group spacing={5} className={classes.left}>
                    <LightDarkButton />
                    {user &&
                        <ProfileMenu />
                    }
                </Group>
            </Container>
        </Header >
    );
}