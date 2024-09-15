import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import debounce from 'lodash.debounce';
import {nanoid} from "nanoid";
import {AppContext} from "../../App";
import Canvas from "./canvas";

const Circle = ({letters, setLine, checkWord, reset, selectedLetters, setLetters}) => {

	const state = useContext(AppContext);
	let circleRef = useRef(null);
	let eventRef = useRef(null);
	const [radius, setRadius] = useState(null);
	const [isDrag, setIsDrag] = useState(false);
	const [lastId, setLastId] = useState(null);


	const addLetter = (id) => {


		if (id === selectedLetters[selectedLetters.length - 2]?.id) {
			setLastId(id);
			setLine(prev => {
				return prev.map(x => {
					if (x.id === lastId) {
						x.isActive = false;
						setLetters(prev => prev.filter(a => a.id !== x.id));
					}
					return x;
				});
			});


		} else {
			setLine(prev => {
				return prev.map((x, index) => {
					if (x.id === id && !x.isActive) {
						x.isActive = true;
						setLetters(prev => [...prev, x]);

					}

					return x;
				});
			});

			setLastId(id);

		}


	};

	const dragStartHandler = (e) => {


		const el = e.target;
		if (el.classList.contains('point')) {
			setIsDrag(true);
			const id = e.target.id;
			if (id === lastId) return;
			addLetter(id);


		}
	};
    const touchStartHandler = (e) => {



        deliver(e, 'touchstart')
		const el = e.target;
		if (el.classList.contains('point')) {
			setIsDrag(true);
			const id = e.target.id;
			if (id === lastId) return;
			addLetter(id);
		}

	};
	const dragHandler = (e) => {
		if (!isDrag) return;
		const el = e.target;
		if (!el.classList.contains('point')) return;
		const id = e.target.id;
		if (id === lastId) return;


		addLetter(id);
	};
	const touchMoveHandler = (e)=>{

        deliver(e, 'touchmove')

		if (!isDrag) return;

		const touch = e.touches[0];
		const el = document.elementFromPoint(touch.clientX, touch.clientY);

		if (!el.classList.contains('point')) return;
		const id = el.id;
		if (id === lastId) return;

		addLetter(id);


	}

	const dragEndHandler = () => {
		setIsDrag(false);
		setLastId(null)
		checkWord();
	};
    const touchEndHandler = (e) => {
		setIsDrag(false);
		setLastId(null)
		checkWord();

        const d = document.querySelector('canvas')
        const newEvent = new TouchEvent('touchend', {
        });

        d?.dispatchEvent(newEvent);
	};
    const deliver = useCallback((e, str) =>{

        const d = document.querySelector('canvas')

        const newEvent = new TouchEvent(str, {
            touches: e.touches,
            targetTouches: e.targetTouches,
            changedTouches: e.changedTouches,
        });

        d?.dispatchEvent(newEvent);

    },[state.currentLvl])

	const resetAll = () => {
		reset();
		setIsDrag(false);
		setLastId(null)
	};

	useEffect(() => {
		if (!circleRef.current) return;
		setRadius(circleRef.current.clientWidth);
	}, [circleRef.current]);


	return (
		<div className="circle"
			 onMouseLeave={() => resetAll()}
			 onMouseMove={dragHandler}
			 onMouseDown={dragStartHandler}
			 onMouseUp={dragEndHandler}

			 onTouchMove={touchMoveHandler}
			 onTouchStart={touchStartHandler}
			 onTouchEnd={touchEndHandler}
			 onTouchCancel={()=>resetAll()}


		>
			<div className="circle-round"


				 ref={circleRef}>

				{letters.map((letter, i) => {

					const a = Math.PI - ((2 * Math.PI * (i)) / letters.length);
					let x = Math.floor(radius * Math.sin(a));
					let y = Math.floor(radius * Math.cos(a));

					x = 100 * (radius + x) / (2 * radius);
					y = 100 * (radius + y) / (2 * radius);

					return <span
						className={`${letter.isActive ? 'active' : ''} point`}
						id={letter.id}
						style={{top: `${y}%`, left: `${x}%`}}

						key={letter.id}>{letter.letter}
					</span>;
				})}

			</div>
			<Canvas
            />
		</div>
	);
};

export default Circle;