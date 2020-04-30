import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from "./store";
import ImageUploader from "./components/ImageUploader";


function App() {

    return (
        <Provider store={store}>
            <ImageUploader/>
        </Provider>
    );
}

export default App;
