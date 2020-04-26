cube(`Visits`, {
  sql: `SELECT * FROM fuszrewrite.visitdelivered`,

  joins: {
  },

  measures: {
    count: {
      type: `count`,
      sql: `store_id`
    }
  },

  dimensions: {
    visitDate: {
      type: `time`,
      sql: `visit_date`
    },

    source: {
      type: `string`,
      sql: `source`
    },

    storeId: {
      type: `number`,
      sql: `store_id`
    },

    sales1UserId: {
      type: `number`,
      sql: `sales_1_user_id`
    },

    sales2UserId: {
      type: `number`,
      sql: `sales_2_user_id`
    },

    dealUserCredit: {
      type: `number`,
      sql: `deal_user_credit`
    },

    visits: {
      type: `number`,
      sql: `visits`
    },

    eligibleOppEmail: {
      type: `number`,
      sql: `eligible_opp_email`
    },

    mobile: {
      type: `number`,
      sql: `mobile`
    },

    proposalCount: {
      type: `number`,
      sql: `proposal_count`
    },

    proposalRatio: {
      type: `number`,
      sql: `proposalratio`
    },

    soldCount: {
      type: `number`,
      sql: `sold_count`
    },

    soldRatio: {
      type: `number`,
      sql: `soldratio`
    },

    deliveredCount: {
      type: `number`,
      sql: `delivered_count`
    },

    deliveredRatio: {
      type: `number`,
      sql: `deliveredratio`
    },

    nonSoldTraffic: {
      type: `number`,
      sql: `nonsoldratio`
    },

    eligibleCall: {
      type: `number`,
      sql: `eligible_call`
    },

    callAttempted: {
      type: `number`,
      sql: `callattempted`
    },

    callRatio: {
      type: `number`,
      sql: `callratio`
    },

    eligibleText: {
      type: `number`,
      sql: `eligible_text`
    },

    taxAttempted: {
      type: `number`,
      sql: `taxAttempted`
    },

    textRatio: {
      type: `number`,
      sql: `textratio`
    },

    eligibleEmail: {
      type: `number`,
      sql: `eligible_email`
    },

    emailAttempted: {
      type: `number`,
      sql: `emailattempted`
    },

    emailRatio: {
      type: `number`,
      sql: `emailratio`
    },

    eligibleVideo: {
      type: `number`,
      sql: `eligible_video`
    },

    videoSent: {
      type: `number`,
      sql: `videoSent`
    },

    videoRatio: {
      type: `number`,
      sql: `videoRatio`
    },

    day2NonSold: {
      type: `number`,
      sql: `day2_non_sold`
    },

    day2Attempted: {
      type: `number`,
      sql: `day2_attempted`
    },

    day3NonSold: {
      type: `number`,
      sql: `day3_non_sold`
    },

    day3Attempted: {
      type: `number`,
      sql: `day3_attempted`
    },

    day4NonSold: {
      type: `number`,
      sql: `day4_non_sold`
    },

    day4Attempted: {
      type: `number`,
      sql: `day4_attempted`
    },

    appointmentsCreated: {
      type: `number`,
      sql: `appointments_created`
    },

    appointmentsRatio: {
      type: `number`,
      sql: `appointmentratio`
    }

  }
});
