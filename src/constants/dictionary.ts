interface DictionaryProps {
    [index: string]: string
}

const dictionary: DictionaryProps = {
    'section_title_time_step': 'Time Step',
    'section_title_water_rate': 'Water Rate',
    'time_step_bar_label_start': 'Start',
    'time_step_bar_label_finish': 'Finish',
    'chart_y_axis_title': 'Water Rate (STB/d)',
    'chart_series_name': 'Water Rate',
};

const translate = (key: string, params: DictionaryProps = {}): string => {
    let text: string = dictionary[key];
    Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{${param}}`, 'g'), value);
    });
    return text || `@@${key}@@`;
};

export default translate;
