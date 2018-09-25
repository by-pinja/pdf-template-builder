class Schema {
  forExample = () => ([
      {
        tag: 'invoiceNumber',
        text: 'Invoice number',
        required: true,
        example: '201230123'
      },
      {
        tag: 'date',
        text: 'Date',
        example: '12.2.2018'
      }
  ]);
}

export default Schema;