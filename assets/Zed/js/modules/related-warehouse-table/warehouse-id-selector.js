/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

function WarehouseIdSelector() {
    this.selectedIds = {};

    /**
     * @param {string} id
     * @param {Array} row - Row the warehouse is shown with in the table of the selection.
     */
    this.addIdToSelection = (id, row) => {
        this.selectedIds[id] = row;
    };

    this.removeIdFromSelection = (id) => {
        delete this.selectedIds[id];
    };

    this.isIdSelected = (id) => this.selectedIds.hasOwnProperty(id);

    this.getSelectedIds = () => this.selectedIds;

    /**
     * @return {Array} Rows of every selected warehouse, the table of the selection is built from them.
     */
    this.getRows = () => Object.keys(this.selectedIds).map((id) => this.selectedIds[id]);
}

module.exports = WarehouseIdSelector;
