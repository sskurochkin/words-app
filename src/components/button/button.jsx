import React from 'react';

const Button = ({onClick, name}) => {
	return (
		<div className="btn" onClick={()=>onClick()}>
			<span>{name}</span>
		</div>
	);
};

export default Button;