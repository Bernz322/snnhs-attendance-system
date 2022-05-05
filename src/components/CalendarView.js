import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"

export default function CalendarView() {
    const data = [
        { title: 'Absent', start: '2022-05-02', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Present', start: '2022-05-03', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-04', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-05', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-06', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-07', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-08', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-09', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-10', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Absent', start: '2022-05-11', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Present', start: '2022-05-12', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Absent', start: '2022-05-13', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Absent', start: '2022-05-14', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Present', start: '2022-05-15', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Absent', start: '2022-05-16', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Absent', start: '2022-05-17', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Absent', start: '2022-05-18', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Absent', start: '2022-05-19', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Absent', start: '2022-05-20', backgroundColor: '#cb3837', borderColor: '#cb3837' },
        { title: 'Present', start: '2022-05-21', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-22', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-23', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-24', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-25', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-26', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-27', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-28', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-29', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-30', backgroundColor: '#93D58A', borderColor: '#93D58A' },
        { title: 'Present', start: '2022-05-31', backgroundColor: '#93D58A', borderColor: '#93D58A' },
    ]

    return (
        <div>
            <FullCalendar
                events={data}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={(e) => console.log(e)}
                weekends={false}
                height={650}
            />
        </div>
    )
}