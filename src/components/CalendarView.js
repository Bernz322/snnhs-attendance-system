import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { LoadingOverlay } from '@mantine/core'
import { useSelector } from 'react-redux';

export default function CalendarView() {
    const { attendance, isAttendanceLoading } = useSelector(state => state.attendance)

    const dates = attendance?.AttendanceRecords?.map((date) => {
        return { title: 'Present', start: date.date, backgroundColor: '#93D58A', borderColor: '#93D58A' }
        // { title: 'Absent', start: '2022-05-02', backgroundColor: '#cb3837', borderColor: '#cb3837' },
    })

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
            />
        </div>
    )
}