import { useState, useEffect, useRef } from 'react';
import './Timer.css';
import Modal from '../UI/Modal';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Timer = () => {
	const [start, setStart] = useState(false);
	const tick = useRef();
	const firstRender = useRef(true);
	const secondsRef = useRef();
	const minutesRef = useRef();
	const totalSeconds = useRef();
	const [progressValue, setProgressValue] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	const transition = useRef(1);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = !firstRender.current;
			secondsRef.current.value = format2Digits(Number(0));
			minutesRef.current.value = format2Digits(Number(0));
			return;
		}
		if (start) {
			tick.current = setInterval(() => {
				getTime();
			}, 1000);
		} else {
			clearInterval(tick.current);
		}

		return () => clearInterval(tick.current);
	}, [start]);

	const getTime = () => {
		secondsRef.current.value = format2Digits(Number(secondsRef.current.value) - 1);
		if (Number(secondsRef.current.value) <= 0) {
			if (Number(minutesRef.current.value) === 0) {
				secondsRef.current.value = format2Digits(0);
				updateStartStop();
				setProgressValue(100);
				setIsFinished(true);
				return;
			}
			minutesRef.current.value = format2Digits(Number(minutesRef.current.value) - 1);
			secondsRef.current.value = 59;
		}
		const secsPending =
			+secondsRef.current.value + Number(minutesRef.current.value * 60);
		const forward =
			Math.ceil(((totalSeconds.current - secsPending) / totalSeconds.current) * 100) *
			1.1;
		console.log(forward);
		setProgressValue(forward);
	};

	const updateStartStop = () => {
		// totalSeconds.current =
		// 	1 + Number(secondsRef.current.value) + Number(minutesRef.current.value) * 60;
		// transition.current = totalSeconds.current / 10;
		setStart(val => !val);
	};

	const format2Digits = myNumber => ('0' + myNumber).slice(-2);

	const reset = () => {
		setIsFinished(false);
		setProgressValue(0);
		transition.current = 1;
	};

	const handleChangeMinutes = function (ev) {
		reset();
		totalSeconds.current =
			Number(secondsRef.current.value) + Number(ev.target.value) * 60;
		transition.current = totalSeconds.current / 10;
	};
	const handleChangeSeconds = function (ev) {
		reset();
		totalSeconds.current =
			Number(ev.target.value) + Number(minutesRef.current.value) * 60;
		transition.current = totalSeconds.current / 10;
	};

	return (
		<div className='container'>
			<CircularProgressbarWithChildren
				background
				value={progressValue}
				strokeWidth={1.7}
				className='timer__elipse1'
				styles={buildStyles({
					pathTransition: 'linear',
					pathTransitionDuration: `${transition.current}`,
					pathColor: `${!isFinished ? '#00aa51' : '#9d0000'}`,
					trailColor: 'black',
					backgroundColor: '#2B2A30',
				})}
			>
				<div className='timer__elipse1'>
					<div className='timer'>
						<input
							type='number'
							inputMode='numeric'
							name='minutes'
							min='0'
							max='60'
							ref={minutesRef}
							onChange={handleChangeMinutes}
						/>
						:
						<input
							type='number'
							inputMode='numeric'
							name='seconds'
							min='0'
							max='60'
							ref={secondsRef}
							onChange={handleChangeSeconds}
						/>
					</div>
					<button className='startstop' onClick={updateStartStop}>
						{start ? 'Stop' : 'Start'}
					</button>
				</div>
			</CircularProgressbarWithChildren>
			{isFinished && (
				<Modal onModalClick={reset}>
					<div className='modal-text'>
						<p>El tiempo ha terminado! </p>
						<p>Espabila Favila que viene el oso!</p>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Timer;
