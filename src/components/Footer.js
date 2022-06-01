import React from 'react'
import { Container, Text, createStyles, Group, ActionIcon } from '@mantine/core';
import { BrandFacebook } from 'tabler-icons-react';
import { Logo } from '../components'

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        position: 'relative',
        zIndex: 99,
        [theme.fn.smallerThan('xs')]: {
            zIndex: 4,
        },
    },
    links: {
        display: "flex",
        flexDirection: "column",
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
    innerFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        position: 'relative',

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },
    powered: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.dark[8],
    },
    providers: {
        '&:hover': {
            color: theme.colors.maroon[2],
        },
    }

}))

export default function Footer() {
    const { classes } = useStyles();
    return (
        <div className={classes.footer}>
            <Container className={classes.innerFooter}>
                <Logo />
                <Text color="dimmed" size="sm">
                    © 2022 SNNHS. All rights reserved.
                </Text>
                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <div style={{ display: "flex" }}>
                        <a href="https://web.facebook.com/snnhs" target="_blank" rel="noreferrer">
                            <ActionIcon size="lg">
                                <BrandFacebook size={18} />
                            </ActionIcon>
                        </a>
                    </div>
                    <Text size="xxs" className={classes.powered}>
                        Provided by:
                    </Text>
                    <Text size="xxs" className={classes.powered}>
                        <a className={classes.providers} href="https://github.com/Bernz322" target="_blank" rel='noreferrer'>Abucejo</a>
                        <span> | </span>
                        <a className={classes.providers} href="https://github.com/roger2020-ui" target="_blank" rel='noreferrer'>Bernadas</a>
                        <span> | </span>
                        <a className={classes.providers} href="https://github.com/abby2727" target="_blank" rel='noreferrer'>Pangandaman</a>
                    </Text>
                </Group>
            </Container>
        </div>
    )
}
