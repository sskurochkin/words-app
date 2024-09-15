import React, {memo, useCallback, useEffect} from 'react';

const Canvas = memo(function Canvas () {

	useEffect(()=>{

		draw()
	}, [])



	const draw = useCallback(() =>{
		const canvas = document.getElementById("canvas")
		const context = canvas.getContext("2d")

		function draw(coords) {
			context.strokeStyle = "#638EC4"
            context.lineCap = 'round';
			// context.lineJoin = "round"
			context.lineWidth = 10
			context.lineTo(coords.x, coords.y)
			context.stroke()
		}

		function getCoords(e) {
			const rect = canvas.getBoundingClientRect()

			const scaleX = canvas.width / rect.width
			const scaleY = canvas.height / rect.height

			const coords = {
				x: (e.targetTouches[0]?.pageX - rect.left) * scaleX,
				y: (e.targetTouches[0]?.pageY - rect.top) * scaleY
			};

			return coords
		}

		canvas.addEventListener("touchstart", (e) => {
			const coords = getCoords(e)
			context.beginPath()
			context.moveTo(coords.x, coords.y)
		})

		canvas.addEventListener("touchmove", (e) => {
			const coords = getCoords(e)
			draw(coords)
            // deliver(e, 'touchmove')
		})

		canvas.addEventListener("touchend", (e) => {
			const coords = getCoords(e)
			draw(coords)
            context.clearRect(0, 0, canvas.width, canvas.height);
		})
	}, [])

//     const deliver = (event, str) =>{
//
//             const touch = event.touches[0]; // Получаем первое касание
//             const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
//             const el = document.querySelector('.circle')
//              console.log(el)
//
//
//
//
// // Создаем новое событие touchmove
//                 const newEvent = new TouchEvent(str, {
//                     touches: event.touches,
//                     targetTouches: event.targetTouches,
//                     changedTouches: event.changedTouches,
//                     bubbles: false,
//                     cancelable: true,
//                     composed: true
//                 });
//
// // Диспатчим новое событие на элемент под касанием
//                 el.dispatchEvent(newEvent);
//
//
//     }

	return (
		<canvas id="canvas"></canvas>
	);
});

export default Canvas;