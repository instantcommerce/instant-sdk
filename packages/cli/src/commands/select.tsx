import React, { useEffect, useState } from 'react';
import { render, Text } from 'ink';
import { CommandModule } from 'yargs';
import { SelectInput, Item } from '~/components';
import { config } from '~/config';
import { ExtractedApiError, extractApiError, useApiSdk } from '~/lib/api';
import { StoresQuery, UserWithOrgsQuery } from '~/lib/api/sdk';

export const Switch = () => {
  const apiSdk = useApiSdk();

  const [organizations, setOrganizations] =
    useState<UserWithOrgsQuery['me']['organizations']>();
  const [stores, setStores] = useState<StoresQuery['stores']>();
  const [selectedOrganization, setSelectedOrganization] =
    useState<Item<string>>();
  const [selectedStore, setSelectedStore] = useState<Item<string>>();
  const [error, setError] = useState<ExtractedApiError>();
  const [errorStores, setErrorStores] = useState<ExtractedApiError>();

  useEffect(() => {
    apiSdk
      .userWithOrgs()
      .then((res) => setOrganizations(res.me.organizations))
      .catch((err) => setError(extractApiError(err)));
  }, []);

  useEffect(() => {
    if (selectedOrganization) {
      apiSdk
        .stores(undefined, {
          'x-instant-organization': selectedOrganization.value,
        })
        .then((res) => setStores(res.stores))
        .catch((err) => setErrorStores(extractApiError(err)));
    }
  }, [selectedOrganization]);

  const handleOrgSelect = (item: Item<string>) => {
    config.set('organization', item.value);
    setSelectedOrganization(item);
  };

  const handleStoreSelect = (item: Item<string>) => {
    config.set('storeId', item.value);
    setSelectedStore(item);
  };

  if (error) {
    return <Text>Failed to fetch organizations: {error.message}</Text>;
  }

  if (errorStores) {
    return <Text>Failed to fetch stores: {errorStores.message}</Text>;
  }

  if (!organizations) {
    return <Text>Fetching organizations...</Text>;
  }

  if (!selectedOrganization) {
    return (
      <>
        <Text>Select an organization:</Text>
        <SelectInput
          items={organizations?.map((org) => ({
            label: org.name,
            value: org.slug,
          }))}
          onSelect={handleOrgSelect}
        />
      </>
    );
  }

  if (!stores) {
    return <Text>Fetching stores...</Text>;
  }

  if (!selectedStore) {
    return (
      <>
        <Text>Select a store:</Text>
        <SelectInput
          items={stores?.edges.map(({ node }) => ({
            label: node.name,
            value: node.id,
          }))}
          onSelect={handleStoreSelect}
        />
      </>
    );
  }

  return (
    <Text>
      Switched into "{selectedOrganization.label} &gt; {selectedStore.label}".
    </Text>
  );
};

export const select: CommandModule = {
  command: 'select',
  describe: 'Select organization and store',
  handler: () => {
    render(<Switch />);
  },
};
