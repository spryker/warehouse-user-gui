/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

const WarehouseIdSelector = require('./warehouse-id-selector');
const tableAccess = require('ZedGuiModules/libs/table/table-access');

const CHECKBOX_CHECKED_STATE_CHECKED = 'checked';
const CHECKBOX_CHECKED_STATE_UNCHECKED = 'unchecked';

/**
 * @param {Object} options
 * @param {jQuery} options.$sourceTable
 * @param {jQuery} options.$destinationTable
 * @param {jQuery} options.$label
 * @param {jQuery} options.$formField
 * @param {string} options.labelCaption
 * @param {string} [options.initialCheckboxCheckedState]
 * @param {function} options.onRemoveCallback
 */
function TableHandler(options) {
    const _self = this;
    this.warehouseIdSelector = new WarehouseIdSelector();
    this.destinationHandle = null;
    this.initialCheckboxCheckedState = CHECKBOX_CHECKED_STATE_UNCHECKED;

    $.extend(this, options);

    if (this.$destinationTable && this.$destinationTable.length) {
        this.$destinationTable.on('click', '.remove-item', this.onRemoveCallback);

        tableAccess.requestTable(this.$destinationTable[0], (handle) => {
            this.destinationHandle = handle;

            handle.created().then(() => this.renderSelection());
        });
    }

    this.addSelectedWarehouse = (idWarehouse, warehouseUuid, name, status) => {
        if (this.warehouseIdSelector.isIdSelected(warehouseUuid)) {
            return;
        }

        this.warehouseIdSelector.addIdToSelection(warehouseUuid, [
            idWarehouse,
            decodeURIComponent(String(name).replace(/\+/g, '%20')),
            decodeURIComponent(String(status).replace(/\+/g, '%20')),
            `<button data-uuid="${warehouseUuid}" type="button" class="btn btn-xs remove-item">
                    ${this.$destinationTable.attr('data-remove-button-text')}
                </button>`,
        ]);

        this.renderSelection();
        this.updateSelectedWarehousesLabelCount();
    };

    /**
     * The table of the selection is a view over it and is rebuilt from it, so that it can be filled
     * whenever the plugin gets round to creating it.
     */
    this.renderSelection = () => {
        if (!this.destinationHandle) {
            return;
        }

        this.destinationHandle.raw().clear().rows.add(this.warehouseIdSelector.getRows()).draw();
    };

    this.removeSelectedWarehouse = (warehouseUuid) => {
        if (this.warehouseIdSelector.isIdSelected(warehouseUuid)) {
            this.warehouseIdSelector.removeIdFromSelection(warehouseUuid);
            this.renderSelection();
        }

        this.updateSelectedWarehousesLabelCount();
    };

    this.updateSelectedWarehousesLabelCount = () => {
        const warehouseIds = Object.keys(this.warehouseIdSelector.getSelectedIds());

        this.$label.text(warehouseIds.length ? `${this.labelCaption} (${warehouseIds.length})` : this.labelCaption);
        this.$formField.attr('value', warehouseIds.join(','));
    };

    this.isCheckboxActive = ($checkbox) => {
        if (this.initialCheckboxCheckedState === CHECKBOX_CHECKED_STATE_UNCHECKED) {
            return $checkbox.prop('checked');
        }

        return !$checkbox.prop('checked');
    };

    this.toggleCheckboxes = (isChecked) => {
        $('input[type="checkbox"]', this.$sourceTable).each((index, checkbox) => {
            $(checkbox).prop('checked', isChecked);
            $(checkbox).trigger('change');
        });
    };
}

module.exports = {
    TableHandler,
    CHECKBOX_CHECKED_STATE_CHECKED,
};
