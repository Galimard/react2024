import { configureStore } from '@reduxjs/toolkit';
import { goodsApi } from './goodsApi';

export const store = configureStore({
    reducer: {
        [goodsApi.reducerPath]: goodsApi.reducer, //динамический редюсер
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(goodsApi.middleware)
});