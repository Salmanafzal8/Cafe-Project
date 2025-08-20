import { createSlice ,PayloadAction } from '@reduxjs/toolkit';
import { BarGame } from '../gameApi';

type Mode = "create" |  "edit"

type BarGameModalState = {
    isOpen: boolean
    mode: Mode
    game?: BarGame | null ;

}

const initialState: BarGameModalState = {
    isOpen: false,
    mode: "create",
    game: null,
};

const  barGameModalState = createSlice ({
 
    name: "barGameModal",
    initialState,
    reducers: {
        openCreate(state){
            state.isOpen = true
            state.mode = "create";
            state.game = null;
            console.log("Inside openCreate, game:", state.game);
        },
        openEdit(state, action: PayloadAction<BarGame>) {
            state.isOpen = true;
            state.mode = "edit";
            state.game = action.payload;
            console.log("Inside openEdit, game:", action.payload); 
        },
         close(state){
            state.isOpen = false
            state.game = null
         },
    },
})
export const {openCreate, openEdit, close} = barGameModalState.actions;
export default barGameModalState.reducer;

