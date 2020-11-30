import React, { useState, useEffect } from 'react';
import './WeatherWidget.scss';
import Services from '../core/services/Services';
import Helpers from '../core/helpers/Helpers'

const services = new Services();
const helpers = new Helpers();

class WeatherWidget extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			isLoading: false,
			current: {},
			forecast: [],
		};
	}

	componentDidMount() {
		this.getWeather();
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.unit !== this.props.unit ||
			prevProps.location !== this.props.location
		) {
			this.getWeather();
		}
	}

	async getWeather() {
		const { lat, lon } = this.props.location;
		const { accessKey, unit} = this.props;

		try {
			this.setState({	isLoading: true	});
			const data = await services.getWeather(
				accessKey,
				`lat=${lat}&lon=${lon}`,
				unit
			);
			
			this.setState({
				current: data.current,
				forecast: data.forecast
			});
		} catch (e) {
		  console.log(e);
		} finally {
			this.setState({	isLoading: false });
		}
	}

	render() {
		const { isLoading, current, forecast} = this.state;
		const { city } = this.props.location;

		return (
			<>
				{isLoading ? <p>Loading...</p> : 
					<div className="weather-widget">
						<div className="current">
							<div className="left">
								<h1>{city}</h1>
								<h5>{helpers.getFormatedDate(current.date)}</h5>
								<h5>{current.main}</h5>
								<div className="icon">
									<img src={current.icon}></img>
									<h1>{current.temperature} <sup>{current.tempUnit}</sup></h1>
								</div>
							</div>
							<div className="right">
								<h6>Precipitation: {current.precipitation}</h6>
								<h6>Humidity: {current.humidity}</h6>
								<h6>Wind: {current.windSpeed}</h6>
								<h6>Clouds: {current.clouds}</h6>
							</div>
						</div>
						<div className="forecast">
							{forecast.map((item, i) => {
								return (
									<div className="card" key={i}>
										<h6>{i === 0 ? 'Today' : helpers.getDayName(item.date)}</h6>
										<img src={item.icon}></img>
										<h6>{item.main}</h6>
										<h6>
											{item.tempMin}<sup>{current.tempUnit}</sup>
											&nbsp;
											{item.tempMax}<sup>{current.tempUnit}</sup>
										</h6>
									</div>
								)
							})}
						</div>
					</div>
				}
			</>
		);
	}
}

export default WeatherWidget;
