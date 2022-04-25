import React, { useState } from 'react';
import { createStyles, Group, Menu, UnstyledButton, Avatar, Text } from '@mantine/core';
import { ChevronDown, Logout, User } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme, opened) => ({
    userMenu: {
        [theme.fn.smallerThan('xs')]: {
            marginRight: 15,
        },
    },
    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
    },
    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
    icon: {
        transition: 'transform 150ms ease',
        transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
    },
}));

export default function ProfileMenu() {
    const navigate = useNavigate()

    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { classes, cx } = useStyles(userMenuOpened);

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <Menu
            size={260}
            placement="end"
            transition="pop-top-right"
            className={classes.userMenu}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
                <UnstyledButton
                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                    <Group spacing={7}>
                        <Avatar src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg" alt="giga-chaddo" radius="xl" size={20} />
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                            Gigachad
                        </Text>
                        <ChevronDown size={12} className={classes.icon} />
                    </Group>
                </UnstyledButton>
            }
        >
            <Menu.Item icon={<User size={14} />}>Profile</Menu.Item>
            <Menu.Item icon={<Logout size={14} />} onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
    )
}
