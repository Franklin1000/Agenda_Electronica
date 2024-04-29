import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {addHours} from 'date-fns';
// import {CalendarEvent, NavBar } from '../';
import { CalendarEvent } from '../components/CalendarEvent';
import {NavBar} from '../components/NavBar';
import { localizer, getMessagesEs } from '../../helpers';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks';




  const events = [{
      title: 'Cumpleaños del Team Leader',
      notes: 'Comprarle una taza de spiderman pequeño',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user:{
          _id: '123',
          name: 'Nestor'
      }
  }]


export const CalendarPage = () => {

    const {openDateModal} = useUiStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')|| 'agenda');

    const eventStyleGetter = (event, start, end, isSelected) =>{

        const style ={
            backgroundColor: '#FFC94A',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
            return{
                style
            } 
    

    }
    const onDoubleClick = (event) => {
        // console.log({doubleClick: event})
        openDateModal();
    }

    const onSelect = (event) => {
        console.log({click: event})
    }

    const onViewChange = (event) => {
       localStorage.setItem(event);
    }

    return(
        <>
            <NavBar/>
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px'}}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}


                //colocar los eventos acá
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}

                defaultView={lastView}
/>

                <CalendarModal/>
        </>
    )
}