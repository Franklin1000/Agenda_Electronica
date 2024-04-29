import { addHours } from 'date-fns';
import { useState } from 'react';
import Modal from 'react-modal';
import Datepicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {es} from 'date-fns/locale/es';
import { differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2'
import { useMemo } from 'react';
import { useUiStore } from '../../hooks';



registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root'); //Ayuda a sobreponer ante todo

  export const CalendarModal = () => {

    //eliminar estado del modal
    // const [isOpen, setIsOpen] = useState(true);

    const {isDateModalOpen, onCloseModal}= useUiStore();

    //nuevo estado para cuando se ingrese el evento
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Titulo del Evento',
        notes: 'Description del Evento',
        start: new Date(),
        end: addHours(new Date(), 2)
    })
    //usemos el useMemo

    const titleClass = useMemo(() =>{


        if (!formSubmitted) return '';

        return (formValues.title.length > 0) 
        ? 'is-valid' 
        : 'is-invalid'
    }, [formValues.title, formSubmitted])

    const OnInputChanged  = ({target})=>{
        setFormValues({
            [target.name]: target.value
        })
    }

    // const onCloseModal = () =>{

    //     console.log('Cerrando el Modal...')
    //     // setIsOpen(false);
    // }

    const onDateChanged = (event, changing)=>{
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        setFormSubmitted(true);


        const difference = differenceInSeconds(formValues.end, formValues.start);
        console.log({difference})

        if (isNaN (difference)|| difference <=0 ){
            Swal.fire('Fechas Incorrectas', 'Por favor revisa las fechas', 'error');
            return;
        }

        if (formValues.title.length <=0){
            console.log('Es necesario indicar un titulo al evento')
            return;
        }

        console.log(formValues);
    }

    return(
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onDateChanged}
        style={customStyles}
        className='modal' // así se llama la clase en css
        overlayClassName= 'modal-fondo' // clase de css
        closeTimeoutMS={200}
        
      >
          <h2>Nuevo evento</h2>
          <hr/>
          <form className='container' onSubmit={onSubmit}>
            <div className='form-group mb-2'>
                <label>Fecha y hora de inicio</label>
                <Datepicker
                selected={formValues.start}
                className='form-control'
                onChange={(event) => onDateChanged(event, 'start')}
                dateFormat='Pp'
                showTimeSelect
                locale='es'
                timeCaption='Hora'
                />
            </div>

            <div className='form-group mb-2'>
                <label>Fecha y hora de fin</label>
                <Datepicker
                minDate={formValues.start}
                selected={formValues.end}
                className='form-control'
                onChange={(event) => onDateChanged(event, 'end')}
                dateFormat='Pp'
                showTimeSelect
                locale='es'
                timeCaption='Hora'
                />
            </div>
            <hr/>

            <div className='form-group mb-2'>
                <label>Titulo y notas</label>
                <input 
                type='text'
                className={`form-control ${titleClass}`}
                placeholder='Titulo del evento'
                autoComplete='off'
                name='title'

                value={formValues.titles}
                onChange={OnInputChanged}
                />
                <small className='form-text  text-muted' >Una descripción corta</small>

            </div>

            <div className='form-group mb-2'>
                <textarea 
               
                type='text'
                className='form-control'
                placeholder='Notas'
                rows='5'
                name='notes'

                value={formValues.notes}
                onChange={OnInputChanged}
                
                >

                </textarea>
                <small className='form-text  text-muted' >Información adicional</small>

            </div>

            <button 
            type='summit'
            className='btn btn-outline-primary btn-block'
            >
                <i className='far fa-save'></i>
                &nbsp;
                <span>Guardar</span>
            </button>

          </form>
        
    </Modal>
    )
  }