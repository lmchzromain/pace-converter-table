export type PaceRow = {
  pace: string;
  speed: string;
  duration5k: string;
  duration10k: string;
  durationHalfMarathon: string;
  durationMarathon: string;
};

const HALF_MARATHON_KM = 21.0975;
const MARATHON_KM = 42.195;

const pad = (value: number): string => String(value).padStart(2, '0');

const secondsToClock = (seconds: number): string => {
  const totalSeconds = Math.round(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`
    : `${minutes}:${pad(remainingSeconds)}`;
};

const paceToLabel = (secondsPerKm: number): string => {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = secondsPerKm % 60;
  return `${minutes}:${pad(seconds)} /km`;
};

const paceToSpeed = (secondsPerKm: number): string => {
  const kmPerHour = 3600 / secondsPerKm;
  return `${kmPerHour.toFixed(1)} km/h`;
};

const raceDuration = (secondsPerKm: number, distanceKm: number): string => {
  return secondsToClock(secondsPerKm * distanceKm);
};

export const buildPaceRows = (): PaceRow[] => {
  const minSecondsPerKm = 180;
  const maxSecondsPerKm = 420;
  const stepInSeconds = 10;

  return Array.from(
    {
      length: Math.floor((maxSecondsPerKm - minSecondsPerKm) / stepInSeconds) + 1
    },
    (_, index) => minSecondsPerKm + index * stepInSeconds
  ).map((secondsPerKm) => {
    return {
      pace: paceToLabel(secondsPerKm),
      speed: paceToSpeed(secondsPerKm),
      duration5k: raceDuration(secondsPerKm, 5),
      duration10k: raceDuration(secondsPerKm, 10),
      durationHalfMarathon: raceDuration(secondsPerKm, HALF_MARATHON_KM),
      durationMarathon: raceDuration(secondsPerKm, MARATHON_KM)
    };
  });
};
