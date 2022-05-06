import React, { useState } from 'react'
import { Button, createStyles, Paper, Tooltip, TextInput } from '@mantine/core';
import DataTable from 'react-data-table-component'
import { ArrowNarrowDown, Edit, Eye, Trash } from 'tabler-icons-react';

const useStyles = createStyles((theme, { floating }) => ({
    paper: {
        borderRadius: 15,
        backgroundColor: theme.colorScheme === 'dark' ? '#424242' : theme.colors.gray[0],
        paddingTop: 15,
        paddingBottom: 15,
        width: '100%'
    },
    root: {
        position: 'relative',
    },

    label: {
        position: 'absolute',
        zIndex: 2,
        top: 7,
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: floating
            ? theme.colorScheme === 'dark'
                ? theme.white
                : theme.black
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.gray[5],
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: floating ? 1 : 0,
    },

    input: {
        '&::placeholder': {
            transition: 'color 150ms ease',
            color: !floating ? 'transparent' : undefined,
        },
        width: '200px'

    },
}));

const customStyles = {
    header: {
        style: {
            display: 'none'
        },
    },
}

export default function TableView({ colorScheme }) {
    const [focused, setFocused] = useState(false);
    const [filterByName, setFilterByName] = useState('');
    const { classes } = useStyles({ floating: filterByName.trim().length !== 0 || focused });

    const handleUserUpdateButtonClick = (row) => {
        console.log(row)
    }
    const handleUserDeleteButtonClick = (id) => {
        console.log('User ID', id)
    }

    const usersColumns = [
        { name: 'User ID', selector: row => row.id, sortable: true, left: true },
        { name: 'RFID', selector: row => row.rfid, sortable: true, left: true },
        { name: 'Name', selector: row => row.name, sortable: true, left: true, },
        { name: 'Email', selector: row => row.email, left: true, compact: true, sortable: true, },
        { name: 'Password', selector: row => row.password, sortable: true, left: true, },
        { name: 'Phone', selector: row => `+63${row.phone_number}`, left: true, compact: true, sortable: true, },
        { name: 'Grade', selector: row => row.level, left: true, compact: true, sortable: true, },
        {
            name: 'Actions',
            minWidth: '200px',
            cell: (row) => (
                <>
                    <Tooltip label="View User Profile" withArrow radius="md">
                        <Button radius="md" size="xxs" color='green'>
                            <Eye size={14} strokeWidth={2} />
                        </Button>
                    </Tooltip>
                    <Tooltip label="Edit User" withArrow radius="md">
                        <Button radius="md" ml="sm" size="xxs" color='blue' onClick={() => handleUserUpdateButtonClick(row)}>
                            <Edit size={14} strokeWidth={2} />
                        </Button>
                    </Tooltip>
                    <Tooltip label="Delete User" withArrow radius="md">
                        <Button radius="md" ml="sm" size="xxs" color='red' onClick={() => handleUserDeleteButtonClick(row.id)}>
                            <Trash size={14} strokeWidth={2} />
                        </Button>
                    </Tooltip>
                </>
            ),
            button: true,
        },
    ];

    const userData = [{
        id: 1,
        rfid: 1234567,
        name: "Gigachard",
        email: 'gigachard@gmail.com',
        password: "strongboi437",
        phone_number: 9071234567,
        level: 8,
    }]

    return (
        <Paper className={classes.paper}>
            <TextInput
                label="Filter by Name"
                placeholder="Search Student Name"
                classNames={classes}
                value={filterByName}
                onChange={(event) => setFilterByName(event.currentTarget.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                mt="md"
                mb="lg"
                autoComplete="nope"
            />
            <DataTable
                title="All Users"
                columns={usersColumns}
                data={userData}
                pagination
                dense
                highlightOnHover
                pointerOnHover
                sortIcon={<ArrowNarrowDown />}
                theme={colorScheme === 'dark' ? 'dark' : 'light'}
                customStyles={customStyles}
            />
        </Paper >
    )
}
