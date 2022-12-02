import { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = () => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [start, setStart] = useState(false);
	const tick = useRef();
	const firstRender = useRef(true);
	const secondsRef = useRef();
	const minutesRef = useRef();

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = !firstRender.current;
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
		setSeconds(seconds => seconds - 1);
		if (secondsRef.current.value == 0) {
			if (Number(minutesRef.current.value) === 0) {
				setSeconds(0);
				updateStartStop();
				return;
			}
			setMinutes(minutes => minutes - 1);
			setSeconds(59);
		}
	};

	const updateStartStop = () => {
		setStart(!start);
	};

	const format2Digits = myNumber => ('0' + myNumber).slice(-2);

	const handleChangeMinutes = ev => setMinutes(+ev.target.value);
	const handleChangeSeconds = ev => setSeconds(+ev.target.value);

	return (
		<div>
			<div className='timer__elipse1'>
				<div className='timer'>
					<input
						type='number'
						inputMode='numeric'
						name='minutes'
						min='0'
						max='60'
						ref={minutesRef}
						value={format2Digits(minutes)}
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
						value={format2Digits(seconds)}
						onChange={handleChangeSeconds}
					/>
				</div>
				<button className='startstop' onClick={updateStartStop}>
					{start ? 'Stop' : 'Start'}
				</button>
			</div>
		</div>
	);
};

export default Timer;
