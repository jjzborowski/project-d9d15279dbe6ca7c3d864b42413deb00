import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    Button,
    Slider,
} from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ValueLabelComponent from 'components/ValueLabelComponent/ValueLabelComponent';
import translate from 'constants/dictionary';
import toReadableFormat from 'commons/toReadableFormat';
import styles from './TimeStepBar.scss';

interface TimeStepBarProps {
    values: Record<string, number[][]>,
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>,
}

const TimeStepBar: React.FC<TimeStepBarProps> = ({
    values,
    setSelectedDate
}) => {
    const [selectedStep, setSelectedStep] = useState<number>(0);
    const selectedStepRef = useRef(null);
    const [play, setPlay] = useState(false);
    const playIntervalRef = useRef(null);
    const playInterval = 3000;
    const days = Object.keys(values);
    const minStep = 0;
    const maxStep = days.length - 1;
    let countdown: NodeJS.Timeout;

    const onChangeHandler = (event: any, value: number) => {
        setPlay(false);
        setSelectedStep(value);
    };

    const onPlayClickHandler = () => {
        setPlay(!play);
    };

    const onNextClickHandler = () => {
        const newSelectedStep = selectedStep + 1;
        setSelectedStep(newSelectedStep);
        setSelectedDate(days[newSelectedStep]);
    };

    const onPrevClickHandler = () => {
        const newSelectedStep = selectedStep - 1;
        setSelectedStep(newSelectedStep);
        setSelectedDate(days[newSelectedStep]);
    };

    useEffect(() => {
        playIntervalRef.current = play;
        selectedStepRef.current = selectedStep;
    }, [play, selectedStep]);

    useEffect(() => {
        if (play) {
            countdown = setInterval(() => {
                const newSelectedStep = selectedStepRef.current + 1;

                setSelectedStep(newSelectedStep);
                setSelectedDate(days[newSelectedStep]);

                if (!playIntervalRef.current || newSelectedStep === maxStep) {
                    setPlay(false);
                    clearInterval(countdown);
                }
            }, playInterval);
        }

        return () => clearInterval(countdown);
    }, [play]);

    return (
        <div className={ styles.timeStep }>
            <div className={ styles.bar }>
                <div className={ styles.barDescription }>
                    <div className={ styles.barStartDate }>
                        { toReadableFormat(days[0]) }
                    </div>
                    <div className={ styles.barLabel }>
                        { translate('time_step_bar_label_start') }
                    </div>
                </div>
                <Slider
                    className={ styles.slider }
                    defaultValue={ minStep }
                    value={ selectedStep }
                    aria-labelledby="discrete-slider-small-steps"
                    marks
                    min={ minStep }
                    max={ maxStep }
                    valueLabelDisplay="auto"
                    valueLabelFormat={ value => toReadableFormat(days[value]) }
                    ValueLabelComponent={ ValueLabelComponent }
                    onChange={ onChangeHandler }
                />
                <div className={ styles.barDescription }>
                    <div className={ styles.barStartDate }>
                        { toReadableFormat(days[days.length - 1]) }
                    </div>
                    <div className={ styles.barLabel }>
                        { translate('time_step_bar_label_finish') }
                    </div>
                </div>
            </div>
            <div className={ styles.barControls }>
                <Button
                    color="secondary"
                    onClick={ onPrevClickHandler }
                    disabled={ selectedStep === minStep }
                >
                    <SkipPreviousIcon fontSize="small" />
                </Button>
                <Button
                    className={ styles.buttonPrimary }
                    variant="contained"
                    color="primary"
                    onClick={ onPlayClickHandler }
                >
                    { play ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" /> }
                </Button>
                <Button
                    color="secondary"
                    onClick={ onNextClickHandler }
                    disabled={ selectedStep === maxStep }
                >
                    <SkipNextIcon fontSize="small" />
                </Button>
            </div>
        </div>
    );
};

export default TimeStepBar;
