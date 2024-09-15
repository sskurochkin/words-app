import React, {useContext, useEffect} from 'react';
import {AppContext} from "../../App";
import Button from "../button/button";
import {useLocalStorage, useSessionStorage} from "../../hooks/useStorrage";

const CompleteScreen = () => {
	const state = useContext(AppContext)

	useEffect(() => {
		state.setStValue({currentLvl: state.currentLvl + 1, words: []})
	}, []);

	const nextLvlHandler = () =>{
		state.setCurrentLvl(prev=> prev + 1)
		state.setIsLvlComplete(false)
		state.setSelectedLetters([])
	}


	return (
		<div className="complete-screen">
			<div className="complete-screen__inner">
				<div className="complete-screen__header">
				<div className="subtitle">Уровень {state.currentLvl} пройден</div>
				<div className="title">Изумительно!</div></div>
				<Button onClick={nextLvlHandler}
						name={`Уровень ${state.currentLvl + 1}`}
				/>

			</div>

		</div>
	);
};

export default CompleteScreen;