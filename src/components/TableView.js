import React, { useState, useRef, useEffect } from 'react'
import { Button, createStyles, Paper, Tooltip, TextInput, Modal, Group, Text, NumberInput, Loader, PasswordInput, Space } from '@mantine/core';
import DataTable from 'react-data-table-component'
import { ArrowNarrowDown, Edit, Eye, Trash, X } from 'tabler-icons-react';
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux';
import { showNotification } from '@mantine/notifications';

import { fetchUserAttendance, fetchTodayAttendanceCount } from '../features/attendance/attendanceSlice'
import { fetchUsers, addUser, updateUser, deleteUser, userReset } from '../features/user/userSlice'

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
    head: {
        [theme.fn.smallerThan('xs')]: {
            justifyContent: 'center',
        },
    }
}));

const customStyles = {
    header: {
        style: {
            display: 'none'
        },
    },
}

export default function TableView({ colorScheme }) {
    const dispatch = useDispatch()
    const { users, status, UserMessage } = useSelector(state => state.user)

    // Style and Filter States
    const [focused, setFocused] = useState(false);
    const [filterByName, setFilterByName] = useState('');
    const { classes } = useStyles({ floating: filterByName.trim().length !== 0 || focused });

    // Modal States
    const [addUserOpened, setAddUserOpened] = useState(false);
    const [editProfileOpened, setEditProfileOpened] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);

    // Selected Row User State
    const [selectedUserData, setSelectedUserData] = useState();
    const [userIdToDelete, setUserIdToDelete] = useState();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // Input Refs
    const rfid = useRef("")
    const name = useRef("")
    const email = useRef("")
    const password = useRef("")
    const phone = useRef(0)
    const level = useRef(0)

    // View User Attendance
    const handleUserViewButtonClick = (userRFID) => {
        dispatch(fetchUserAttendance(userRFID))
    }

    // Add User
    const handleUserAddButtonClick = () => {
        setAddUserOpened(true)
    }
    const handleAddUser = () => {
        const newUserData = {
            rfid: rfid.current.value.trim(),
            name: name.current.value.trim(),
            email: email.current.value.trim(),
            password: password.current.value.trim(),
            phone: phone.current.value.trim(),
            grade_level: level.current.value.trim(),
        }

        if (!newUserData.rfid || !newUserData.name || !newUserData.email || !newUserData.password || !newUserData.phone || !newUserData.grade_level) {
            return showNotification({
                title: 'Fill in all fields',
                autoClose: 3000,
                color: 'red',
                icon: <X />
            })
        }

        if (!validateEmail(newUserData.email)) {
            return showNotification({
                title: 'Invalid email',
                autoClose: 3000,
                color: 'red',
                icon: <X />
            })
        }

        if (newUserData.phone.length <= 9) {
            return showNotification({
                title: 'Phone must be 10 digits long',
                autoClose: 3000,
                color: 'red',
                icon: <X />
            })
        }

        if (newUserData.grade_level !== '11' && newUserData.grade_level !== '12') {
            return showNotification({
                title: 'Grade level must be 11 or 12',
                autoClose: 3000,
                color: 'red',
                icon: <X />
            })
        }

        dispatch(addUser(newUserData))
        setAddUserOpened(false)
    }

    // Update User
    const handleUserUpdateButtonClick = (userRowData) => {
        setEditProfileOpened(true)
        setSelectedUserData(userRowData)
    }
    const handleUserUpdate = () => {
        const updateData = {
            userRFID: selectedUserData.RFID.trim(),
            rfid: rfid.current.value.trim(),
            name: name.current.value.trim(),
            email: email.current.value.trim(),
            password: password.current.value.trim(),
            phone: phone.current.value.trim(),
            grade_level: level.current.value.trim(),
        }

        if (updateData.email && !validateEmail(updateData.email)) {
            return showNotification({
                title: 'Invalid email',
                autoClose: 3000,
                color: 'red',
                icon: <X />
            })
        }

        if (updateData.phone && updateData.phone.length <= 9) {
            return showNotification({
                title: 'Phone must be 10 digits long',
                autoClose: 3000,
                color: 'red',
                icon: <X />
            })
        }

        if (updateData.grade_level && updateData.grade_level !== '11' && updateData.grade_level !== '12') {
            return showNotification({
                title: 'Grade level must be 11 or 12',
                autoClose: 3000,
                color: 'red',
                icon: <X />
            })
        }

        dispatch(updateUser(updateData))
        setEditProfileOpened(false)
    }

    // Delete User
    const handleUserDeleteButtonClick = (id) => {
        setUserIdToDelete(id)
        setDeleteUserModal(true)
    }
    const handleUserDelete = () => {
        dispatch(deleteUser(userIdToDelete))
        setDeleteUserModal(false)
    }

    useEffect(() => {

        if (status === 'failed') {
            showNotification({
                title: 'Failed',
                message: UserMessage,
                autoclose: 5000,
                color: "red"
            })
        }

        dispatch(fetchUsers())
        dispatch(fetchTodayAttendanceCount())

        return () => {
            dispatch(userReset())
        }
    }, [dispatch, UserMessage]);

    // Table Configs
    const usersColumns = [
        { name: 'User ID', selector: row => row.id, sortable: true, left: true },
        { name: 'RFID', selector: row => row.RFID, sortable: true, left: true },
        { name: 'Name', selector: row => row.name, sortable: true, left: true, },
        { name: 'Email', selector: row => row.email, left: true, compact: true, sortable: true, },
        { name: 'Password', selector: row => row.password, sortable: true, left: true, },
        { name: 'Phone', selector: row => `+63${row.phone}`, left: true, compact: true, sortable: true, },
        { name: 'Grade', selector: row => row.grade_level, center: true, compact: true, sortable: true, },
        {
            name: 'Actions',
            minWidth: '200px',
            cell: (row) => (
                <>
                    <Tooltip label="View User Attendance Record" withArrow radius="md">
                        <Button radius="md" size="xxs" color='green'>
                            <Eye size={14} strokeWidth={2} onClick={() => handleUserViewButtonClick(row.RFID)} />
                        </Button>
                    </Tooltip>
                    <Tooltip label="Edit User" withArrow radius="md">
                        <Button radius="md" ml="sm" size="xxs" color='blue' onClick={() => handleUserUpdateButtonClick(row)}>
                            <Edit size={14} strokeWidth={2} />
                        </Button>
                    </Tooltip>
                    <Tooltip label="Delete User" withArrow radius="md">
                        <Button radius="md" ml="sm" size="xxs" color='red' onClick={() => handleUserDeleteButtonClick(row.RFID)}>
                            <Trash size={14} strokeWidth={2} />
                        </Button>
                    </Tooltip>
                </>
            ),
            button: true,
        },
    ];

    const filteredItems = users?.filter(
        item => item.name && item.name.toLowerCase().includes(filterByName.toLowerCase()),
    );

    return (
        <Paper className={classes.paper}>
            <Group position="apart" mb='md' mt='md' className={classes.head}>
                <TextInput
                    label="Filter by Name"
                    placeholder="Search Student Name"
                    classNames={classes}
                    value={filterByName}
                    onChange={(event) => setFilterByName(event.currentTarget.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete="nope"
                />
                <Button radius="sm" color="#800000" onClick={handleUserAddButtonClick}>Add User</Button>
            </Group>

            <Space height='md' />

            <DataTable
                title="All Users"
                columns={usersColumns}
                data={filteredItems}
                pagination
                dense
                highlightOnHover
                pointerOnHover
                progressPending={status === 'loading'}
                sortIcon={<ArrowNarrowDown />}
                theme={colorScheme === 'dark' ? 'dark' : 'light'}
                customStyles={customStyles}
            />

            {/* Add User Modals */}
            <Modal opened={addUserOpened} onClose={() => setAddUserOpened(false)} title="Add User" >
                <TextInput placeholder='New RFID Tag' required label="RFID" ref={rfid} />
                <TextInput placeholder='Juan dela Cruz' required label="Name" ref={name} />
                <TextInput placeholder='juandelacruz@gmail.com' required label="Email" ref={email} />
                <PasswordInput placeholder='password143' required label="Password" ref={password} />
                <NumberInput placeholder='9071234567' required ref={phone} maxLength={10} hideControls label="Phone" />
                <NumberInput placeholder='11 or 12' required ref={level} maxLength={2} hideControls label="Grade Level" />

                <Button style={{ width: '100%' }} size="xs" type="submit" mt='lg' onClick={handleAddUser}>{status === 'loading' ? <Loader color="white" size="sm" /> : "Add User"}</Button>
            </Modal>

            {/* Edit User Modal */}
            <Modal opened={editProfileOpened} onClose={() => setEditProfileOpened(false)} title="Update user profile" >
                <Text className={classes.userInfo}>Created on: {dayjs(selectedUserData?.createdAt).format('DD/MMM/YYYY')}</Text>
                <Text className={classes.userInfo}>User RFID: {selectedUserData?.RFID}</Text>

                <TextInput label="RFID" placeholder={selectedUserData?.RFID} ref={rfid} />
                <TextInput placeholder={selectedUserData?.name} label="Name" ref={name} />
                <TextInput label="Email" placeholder={selectedUserData?.email} ref={email} />
                <PasswordInput placeholder='password143' required label="Password" ref={password} />
                <NumberInput ref={phone} maxLength={10} hideControls label="Phone" placeholder={selectedUserData?.phone} />
                <NumberInput ref={level} maxLength={2} hideControls label="Grade Level" placeholder={selectedUserData?.grade_level} />

                <Button style={{ width: '100%' }} size="xs" type="submit" mt='lg' onClick={handleUserUpdate}>{status === 'loading' ? <Loader color="white" size="sm" /> : "Update"}</Button>
            </Modal>

            {/* Delete User Modal */}
            <Modal opened={deleteUserModal} onClose={() => setDeleteUserModal(false)} title="Are you sure to delete this account?" centered >
                <Text align='center' color='yellow' size='sm'>All attendance records of this account will also be deleted.</Text>
                <Group position="apart" mt='md'>
                    <Button radius="md" style={{ width: "100%", flex: 6 }} color="red" onClick={() => handleUserDelete()}>Yes</Button>
                    <Button radius="md" style={{ width: "100%", flex: 6 }} color="blue" onClick={() => setDeleteUserModal(false)}>No</Button>
                </Group>
            </Modal>
        </Paper >
    )
}
