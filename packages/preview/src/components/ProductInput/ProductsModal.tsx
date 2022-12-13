import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { twJoin } from 'tailwind-merge';
import { useProductsQuery } from '../../lib/shopify/hooks';
import { Input } from '../Input';
import { Modal } from '../Modal';

interface ProductsModalProps {
  multiple?: boolean;
}

export const ProductsModal = ({ multiple }: ProductsModalProps) => {
  const [value, setValue] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [after, setAfter] = useState(null);

  const { data, isLoading, error } = useProductsQuery({
    first: 6,
    after,
  });

  return (
    <Modal
      title={`Add product${multiple ? '(s)' : ''}`}
      subtitle={
        value.length
          ? `${value.length} product${value.length === 1 ? '' : 's'} selected`
          : ''
      }
      className="border-none p-0"
    >
      <div className="flex flex-col gap-3">
        <div className="border-b border-gray-200 py-2 px-4 mb-1">
          <Input
            name="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setAfter(null);
            }}
          />
        </div>

        <div className="flex flex-col">
          {isLoading ? (
            'Loading...'
          ) : error ? (
            <p className="text-md">
              {error?.toString?.() || 'Unknown error occurred'}
            </p>
          ) : data?.products?.edges?.length ? (
            data.products.edges.map(({ node: { id, title, images } }) => (
              <CheckboxPrimitive.Root
                key={id}
                id={id}
                className={twJoin(
                  'flex h-5 w-5 items-center justify-center rounded',
                  'radix-state-checked:bg-purple-600 radix-state-unchecked:bg-gray-100 dark:radix-state-unchecked:bg-gray-900',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                )}
                checked={value.includes(id)}
                onCheckedChange={(checked) => {
                  if (multiple) {
                    const idx = value.indexOf(id);

                    if (idx !== -1) {
                      setValue(value.splice(idx, 1));
                    } else {
                      setValue([...value, id]);
                    }
                  } else {
                    setValue(checked ? [id] : []);
                  }
                }}
              >
                <CheckboxPrimitive.Indicator>
                  <CheckIcon className="h-4 w-4 self-center text-white" />
                </CheckboxPrimitive.Indicator>
              </CheckboxPrimitive.Root>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};
