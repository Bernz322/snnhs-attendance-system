import React, { useEffect } from 'react';
import { useForm } from '@mantine/hooks';
import { TextInput, PasswordInput, Text, Paper, Group, Button, createStyles, Container, Space, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, authReset } from '../features/auth/authSlice';

const useStyles = createStyles((theme) => ({
    paper: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
        minHeight: "calc(100vh - 151px)",
        paddingTop: 105,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
    },
    container: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        borderRadius: 15,
    },
    title: {
        color: theme.colors.red[0],
        position: 'relative',
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.maroon[5] : theme.colors.maroon[3],
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
    button: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.maroon[5] : theme.colors.maroon[3],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.maroon[6] : theme.colors.maroon[4],
        }
    },
}));


export default function Auth() {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email: form.values.email,
            password: form.values.password,
        }

        if (!userData.email || !userData.password) {
            showNotification({
                title: 'Please fill in fields.',
                autoclose: 4000,
                color: "red"
            })
            return
        }

        dispatch(login(userData))
    }

    useEffect(() => {
        if (isError) {
            showNotification({
                title: 'Uhuh! Something went wrong',
                message: message,
                autoclose: 4000,
                color: "red"
            })
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(authReset())
    }, [dispatch, isError, isSuccess, message, navigate, user]);

    return (
        <Paper radius={0} className={classes.paper}>
            <Helmet>
                <title>Login - SNNHS Attendance System</title>
            </Helmet>
            <Container size={420} my={40} className={classes.container} style={{ padding: "50px 35px" }}>
                <Text size="lg" weight={500}>
                    Welcome to <span className={classes.title}>SNNHS</span> Attendance System
                </Text>
                <Space h='lg' />
                <form onSubmit={handleSubmit}>
                    <Group direction="column" grow>
                        <TextInput required label="Email" placeholder="youremail@gmail.com" value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput required label="Password" placeholder="Your password" value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />
                    </Group>

                    <Group grow mt="xl">
                        {/* <Button type="submit">{isLoading ? <Loader color="white" size="sm" /> : upperFirst(type)}</Button> */}
                        <Button className={classes.button} type="submit">{isLoading ? <Loader color="white" size="sm" /> : 'Login'}</Button>
                    </Group>
                </form>
            </Container>
        </Paper>
    );
}