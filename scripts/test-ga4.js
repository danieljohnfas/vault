const { google } = require('googleapis');

async function checkGA4() {
  console.log("Checking GA4 properties for the service account...");
  try {
    const keyJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
    if (!keyJson) throw new Error("No GSC_SERVICE_ACCOUNT_JSON");
    const credentials = JSON.parse(keyJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsadmin = google.analyticsadmin({ version: 'v1beta', auth });
    const res = await analyticsadmin.accountSummaries.list();
    
    let foundPropertyId = null;

    if (res.data.accountSummaries && res.data.accountSummaries.length > 0) {
      for (const acc of res.data.accountSummaries) {
        for (const prop of acc.propertySummaries || []) {
          console.log(`Found Property: ${prop.property} - ${prop.displayName}`);
          // Just use the first one if we can't map measurement ID easily without dataStream API
          foundPropertyId = prop.property;
        }
      }
    } else {
      console.log("No GA4 accounts found for this service account.");
      return;
    }
    
    if (foundPropertyId) {
      console.log(`\nAttempting to pull data from ${foundPropertyId}...`);
      const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
      const dataRes = await analyticsdata.properties.runReport({
        property: foundPropertyId,
        requestBody: {
          dateRanges: [{ startDate: '730daysAgo', endDate: 'today' }],
          metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }]
        }
      });
      console.log("Report Data:", JSON.stringify(dataRes.data, null, 2));
    }

  } catch (err) {
    console.error("GA4 Check Error:", err.message);
  }
}

checkGA4();
