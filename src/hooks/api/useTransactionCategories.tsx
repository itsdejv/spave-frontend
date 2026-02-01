import { useQuery } from '@tanstack/react-query';

import { getTransactionGategory } from '../../api';

interface TransactionCategoriesHookProps {
  id: number;
}

export function useTransactionCategories(props: TransactionCategoriesHookProps) {
  const { id } = props;

  return useQuery({
    queryKey: ['transaction-categories', id],
    queryFn: async () => {
      const res = await getTransactionGategory({ path: { id } });
      return res.data;
    },
    enabled: !!id,
  });
}
