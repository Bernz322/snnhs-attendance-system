import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { LoadingOverlay, Modal, Text } from '@mantine/core'
import { useSelector } from 'react-redux';
import dayjs from 'dayjs'

export default function CalendarView() {
    const { attendance, isAttendanceLoading } = useSelector(state => state.attendance)
    const [opened, setOpened] = useState(false);
    const [dateData, setDateData] = useState('');

    const dates = attendance?.AttendanceRecords?.map((date) => {

        return { title: 'Present', start: date.date, backgroundColor: '#93D58A', borderColor: '#93D58A', allDay: false }
        // { title: 'Absent', start: '2022-05-02', backgroundColor: '#cb3837', borderColor: '#cb3837' },
    })

    const handleDateClick = (e) => {
        setDateData(e.event.start);
        setOpened(true)
    }

    return (
        <div>
            <LoadingOverlay visible={isAttendanceLoading} overlayOpacity={0} overlayColor="red" />
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