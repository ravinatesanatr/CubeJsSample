cube(`VisitsOverview`, {
  extends: VisitsTable,
  preAggregations: {
    UserAndSource: {
      type: `rollup`,
      measureReferences: [visits, dealUserCredit, eligibleOppEmail, mobile, proposalCount, proposalRatio, soldCount, soldRatio, deliveredCount, deliveredRatio,
        nonSoldTraffic, eligibleCall, callAttempted, callRatio, eligibleText, textAttempted, textRatio, eligibleEmail, emailAttempted, emailRatio, eligibleVideo,
        videoSent, videoRatio, day2NonSold, day2Attempted, day3NonSold, day3Attempted, day4NonSold, day4Attempted, appointmentsCreated, appointmentsRatio],
      dimensionReferences: [sales1UserId, source],
      timeDimensionReference: visitDate,
      granularity: `day`,
      external: true,
      refreshKey: {
        every: `1 day`
      }
    }
  }
});

