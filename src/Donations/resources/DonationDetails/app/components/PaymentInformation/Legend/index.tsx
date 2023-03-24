import DonationType from '../DonationType';
import StatusSelector from '@givewp/components/AdminUI/StatusSelector';

import {donationStatusOptions} from '../../../config/donationStatus';

import {LegendProps} from './LegendProps';

import styles from './style.module.scss';

/**
 *
 * @unreleased
 */
export default function Legend({title, type}: LegendProps) {
    return (
        <div className={styles.legend}>
            <legend>
                <h2>{title}</h2>
            </legend>
            <div className={styles.paymentType}>
                <DonationType donationType={type} />
                <StatusSelector options={donationStatusOptions} />
            </div>
        </div>
    );
}
