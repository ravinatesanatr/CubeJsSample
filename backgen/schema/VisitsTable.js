cube(`VisitsTable`, {
    sql: `SELECT * FROM fuszrewrite.visitdelivered`,
    measures: {
        visits: {
            type: `sum`,
            sql: `visits`
        },

        dealUserCredit: {
            type: `sum`,
            sql: `deal_user_credit`
        },

        eligibleOppEmail: {
            type: `sum`,
            sql: `eligible_opp_email`
        },

        mobile: {
            type: `sum`,
            sql: `mobile`
        },

        proposalCount: {
            type: `sum`,
            sql: `proposal_count`
        },

        proposalRatio: {
            type: `avg`,
            sql: `proposalratio`
        },

        soldCount: {
            type: `sum`,
            sql: `sold_count`
        },

        soldRatio: {
            type: `avg`,
            sql: `soldratio`
        },

        deliveredCount: {
            type: `sum`,
            sql: `delivered_count`
        },

        deliveredRatio: {
            type: `avg`,
            sql: `deliveredratio`
        },

        nonSoldTraffic: {
            type: `avg`,
            sql: `nonsoldratio`
        },

        eligibleCall: {
            type: `sum`,
            sql: `eligible_call`
        },

        callAttempted: {
            type: `sum`,
            sql: `callattempted`
        },

        callRatio: {
            type: `avg`,
            sql: `callratio`
        },

        eligibleText: {
            type: `sum`,
            sql: `eligible_text`
        },

        textAttempted: {
            type: `sum`,
            sql: `textAttempted`
        },

        textRatio: {
            type: `avg`,
            sql: `textratio`
        },

        eligibleEmail: {
            type: `sum`,
            sql: `eligible_email`
        },

        emailAttempted: {
            type: `sum`,
            sql: `emailattempted`
        },

        emailRatio: {
            type: `avg`,
            sql: `emailratio`
        },

        eligibleVideo: {
            type: `sum`,
            sql: `eligible_video`
        },

        videoSent: {
            type: `sum`,
            sql: `videoSent`
        },

        videoRatio: {
            type: `avg`,
            sql: `videoRatio`
        },

        day2NonSold: {
            type: `sum`,
            sql: `day2_non_sold`
        },

        day2Attempted: {
            type: `sum`,
            sql: `day2_attempted`
        },

        day3NonSold: {
            type: `sum`,
            sql: `day3_non_sold`
        },

        day3Attempted: {
            type: `sum`,
            sql: `day3_attempted`
        },

        day4NonSold: {
            type: `sum`,
            sql: `day4_non_sold`
        },

        day4Attempted: {
            type: `sum`,
            sql: `day4_attempted`
        },

        appointmentsCreated: {
            type: `sum`,
            sql: `appointments_created`
        },

        appointmentsRatio: {
            type: `avg`,
            sql: `appointmentratio`
        }
    },

    dimensions: {
        visitDate: {
            type: `time`,
            sql: `visit_date`
        },

        sales1UserId: {
            type: `string`,
            sql: `sales_1_user_id`
        },

        source: {
            type: `string`,
            sql: `source`
        }
    }
});