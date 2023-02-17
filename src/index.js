import '@marcellejs/core/dist/marcelle.css';
// import { dashboard, text } from '@marcellejs/core';
//
// const x = text('Welcome to Marcelle!');
//
// const dash = dashboard({
// 	title: 'My Marcelle App!',
// 	author: 'Marcelle Doe'
// });
//
// dash.page('Welcome').use(x);
//
// dash.show();
import * as marcelle from '@marcellejs/core';

const webcam = marcelle.webcam();
const store = marcelle.dataStore('localStorage');
const trainingSet = marcelle.dataset('training-set-dashboard', store);
const trainingSetBrowser = marcelle.datasetBrowser(trainingSet);
let startTime;
let endTime = 0;


function canCapture() {
    if (endTime === 0) {
        return false;
    } else {
        if (endTime - startTime > 1000 && trainingSet.$count.get() < 11) {
            startTime = endTime;
            endTime = new Date().getTime();
            return true;
        } else {
			endTime = new Date().getTime();
            return false;
        }
    }
}


webcam.$active.subscribe((x) => {
    if (x) {
        trainingSet.clear().then();
        startTime = new Date().getTime();
        endTime = new Date().getTime();

    } else endTime = 0;
});
webcam.$images.filter(canCapture).map((x) => ({x, y: "Sampling Results", thumbnail: webcam.$thumbnails.get()}))

    .subscribe(trainingSet.create);


const myDashboard = marcelle.dashboard({
    title: 'My First Tutorial',
    author: 'Myself',
});
myDashboard.page('Data Management').sidebar(webcam).use(trainingSetBrowser);

myDashboard.show();