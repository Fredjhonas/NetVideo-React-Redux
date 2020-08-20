import React from 'react';
import '../assets/styles/spinner.scss';

const Spinner = (props) => {
	return (
		<div className='center'>
			<div className='lds-default'>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export default Spinner;
