<?php

namespace Give\Receipt;

use InvalidArgumentException;
use Iterator;

/**
 * Class Receipt
 *
 * This class represent receipt as object.
 * Receipt can have multiple detail group and detail group can has multiple detail item.
 * You can add your own logic to render receipt because it does not return any UI item.
 *
 * @since 2.7.0
 * @package Give\Receipt
 */
abstract class Receipt implements Iterator {
	/**
	 * Receipt Heading.
	 *
	 * @since 2.7.0
	 * @var string $heading
	 */
	public $heading = '';

	/**
	 * Receipt message.
	 *
	 * @since 2.7.0
	 * @var string $message
	 */
	public $message = '';

	/**
	 * Receipt details group class names.
	 *
	 * @since 2.7.0
	 * @var array
	 */
	protected $sectionList = [];

	/**
	 * Get receipt sections.
	 *
	 * @return array
	 * @since 2.7.0
	 */
	public function getSections() {
		return $this->sectionList;
	}

	/**
	 * Add detail group.
	 *
	 * @param  array $section
	 *
	 * @since 2.7.0
	 */
	public function addSection( $section ) {
		$this->validateSection( $section );

		$this->sectionList[ $section['id'] ] = $section;
	}

	/**
	 * Remove receipt section.
	 *
	 * @param  string $sectionId
	 *
	 * @since 2.7.0
	 */
	public function removeSection( $sectionId ) {
		if ( in_array( $sectionId, $this->sectionList, true ) ) {
			unset( $this->sectionList[ $sectionId ] );
		}
	}

	/**
	 * Validate section.
	 *
	 * @param array $array
	 * @since 2.7.0
	 */
	protected function validateSection( $array ) {
		$required = [ 'id' ];
		$array    = array_filter( $array ); // Remove empty values.

		if ( array_diff( $required, array_keys( $array ) ) ) {
			throw new InvalidArgumentException( __( 'Invalid receipt section. Please provide valid section id', 'give' ) );
		}
	}
}
