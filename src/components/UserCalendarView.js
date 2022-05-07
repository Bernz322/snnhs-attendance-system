import React, { useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { LoadingOverlay } from '@mantine/core'
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserAttendance } from '../features/attendance/attendanceSlice'

export default function UserCalendarView() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { attendance, isAttendanceLoading } = useSelector(state => state.attendance)

    useEffect(() => {
        dispatch(fetchUserAttendance(user?.rfid))
    }, [dispatch, user?.rfid]);

    const dates = attendance?.AttendanceRecords?.map((date) => {
        return { title: 'Present', start: date.date, backgroundColor: '#93D58A', borderColor: '#93D58A' }
        // { title: 'Absent', start: '2022-05-02', backgroundColor: '#cb3837', borderColor: '#cb3837' },
    })

    return (
        <div>
            <LoadingOverlay visible={isAttendanceLoading} overlayOpacity={0.3} overlayColor="#c5c5c5" />
            <FullCalendar
                defaultAllDay={true}
                events={dates}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={(e) => console.log(e)}
                weekends={false}
                height={650}
            />
        </div>
    )
}