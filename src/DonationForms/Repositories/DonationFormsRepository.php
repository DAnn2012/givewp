<?php

namespace Give\DonationForms\Repositories;

use Give\DonationForms\Models\DonationForm;
use Give\DonationForms\ValueObjects\DonationFormMetaKeys;
use Give\Donations\Models\Donation;
use Give\Donations\ValueObjects\DonationMetaKeys;
use Give\Framework\Database\DB;
use Give\Framework\Models\ModelQueryBuilder;

/**
 * @unreleased add support methods for donation form model
 * @since 2.19.0
 */
class DonationFormsRepository
{
    /**
     * Get DonationForm By ID
     *
     * @unreleased
     *
     * @return DonationForm|null
     */
    public function getById(int $donationFormId)
    {
        return $this->prepareQuery()
            ->where('ID', $donationFormId)
            ->get();
    }

    /**
     * @unreleased
     *
     * @return ModelQueryBuilder<Donation>
     */
    public function prepareQuery(): ModelQueryBuilder
    {
        $builder = new ModelQueryBuilder(DonationForm::class);

        return $builder->from('posts')
            ->select(
                ['ID', 'id'],
                ['post_title', 'title'],
                ['post_date', 'createdAt'],
                ['post_modified', 'updatedAt'],
                ['post_status', 'status']
            )
            ->attachMeta(
                'give_formmeta',
                'ID',
                'form_id',
                ...DonationFormMetaKeys::getColumnsForAttachMetaQuery()
            )
            ->where('post_type', 'give_forms');
    }

    /**
     * @param int $formId
     *
     * @return int
     */
    public function getFormDonationsCount(int $formId): int
    {
        return DB::table('posts')
            ->leftJoin('give_donationmeta', 'ID', 'donation_id')
            ->where('meta_key', DonationMetaKeys::FORM_ID)
            ->where('meta_value', $formId)
            ->count();
    }
}
