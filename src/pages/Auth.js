import React from 'react';
import { useForm } from '@mantine/hooks';
import { TextInput, PasswordInput, Text, Paper, Group, Button, Divider, createStyles, Container } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
    paper: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
        minHeight: "calc(100vh - 151px)",
        paddingTop: 105,
        paddingLeft: 15,
        paddingRight: 15,
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


export default function Auth({ setUser }) {
    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail(form.values.email)) {
            showNotification({
                title: 'Uhuh! Something went wrong',
                message: "Invalid email address.",
                autoclose: 4000,
                color: "red"
            })
            return
        }

        const userData = {
            email: form.values.email,
            password: form.values.password,
        }
        console.log(userData);
        setUser(true)
    }

    return (
        <Paper radius={0} className={classes.paper}>
            <Container size={420} my={40} className={classes.container} style={{ padding: "50px 35px" }}>
                <Text size="lg" weight={500}>
                    Welcome to <span className={classes.title}>SNNHS</span> Attendance System
                </Text>

                <Group grow mb="md" mt="md">
                    <Button className={classes.button}>Continue with Google</Button>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={handleSubmit}>
                    <Group direction="column" grow>

                        <TextInput required label="Email" placeholder="pogi@vacay.io" value={form.values.email}
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
                        <Button className={classes.button} type="submit">Login</Button>
                    </Group>
                </form>
            </Container>
        </Paper>
    );
}