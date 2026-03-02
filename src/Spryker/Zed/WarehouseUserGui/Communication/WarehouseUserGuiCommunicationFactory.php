<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace Spryker\Zed\WarehouseUserGui\Communication;

use Generated\Shared\Transfer\UserTransfer;
use Orm\Zed\Stock\Persistence\SpyStockQuery;
use Orm\Zed\WarehouseUser\Persistence\SpyWarehouseUserAssignmentQuery;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Spryker\Zed\WarehouseUserGui\Communication\Expander\WarehouseUserAssignmentFormExpander;
use Spryker\Zed\WarehouseUserGui\Communication\Expander\WarehouseUserAssignmentFormExpanderInterface;
use Spryker\Zed\WarehouseUserGui\Communication\Expander\WarehouseUserAssignmentTableActionExpander;
use Spryker\Zed\WarehouseUserGui\Communication\Expander\WarehouseUserAssignmentTableActionExpanderInterface;
use Spryker\Zed\WarehouseUserGui\Communication\Form\DataProvider\WarehouseUserFormDataProvider;
use Spryker\Zed\WarehouseUserGui\Communication\Form\Transformer\ArrayToStringModelTransformer;
use Spryker\Zed\WarehouseUserGui\Communication\Form\WarehouseUserForm;
use Spryker\Zed\WarehouseUserGui\Communication\Table\AssignedWarehouseTable;
use Spryker\Zed\WarehouseUserGui\Communication\Table\AvailableWarehouseTable;
use Spryker\Zed\WarehouseUserGui\Dependency\Facade\WarehouseUserGuiToUserFacadeInterface;
use Spryker\Zed\WarehouseUserGui\Dependency\Facade\WarehouseUserGuiToWarehouseUserFacadeInterface;
use Spryker\Zed\WarehouseUserGui\Dependency\Service\WarehouseUserGuiToUtilEncodingServiceInterface;
use Spryker\Zed\WarehouseUserGui\Dependency\Service\WarehouseUserGuiToUtilSanitizeServiceInterface;
use Spryker\Zed\WarehouseUserGui\WarehouseUserGuiDependencyProvider;
use Symfony\Component\Form\FormInterface;

/**
 * @method \Spryker\Zed\WarehouseUserGui\WarehouseUserGuiConfig getConfig()
 */
class WarehouseUserGuiCommunicationFactory extends AbstractCommunicationFactory
{
    /**
     * @param array<string, mixed> $data
     * @param array<string, mixed> $options
     *
     * @return \Symfony\Component\Form\FormInterface<mixed>
     */
    public function createWarehouseUserForm(array $data = [], array $options = []): FormInterface
    {
        return $this->getFormFactory()->create(WarehouseUserForm::class, $data, $options);
    }

    public function createAvailableWarehouseTable(UserTransfer $userTransfer): AvailableWarehouseTable
    {
        return new AvailableWarehouseTable(
            $userTransfer,
            $this->getStockQuery(),
            $this->getUtilEncodingService(),
            $this->getUtilSanitizeService(),
            $this->getWarehouseUserAssignmentPropelQuery(),
        );
    }

    public function createAssignedWarehouseTable(UserTransfer $userTransfer): AssignedWarehouseTable
    {
        return new AssignedWarehouseTable(
            $userTransfer,
            $this->getStockQuery(),
            $this->getUtilEncodingService(),
            $this->getUtilSanitizeService(),
        );
    }

    public function createWarehouseUserAssignmentFormExpander(): WarehouseUserAssignmentFormExpanderInterface
    {
        return new WarehouseUserAssignmentFormExpander();
    }

    public function createArrayToStringModelTransformer(): ArrayToStringModelTransformer
    {
        return new ArrayToStringModelTransformer();
    }

    public function createWarehouseUserFormDataProvider(): WarehouseUserFormDataProvider
    {
        return new WarehouseUserFormDataProvider();
    }

    public function createWarehouseUserAssignmentTableActionExpander(): WarehouseUserAssignmentTableActionExpanderInterface
    {
        return new WarehouseUserAssignmentTableActionExpander();
    }

    public function getUserFacade(): WarehouseUserGuiToUserFacadeInterface
    {
        return $this->getProvidedDependency(WarehouseUserGuiDependencyProvider::FACADE_USER);
    }

    public function getWarehouseUserFacade(): WarehouseUserGuiToWarehouseUserFacadeInterface
    {
        return $this->getProvidedDependency(WarehouseUserGuiDependencyProvider::FACADE_WAREHOUSE_USER);
    }

    public function getUtilEncodingService(): WarehouseUserGuiToUtilEncodingServiceInterface
    {
        return $this->getProvidedDependency(WarehouseUserGuiDependencyProvider::SERVICE_UTIL_ENCODING);
    }

    public function getUtilSanitizeService(): WarehouseUserGuiToUtilSanitizeServiceInterface
    {
        return $this->getProvidedDependency(WarehouseUserGuiDependencyProvider::SERVICE_UTIL_SANITIZE);
    }

    public function getStockQuery(): SpyStockQuery
    {
        return $this->getProvidedDependency(WarehouseUserGuiDependencyProvider::PROPEL_QUERY_STOCK);
    }

    public function getWarehouseUserAssignmentPropelQuery(): SpyWarehouseUserAssignmentQuery
    {
        return $this->getProvidedDependency(WarehouseUserGuiDependencyProvider::PROPEL_QUERY_WAREHOUSE_USER_ASSIGNMENT);
    }
}
