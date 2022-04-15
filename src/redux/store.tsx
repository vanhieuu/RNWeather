import { configureStore } from "@reduxjs/toolkit";
import weather from './dataResponseSlice'
import favorite from './addItemSlice'
import theme from './themeSlice'
import fiveDays from './FiveDayDataSlice'
import current from './currentSlice'
const store = configureStore({
    reducer:{
        weather,
        favorite,
        theme,
        fiveDays,
        current
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch