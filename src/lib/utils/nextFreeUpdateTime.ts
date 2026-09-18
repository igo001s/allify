export function nextFreeUpdateTime() {
	const currentTime = new Date();
	const nextUpdateTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);

	return nextUpdateTime;
}
