const subscriptionOptions = [
    {
      type: 'Standard',
      billingPeriod: 'None',
      price: 0,
      benefits: ['Basic features'],
    },
    {
        type: 'Premium',
        billingPeriod: 'monthly',
        price: 20,
        benefits: [
          'Basic features',
          'Ad placement',
          'Donation requests',
        ],
    },
    {
      type: 'Vet',
      billingPeriod: 'monthly',
      price: 50,
      benefits: [
        'Basic features',
        'Ad placement',
        'Donation requests',
        'Access to medical records',
        'Gestionate patients'
      ],
    },
  ];
  
  export default subscriptionOptions;