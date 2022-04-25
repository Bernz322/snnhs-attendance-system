import React from 'react'
import { Container, Text, createStyles, Group, ActionIcon } from '@mantine/core';
import { BrandFacebook, BrandTwitter } from 'tabler-icons-react';
import { Logo } from '../components'

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
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

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },
    powered: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.dark[8],
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
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <ActionIcon size="lg">
                                <BrandTwitter size={18} />
                            </ActionIcon>
                        </a>
                    </div>
                    <Text size="xxs" className={classes.powered}>
                        Powered by:
                    </Text>
                    <Text size="xxs" className={classes.powered}>
                        Surigao del Norte National High School
                    </Text>
                </Group>
            </Container>
        </div>
    )
}
