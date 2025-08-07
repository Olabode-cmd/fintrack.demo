export const statsData = [
  {
    title: 'Total Balance',
    value: '$12,345',
    change: '+6%',
    isPositive: true
  },
  {
    title: 'Total Credits',
    value: '$7,890',
    change: '+3%',
    isPositive: true
  },
  {
    title: 'Total Debits',
    value: '$4,455',
    change: '-2%',
    isPositive: false
  },
  {
    title: 'Transactions',
    value: '150',
    change: '+10%',
    isPositive: true
  }
];

export const transactionsData = [
  {
    id: '1',
    date: '2023-10-01',
    remark: 'Salary',
    amount: 3000,
    currency: 'USD',
    type: 'Credit' as const
  },
  {
    id: '2',
    date: '2023-10-02',
    remark: 'Groceries',
    amount: -150,
    currency: 'USD',
    type: 'Debit' as const
  },
  {
    id: '3',
    date: '2023-10-03',
    remark: 'Gym Membership',
    amount: -50,
    currency: 'USD',
    type: 'Debit' as const
  },
  {
    id: '4',
    date: '2023-10-04',
    remark: 'Dinner',
    amount: -40,
    currency: 'USD',
    type: 'Debit' as const
  },
  {
    id: '5',
    date: '2023-10-05',
    remark: 'Movie Tickets',
    amount: -30,
    currency: 'USD',
    type: 'Debit' as const
  },
  {
    id: '6',
    date: '2023-10-06',
    remark: 'Rent',
    amount: -1200,
    currency: 'USD',
    type: 'Debit' as const
  },
  {
    id: '7',
    date: '2023-10-07',
    remark: 'Utilities',
    amount: -100,
    currency: 'USD',
    type: 'Debit' as const
  },
  {
    id: '8',
    date: '2023-10-08',
    remark: 'Car Payment',
    amount: -400,
    currency: 'USD',
    type: 'Debit' as const
  },
  {
    id: '9',
    date: '2023-10-09',
    remark: 'Insurance',
    amount: -200,
    currency: 'USD',
    type: 'Debit' as const
  }
];