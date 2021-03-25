let listener;

function observerVideo(newVideo){
	function cb(entries){
		entries.forEach((entry) => {
			if(entry.isIntersecting){
				entry.target.play();
			}else{
			    entry.target.pause();
			}
            listener = () => {document.visibilityState === 'visible' ? entry.target.play() : entry.target.pause()};
			window.addEventListener('visibilitychange', listener);
		});
	}

	const observer = new IntersectionObserver(cb, { threshold: 0.5 });

	observer.observe(newVideo);
}

const APP = document.querySelector('#app');

const newVideo = document.createElement('video');
newVideo.className = 'mx-auto mt-10';
newVideo.style = 'width: 640px'
newVideo.controls = true;

const newSource = document.createElement('source');
newSource.src = './sunflower.mp4';
newSource.type = 'video/mp4';

newVideo.append(newSource);
APP.append(newVideo);

const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const auto = document.querySelector('#automatico');
const manu = document.querySelector('#manual');

const actionPlay = () => {
    newVideo.play();
}

const actionPause = () => {
    newVideo.pause();
}
const actionAuto = () => {
    observerVideo(newVideo);
}
const actionManu = () => {
    window.removeEventListener('visibilitychange', listener);
}

play.addEventListener('click', actionPlay);
pause.addEventListener('click', actionPause);
auto.addEventListener('click', actionAuto);
manu.addEventListener('click', actionManu);

