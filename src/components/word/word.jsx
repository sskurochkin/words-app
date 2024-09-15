import React, {useContext} from 'react';
import {AppContext} from "../../App";
import {nanoid} from "nanoid";
import Cell from "../cell/cell";

const Word = ({word, isActive}) => {

	const letters = word.split('')

	return (
		<div className={`${isActive ? 'active' : ''} word-un`}>
			{letters.map((l,index)=><Cell letter={l} key={nanoid(4)}/>)}
		</div>
	);
};

export default Word;