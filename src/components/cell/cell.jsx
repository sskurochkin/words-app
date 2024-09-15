import React from 'react';

const Cell = ({mod, letter}) => {

	return (
		<div className={`${mod ? mod : ''} cell`}>
			{letter}
		</div>
	);
};

export default Cell;