import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {useState} from 'react';
import {__} from '@wordpress/i18n';
import {DayPickerSingleDateController} from 'react-dates';
import {useFormContext, useWatch} from 'react-hook-form';
import moment from 'moment';
import {format} from 'date-fns';

import Field from '../Field';

import styles from './style.module.scss';
import GiveIcon from '@givewp/components/GiveIcon';

/**
 *
 * @unreleased
 */
type CalendarProps = {
    closeCalendar: (newDate: Date) => void;
    initialDate: string;
};

export default function DatePickerField() {
    const watchedDate = useWatch({name: 'createdAt'});
    const {setValue, register} = useFormContext();

    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const setNewFormFieldValue = (newDateObject) => {
        setIsCalendarOpen(!isCalendarOpen);

        setValue('createdAt', newDateObject, {shouldDirty: true});
    };

    return (
        <Field label={__('Donation date', 'give')} editable onEdit={() => setIsCalendarOpen(!isCalendarOpen)}>
            <input hidden {...register('createdAt')} />
            {isCalendarOpen && <Calendar initialDate={watchedDate} closeCalendar={setNewFormFieldValue} />}
            <span>{format(watchedDate, 'MMMM, dd, yyyy')}</span>
        </Field>
    );
}

/**
 *
 * @unreleased
 */
export function Calendar({closeCalendar, initialDate}: CalendarProps) {
    const handleDateChange = (newDate) => {
        const formattedDate = newDate.toDate();

        const newDateObject = new Date(initialDate);
        newDateObject.setDate(formattedDate.getDate());
        newDateObject.setMonth(formattedDate.getMonth());
        newDateObject.setFullYear(formattedDate.getFullYear());

        closeCalendar(newDateObject);
    };

    return (
        <div className={styles.calendarPosition}>
            <div className={styles.calendarIcon}>
                <GiveIcon />
            </div>
            <DayPickerSingleDateController
                date={moment(initialDate)}
                onDateChange={handleDateChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                onBlur={close}
                showKeyboardShortcuts={false}
            />
        </div>
    );
}
