import React, {useContext, useEffect, useState} from 'react';
import Word from "../word/word";
import { nanoid } from 'nanoid';
import {AppContext} from "../../App";
import Circle from "../circle/circle";
import Cell from "../cell/cell";
import CompleteScreen from "../completeScreen/completeScreen";
import {useLocalStorage} from "../../hooks/useStorrage";
import Button from "../button/button";

const Words = () => {


	const state = useContext(AppContext)
	const [line, setLine] = useState([])
	const [selectedLetters, setSelectedLetters] = useState([])
	const [words, setWords] = useState(state.words)



	useEffect(() => {

		setWords(state.words)
		formLetters(state.words)
	}, [state.words]);


	const checkWord = () => {

		const query = selectedLetters.map(x=>x.letter).join('')

		const el = words.find(el => el.name === query && !el.isActive)
		if (!el) {
			resetLetters()
			return;
		}

		el.isActive = true
		setWords(prev => prev.map(i => {
			if (i.name === el.name) {
				i.isActive = true
			}
			return i
		}))


		checkCompleteLvl()
	}

	const checkCompleteLvl = () => {
		const isCompleted = words.filter(item => item.isActive).length === words.length

        state.setStValue({currentLvl: state.currentLvl, words:state.words})


        isCompleted && state.setIsLvlComplete(true)
		resetLetters()
	}

	const formLetters = (words) => {
		let storage = []
		words.forEach((el, i) => {
			if (i === 0) {
				storage = [...storage, ...el.name.split('')]
			} else {
				let countStore,
					countWord
				[...el.name].forEach(letter => {


					if (storage.includes(letter)) {


						countStore = storage.filter(i => i === letter).length

						countWord = [...el.name].filter(i => i === letter).length
						if (countStore < countWord) {
							console.log(countWord - countStore);
							for (let i = 0; i < countWord - countStore; i++) {
								storage.push(letter)
							}
						}

					} else {
						storage.push(letter)
					}
				})
			}

		})


		storage = storage.map(x=>{
			return {letter: x, isActive: false, id: nanoid(4)}
		})

		setLine(storage)

	}

	const resetLetters = () =>{

		setSelectedLetters([])
		setLine(prev => {
			return prev.map(x=>{
				x.isActive = false
				return x
		})})

	}

	// const resetProgress = ()=>{
	// 	state.setCurrentLvl(1)
	// 	state.setStValue({currentLvl: 1, words:[]})
	// }


	if(state.isLvlComplete){
		return(
			<CompleteScreen/>
		)
	}

	return (
		<>
			<div className="subtitle">Уровень {state.currentLvl}</div>

			<div className="words-container"

            >

				{words.map((word, index) => {
					return <Word key={word.id} isActive={word.isActive} word={word.name}/>
				})}
				{selectedLetters
					? <div className="selected-letters">{selectedLetters.map(l=><Cell letter={l.letter} key={nanoid(3)} mod="cell--sm"/>)}</div>
					: null
				}
			</div>
			{line
				? <Circle
					setLetters={setSelectedLetters}
					selectedLetters={selectedLetters}
					setLine={setLine}
					letters={line}
					reset={resetLetters}
					checkWord={checkWord}
				/>
				: null

			}
			{/*<div style={{*/}
			{/*	marginTop:'5rem',*/}
			{/*	display: 'flex',*/}
			{/*	justifyContent: "center"*/}
			{/*}}>*/}
			{/*	<Button*/}

			{/*		onClick={resetProgress}*/}
			{/*		name="Сброс"*/}
			{/*	/>*/}
			{/*</div>*/}



		</>


	)
		;
};

export default Words;