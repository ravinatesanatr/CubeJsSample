const { authInfo: { schema } } = COMPILE_CONTEXT;

const schemaName = `${schema}`;
cube(`vo`, {
    sql: ` select *  from ${schemaName}.rpt_visit_delivered `,
    measures: {
        count: {
            type: `count`
        },
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
            type: `sum`,
            sql: `proposalratio`
        },

        soldCount: {
            type: `sum`,
            sql: `sold_count`
        },

        soldRatio: {
            type: `sum`,
            sql: `soldratio`
        },

        deliveredCount: {
            type: `sum`,
            sql: `delivered_count`
        },

        deliveredRatio: {
            type: `sum`,
            sql: `deliveredratio`
        },

        nonSoldTraffic: {
            type: `sum`,
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
            type: `sum`,
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
            type: `sum`,
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
            type: `sum`,
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
            type: `sum`,
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
            type: `sum`,
            sql: `appointmentratio`
        }
    },
    dimensions: {
        source: {
            sql: `source`,
            type: `string`
        },
        salesPerson: {
            sql: `sales1_username`,
            type: `string`
        },
        vehMake: {
            sql: `vehicle_make`,
            type: `string`
        },
        vehModel: {
            sql: `vehicle_model`,
            type: `string`
        },
        teamName: {
            sql: `team_name`,
            type: `string`
        },
        visitDate: {
            sql: `visit_date`,
            type: `time`
        }
    },
    preAggregations: {
        categoryAndDate: {
            type: `rollup`,
            measureReferences: [vo.count, visits, dealUserCredit, eligibleOppEmail, mobile, proposalCount, proposalRatio, soldCount, soldRatio, deliveredCount, deliveredRatio,
                nonSoldTraffic, eligibleCall, callAttempted, callRatio, eligibleText, textAttempted, textRatio, eligibleEmail, emailAttempted, emailRatio, eligibleVideo,
                videoSent, videoRatio, day2NonSold, day2Attempted, day3NonSold, day3Attempted, day4NonSold, day4Attempted, appointmentsCreated, appointmentsRatio],
            dimensionReferences: [source, vehMake, vehModel, teamName, salesPerson],
            timeDimensionReference: visitDate,
            granularity: `day`,
            external: true
        }
    }
});