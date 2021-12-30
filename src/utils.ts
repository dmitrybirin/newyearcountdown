import * as Cities from 'city-timezones';
import * as Timezones from 'countries-and-timezones';
import { CityInfo } from './types';

const getLocalUtcOffsetInMinutes = () => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const cityTimezone = Timezones.getTimezone(timezone);

	return cityTimezone.utcOffset;
};

const getFilteredCity = (city: string) => {
	// This is the hack cause of absense of UI
	const [cityTarget, iso2Country] = city.split(',').map(chunk => chunk.trim());

	if (iso2Country) {
		return Cities.lookupViaCity(cityTarget).filter(
			city => city.iso2.toLowerCase() === iso2Country.toLowerCase()
		);
	} else {
		return Cities.lookupViaCity(cityTarget);
	}
};

export const localNewYearTime = 'January 1, 2022 00:00:00';

export const getCityInfo = (city: string): CityInfo | null => {
	try {
		const currentUtcOffsetInMinutes = getLocalUtcOffsetInMinutes();

		const [{ city: cityName, timezone }] = getFilteredCity(city);

		const cityTimezone = Timezones.getTimezone(timezone);

		return {
			cityName,
			utcOffsetInMinutes: cityTimezone.utcOffset,
			relativeOffsetInMinutes: currentUtcOffsetInMinutes - cityTimezone.utcOffset,
		};
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getTimeToEvent = (offsetInMinutes: number) => {
	const now = +new Date();
	const targetTimeMs = +new Date(localNewYearTime);

	const msLeft = targetTimeMs - now;
	const secondsLeft = Math.floor(msLeft / 1000);
	const minutesLeft = Math.floor(secondsLeft / 60 + offsetInMinutes);
	const hoursLeft = Math.floor(minutesLeft / 60);

	const hh = `${hoursLeft}`.padStart(2, '0');
	const mm = `${minutesLeft > 0 ? minutesLeft % 60 : 0}`.padStart(2, '0');
	const ss = `${secondsLeft > 0 ? secondsLeft % 60 : 0}`.padStart(2, '0');

	return { hh, mm, ss };
};
