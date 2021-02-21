import React, {
    useEffect,
    useState,
} from 'react';
import { DateTime } from 'luxon';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import translate from 'constants/dictionary';

interface ChartProps {
    values: Record<string, number[][]>,
    selectedDate: string,
}

const Chart: React.FC<ChartProps> = ({
    values,
    selectedDate
}) => {
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (values && selectedDate) {
            setOptions({
                chart: {
                    backgroundColor: '#1D1D1D',
                },
                legend: {
                    itemStyle: {
                        color: '#8E8E8E'
                    }
                },
                time: {
                    timezoneOffset: -DateTime.fromISO(Object.keys(values)[0]).offset
                },
                title:{
                    text:''
                },
                xAxis: {
                    labels: {
                        step: 1
                    },
                    units: [[
                        'hour',
                    ]
                    ],
                    type: 'datetime',
                },
                yAxis: {
                    title: {
                        text: translate('chart_y_axis_title'),
                    },
                },
                series: [
                    {
                        marker: {
                            enabled: false
                        },
                        name: translate('chart_series_name'),
                        data: [...values[selectedDate]],
                    },
                ],
            });
        }
    }, [values, selectedDate]);

    return (
        <HighchartsReact
            highcharts={ Highcharts }
            options={ options }
        />
    );
};

export default Chart;
