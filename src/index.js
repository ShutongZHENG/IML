import '@marcellejs/core/dist/marcelle.css';

import * as marcelle from '@marcellejs/core';


//每次结束都进行学习计算，最后结果是 bool res 累加的值
const webcam = marcelle.webcam();
const store = marcelle.dataStore('localStorage');
const trainingSet = marcelle.dataset('training-set-dashboard', store);
const trainingSetBrowser = marcelle.datasetBrowser(trainingSet);
const wizard = marcelle.wizard();

const page_h = marcelle.text(
    'Now to learn the h in hello<br><br><br><img src="src/images/ManualAlphabet.png" style="width:300px;height:300px;">'
);
const page_e = marcelle.text(
    'Now to learn the e in hello<br><br><br><img src="src/images/ManualAlphabet.png" style="width:300px;height:300px;">'
);

const page_l = marcelle.text(
    'Now to learn the l in hello<br><br><br><img src="src/images/ManualAlphabet.png" style="width:300px;height:300px;">'
);
const page_o = marcelle.text(
    'Now to learn the o in hello<br><br><br><img src="src/images/ManualAlphabet.png" style="width:300px;height:300px;">'
);

//开启摄像头后 每1秒自动截取一张照片并存入"Sampling Results"数据集中， 最多截取10s
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


wizard.page().title("Learning").description("Learn the word 'hello'").use([page_h, webcam], trainingSetBrowser)
    .page().title("Learning").description("Learn the word 'hello'").use([page_e, webcam], trainingSetBrowser)
    .page().title("Learning").description("Learn the word 'hello'").use([page_l, webcam], trainingSetBrowser)
    .page().title("Learning").description("Learn the word 'hello'").use([page_o, webcam], trainingSetBrowser)
;

wizard.show();




