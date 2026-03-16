import {isRejectedWithValue, type Middleware} from "@reduxjs/toolkit";
import {setAppErrorAC} from "@/app/modal/app-slice.ts";

export const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const payload = action.payload as {
            status?: number | string;
            data?: { status_message?: string }
        };

        let message = 'Произошла неизвестная ошибка';
        if (payload?.status === 'ZOD_ERROR') {
            message = payload.data?.status_message || 'Ошибка валидации данных';
        } else if (payload?.status === 'FETCH_ERROR') {
            message = 'Ошибка сети! Проверьте подключение.';
        } else if (payload?.status === 401) {
            message = 'Ошибка авторизации: Невалидный токен.';
        } else if (payload?.status === 404) {
            message = 'Ошибка 404: Ресурс не найден.';
        } else {
            message = payload?.data?.status_message || message;
        }

        api.dispatch(setAppErrorAC({ error: message }));
    }
    return next(action);
};
