import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { LoadingOverlay, Modal, Text } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserAttendance } from '../features/attendance/attendanceSlice'
import dayjs from 'dayjs'

export default function UserCalendarView() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { attendance, isAttendanceLoading } = useSelector(state => state.attendance)
    const [opened, setOpened] = useState(false);
    const [dateData, setDateData] = useState('');

    useEffect(() => {
        dispatch(fetchUserAttendance(user?.rfid))
    }, [dispatch, user?.rfid]);

    const dates = attendance?.AttendanceRecords?.map((date) => {
        return { title: 'Present', start: date.date, backgroundColor: '#93D58A', borderColor: '#93D58A', allDay: false }
    })

    const handleDateClick = (e) => {
        setDateData(e.event.start);
        setOpened(true)
    }

    return (
        <div>
            <LoadingOverlay visible={isAttendanceLoading} overlayOpacity={0.3} overlayColor="#c5c5c5" />
            <FullCalendar
                defaultAllDay={true}
                events={dates}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                height={650}
                eventClick={e => handleDateClick(e)}
            />
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Date Attendance Data"
                centered
            >
                <Text>{dayjs(dateData).format('dddd, MMMM D, YYYY h:mm A')}</Text>
            </Modal>
        </div>
    )
}