import { DateTime } from 'luxon';

const toReadableFormat = (value: string) => DateTime.fromISO(value)
    .toFormat('dd/LL/yyyy');

export default toReadableFormat;
