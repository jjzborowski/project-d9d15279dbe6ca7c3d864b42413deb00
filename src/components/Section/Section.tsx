import React from 'react';
import styles from './Section.scss';

interface SectionProps {
    title: string,
}

const Section: React.FC<SectionProps> = ({
    title,
    children
}) => {
    return (
        <div className={ styles.section }>
            <div className={ styles.sectionTitle }>
                { title }
            </div>
            { children }
        </div>
    )
};

export default Section;
