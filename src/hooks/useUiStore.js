import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { onCloseModalOpen, onOpenDateModal } from '../store';


export const useUiStore = () =>{
    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const openDateModal = () =>{
        dispatch(onOpenDateModal());
    }

    //TODO: crear function para cerrar modal

    const  closeDateModal= () =>{
        dispatch(onCloseDateModal());
    }

    return{
    //propiedades
    isDateModalOpen,

    //metodos
    openDateModal,   

    }
}