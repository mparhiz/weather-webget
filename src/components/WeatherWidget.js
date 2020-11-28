import React, { useState } from 'react';
import './WeatherWidget.scss';

const WeatherWidget = () => {
	const [cardCount, setCardCount] = useState(3);
	const [isDisplayButton, setIsDisplayButton] = useState(true);

	let onShowButton = (isDisplay) => {
		setIsDisplayButton(isDisplay);
  	};

	return (
		<div className="weather-widget">
			hello
		</div>
	);
}

export default WeatherWidget;
