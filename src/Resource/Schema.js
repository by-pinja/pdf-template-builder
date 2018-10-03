class Schema {
  forExample = () => ([
    {
      type: 'text',
      tag: 'invoiceNumber',
      text: 'Invoice number',
      example: '201230123'
    },
    {
      type: 'text',
      tag: 'date',
      text: 'Date',
      example: '12.2.2018'
    },
    {
      type: 'array',
      tag: 'rows',
      text: 'Invoice rows',
      example: [
        {
          title: 'Dog house',
          quantity: '4.99'
        },
        {
          title: 'Cat house',
          quantity: '12.00'
        },
        {
          title: 'Mouse house',
          quantity: '1.99'
        }
      ],
      items: [
        {
          type: 'text',
          tag: 'title',
          text: 'Product title',
          example: 'Dog house'
        },
        {
          type: 'text',
          tag: 'quantity',
          text: 'Quantity',
          example: '4.00'
        }
      ]
    }
  ]);
}

export default Schema;