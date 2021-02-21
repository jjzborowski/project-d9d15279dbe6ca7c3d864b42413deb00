import React, {
    useEffect,
    useState,
} from 'react';
import { DateTime } from 'luxon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Section from 'components/Section/Section';
import TimeStepBar from 'components/TimeStepBar/TimeStepBar';
import Chart from 'components/Chart/Chart';
import { dataSet } from 'constants/data';
import translate from 'constants/dictionary';

const AppOutline: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(null);
    const [values, setValues] = useState<Record<string, number[][]>>(null);

    useEffect(() => {
        setValues(Object.values(dataSet)[0][0].values.reduce((accumulator: Record<string, number[][]>, current: number, index): {} => {
            const currentDateTime = DateTime.fromMillis(current);
            if (!Object.keys(accumulator)
                .includes(`${ currentDateTime.startOf('day') }`)) {
                accumulator[`${ currentDateTime.startOf('day') }`] = [
                    [
                        current,
                        Object.values(dataSet)[0][1].values[index],
                    ],
                ];
            } else {
                accumulator[`${ currentDateTime.startOf('day') }`].push([
                    current,
                    Object.values(dataSet)[0][1].values[index],
                ]);
            }

            return accumulator;
        }, {}));
    }, []);

    useEffect(() => {
        if (values && !selectedDate) {
            setSelectedDate(Object.keys(values)[0]);
        }
    }, [values, selectedDate]);

    return (
        <>
            <Section title={ translate('section_title_time_step') }>
                { values
                    ? <TimeStepBar
                        values={ values }
                        setSelectedDate={ setSelectedDate }
                    />
                    : <CircularProgress />
                }
            </Section>
            <Section title={ translate('section_title_water_rate') }>
                { values
                    ? <Chart
                        values={ values }
                        selectedDate={ selectedDate }
                    />
                    : <CircularProgress />
                }
            </Section>
        </>
    );
};

export default AppOutline;
