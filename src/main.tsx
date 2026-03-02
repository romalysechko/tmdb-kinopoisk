import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from "./app/ui/App/App.tsx";
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "@/app/modal/store.ts";
import {ScrollToTop} from "@/app/modal/ScrollToTop.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </Provider>
)
