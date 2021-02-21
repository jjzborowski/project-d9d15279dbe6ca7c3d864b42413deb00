import React from 'react';
import { Tooltip } from '@material-ui/core';

interface ValueLabelComponentProps {
    children: React.ReactElement;
    open: boolean;
    value: number;
}

const ValueLabelComponent: React.FC<ValueLabelComponentProps> = ({
    children,
    open,
    value
}) => {
    return (
        <Tooltip
            open={ open }
            enterTouchDelay={ 0 }
            placement="top"
            title={ value }
        >
            { children }
        </Tooltip>
    );
};

export default ValueLabelComponent;
