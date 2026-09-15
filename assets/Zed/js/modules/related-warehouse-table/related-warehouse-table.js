/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

const { TableHandler, CHECKBOX_CHECKED_STATE_CHECKED } = require('./table-handler');
const tableAccess = require('ZedGuiModules/libs/table/table-access');

/**
 * @param {Object} options
 * @param {jQuery} options.$sourceTable
 * @param {jQuery} options.$destinationTable
 * @param {jQuery} options.$label
 * @param {jQuery} options.$formField
 * @param {string} options.checkboxSelector
 * @param {string} options.labelCaption
 * @param {string} [options.initialCheckboxCheckedState]
 * @param {function} options.onRemoveCallback
 */
function RelatedWarehouseTable(options) {
    const _self = this;
    this.tableHandler = null;

    $.extend(this, options);

    this.init = () => {
        this.tableHandler = new TableHandler({
            $sourceTable: this.$sourceTable,
            $destinationTable: this.$destinationTable,
            $label: this.$label,
            $formField: this.$formField,
            labelCaption: this.labelCaption,
            initialCheckboxCheckedState: this.initialCheckboxCheckedState,
            onRemoveCallback: this.onRemoveCallback,
        });

        if (!this.$sourceTable || !this.$sourceTable.length) {
            return;
        }

        this.$sourceTable.on('change', this.checkboxSelector, function () {
            const info = $.parseJSON($(this).attr('data-info'));

            if (_self.tableHandler.isCheckboxActive($(this))) {
                _self.tableHandler.addSelectedWarehouse(info.idWarehouse, info.warehouseUuid, info.name, info.status);

                return;
            }

            _self.tableHandler.removeSelectedWarehouse(info.warehouseUuid);
        });
    };

    this.init();
}

module.exports = {
    RelatedWarehouseTable,
    CHECKBOX_CHECKED_STATE_CHECKED,
};
