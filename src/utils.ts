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

export const localNewYearTime = 'January 1, 2024 00:00:00';

export const getCityInfo = (city: string): CityInfo | null => {
	try {
		const localUtcOffsetInMinutes = getLocalUtcOffsetInMinutes();

		const [{ city: cityName, timezone }] = getFilteredCity(city);

		const cityTimezone = Timezones.getTimezone(timezone);
		const relativeOffsetInMinutes = localUtcOffsetInMinutes - cityTimezone.utcOffset;
		const targetCityNewYear = getNewYearTargetWithOffset(relativeOffsetInMinutes);

		return {
			cityName,
			utcOffsetInMinutes: cityTimezone.utcOffset,
			relativeOffsetInMinutes,
			targetCityNewYear,
		};
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getNewYearTargetWithOffset = (offsetInMinutes: number) => {
	const localNewYearMs = +new Date(localNewYearTime);
	const targetNewYearMs = localNewYearMs + offsetInMinutes * 60000;
	return targetNewYearMs;
};

export const getTimerToEvent = (targetTimeMs: number) => {
	const now = +new Date();

	if (now > targetTimeMs) {
		return { hh: '00', mm: '00', ss: '00', stopped: true };
	}

	const msLeft = targetTimeMs - now;
	const secondsLeft = Math.floor(msLeft / 1000);
	const minutesLeft = Math.floor(secondsLeft / 60);
	const hoursLeft = Math.floor(minutesLeft / 60);

	const hh = `${hoursLeft}`.padStart(2, '0');
	const mm = `${minutesLeft > 0 ? minutesLeft % 60 : 0}`.padStart(2, '0');
	const ss = `${secondsLeft > 0 ? secondsLeft % 60 : 0}`.padStart(2, '0');

	return { hh, mm, ss, stopped: false };
};
