import React, { useState } from 'react';
import { createStyles, Group, Menu, UnstyledButton, Avatar, Text, Modal } from '@mantine/core';
import { ChevronDown, Logout, User } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, authReset } from '../features/auth/authSlice';
import { remainingTimeBeforeTokenExpiry } from '../utilities';
import { attendanceReset } from '../features/attendance/attendanceSlice';

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
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [userProfileOpened, setUserProfileOpened] = useState(false);
    const { classes, cx } = useStyles(userMenuOpened);

    const handleLogout = () => {
        dispatch(logout())
        dispatch(authReset())
        dispatch(attendanceReset())
        navigate('/')
    }

    return (
        <>
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
                            <Avatar src="https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt={user.name} radius="xl" size={20} />
                            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                {user.name}
                            </Text>
                            <ChevronDown size={12} className={classes.icon} />
                        </Group>
                    </UnstyledButton>
                }
            >
                <Menu.Item onClick={() => setUserProfileOpened(true)} icon={<User size={14} />}>Profile</Menu.Item>
                <Menu.Item icon={<Logout size={14} />} onClick={handleLogout}>Logout</Menu.Item>
            </Menu>
            <Modal opened={userProfileOpened} onClose={() => setUserProfileOpened(false)} title="Your Profile" >
                <Text className={classes.userInfo}>RFID: {user?.rfid}</Text>
                <Text className={classes.userInfo}>Name: {user?.name}</Text>
                <Text className={classes.userInfo}>Email: {user?.email}</Text>
                <Text className={classes.userInfo}>Grade: {user?.grade_level}</Text>
                <Text className={classes.userInfo}>Token Expires in: {remainingTimeBeforeTokenExpiry(user?.expire_time, Date.now() - Number(user?.time_stamp))}</Text>
            </Modal>
        </>
    )
}
