cube(`VisitDelivered`, {
  extends: Visits,
  preAggregations: {
    category: {
      type: `rollup`,
      measureReferences: [count],
      dimensionReferences: [source, visitDate],
      external: true
    }
  }
});
