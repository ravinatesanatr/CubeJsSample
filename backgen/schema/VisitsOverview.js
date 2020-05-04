cube(`VisitsOverview`, {
  extends: VisitsTable,
  preAggregations: {
    overview: {
      type: `rollup`,
      measureReferences: [visits, dealUserCredit, eligibleOppEmail, mobile, proposalCount, proposalRatio, soldCount, soldRatio, deliveredCount, deliveredRatio,
        nonSoldTraffic, eligibleCall, callAttempted, callRatio, eligibleText, textAttempted, textRatio, eligibleEmail, emailAttempted, emailRatio, eligibleVideo,
        videoSent, videoRatio, day2NonSold, day2Attempted, day3NonSold, day3Attempted, day4NonSold, day4Attempted, appointmentsCreated, appointmentsRatio],
      dimensionReferences: [sales1UserId],
      external: true,
      refreshKey: {
        every: `1 day`
      }
    },
    sourceAgg: {
      type: `rollup`,
      measureReferences: [visits, dealUserCredit, eligibleOppEmail, mobile, proposalCount, proposalRatio, soldCount, soldRatio, deliveredCount, deliveredRatio,
        nonSoldTraffic, eligibleCall, callAttempted, callRatio, eligibleText, textAttempted, textRatio, eligibleEmail, emailAttempted, emailRatio, eligibleVideo,
        videoSent, videoRatio, day2NonSold, day2Attempted, day3NonSold, day3Attempted, day4NonSold, day4Attempted, appointmentsCreated, appointmentsRatio],
        dimensionReferences: [source],
      external: true,
      refreshKey: {
        every: `1 day`
      }
    }
  }
});

