# Edge-case bank

The brain draws from the section of the stage's scenario with the seed rule in `../BRAIN.md`. Each line is one case. Add new cases at the end of a section, never in the middle (that would change old draws). A case that found a bug is also added to the job's regression set.

## E2 - Frontend

1. E2-01 Double-click the main submit button fast. Expect one record, not two.
2. E2-02 Press Back after a successful submit, then submit again.
3. E2-03 A name of 200 characters, with no spaces. Expect no sideways scroll and no clipped button.
4. E2-04 An empty list: no records at all. Expect a clear empty state, not a blank page or an error.
5. E2-05 Text zoom to 200%. Every action still reachable.
6. E2-06 Keyboard only: reach and use every control with Tab, Enter, Space, Escape.
7. E2-07 Width 320 px, then 390 px, then 1440 px. No hidden action, no overlap.
8. E2-08 Reload in the middle of a multi-step form.
9. E2-09 Open the same record in two tabs; edit in both; save both.
10. E2-10 Paste text with emoji, right-to-left Arabic and a zero-width space into every text field.
11. E2-11 Turn the network off, click save, turn it back on.
12. E2-12 Firefox and WebKit, not only Chromium.
13. E2-13 Reduced motion turned on. Meaning kept.
14. E2-14 A screen reader reads the main flow: every control has a name; errors are announced.

## E3 - API and backend

1. E3-01 A required field missing. Expect 4xx with the field named, not 500.
2. E3-02 Wrong type: a number as a string, a string as a number, an array as an object.
3. E3-03 A date in another format (27/10/2026, 2026-13-01, 2026-02-30).
4. E3-04 No auth header; an expired token; another user's token on this user's record.
5. E3-05 An id that does not exist; an id of another tenant.
6. E3-06 A body of 5 MB; an empty body; invalid JSON.
7. E3-07 The same request sent twice at once (idempotency).
8. E3-08 Unicode in every string: emoji, combining marks, a null byte.
9. E3-09 Very large and negative numbers; 0; NaN and Infinity in JSON.
10. E3-10 An extra unknown field. Expect it ignored or refused, as the contract says.
11. E3-11 Each error response has the error shape from the contract.
12. E3-12 The outside API (stubbed) returns 500, then a timeout, then malformed JSON.

## E4 - Database and queries

1. E4-01 A list query with 10,000 rows of test data. Time it; read the query plan.
2. E4-02 Delete a parent with children. Expect the rule in the data model (refuse or cascade), never orphans.
3. E4-03 Two writes to the same row at once.
4. E4-04 Migrate up, migrate down, migrate up again on a copy with test data. Same data after.
5. E4-05 A text field with quotes and `'; DROP TABLE x; --` stored and read back unchanged.
6. E4-06 Dates around midnight and a daylight-saving change, stored and read in UTC.
7. E4-07 A unique field with the same value in different letter case.
8. E4-08 The database file or server is not reachable at start.
9. E4-09 A sum or count that the page shows, checked by hand against the rows.
10. E4-10 N+1: a page that runs one query per row.

## E5 - Cloud and config

1. E5-01 A required setting missing. Expect a clear start-up error, not a crash later.
2. E5-02 A setting with a wrong value (port "abc", URL with no scheme).
3. E5-03 The health check when the database is down. Expect "not healthy".
4. E5-04 Cold start: first request time after a fresh start.
5. E5-05 Debug mode, stack traces and default secrets off outside development.
6. E5-06 `.env.example` lists every setting the code reads; no values in it.
7. E5-07 The app started with the test settings never reaches a production host name.
8. E5-08 Log lines have no secrets, tokens or personal data.

## E6 - Load and timeouts

1. E6-01 Ramp from 1 to 50 users over 2 minutes. Record p50, p95, p99 and errors.
2. E6-02 A spike: 1 to 100 users in 10 seconds.
3. E6-03 A soak: 10 users for 15 minutes. Memory and open connections stay flat.
4. E6-04 The stubbed outside API answers in 10 seconds. The app times out at its own limit and says so.
5. E6-05 The stubbed outside API fails 3 times, then works. Retries are capped and spaced.
6. E6-06 The database is slow (an added delay). The page still shows within its limit, or a clear error.
7. E6-07 A slow network (about 400 kbit/s, 400 ms delay) in the browser.
8. E6-08 Many users write to the same record at once.
9. E6-09 The client gives up (closes the connection) mid-request. The server does not keep working for nothing.
10. E6-10 Rate limits: the app's own limit answers 429 with a retry time.

## E7 - Region

1. E7-01 The page in each test language: no missing keys, no raw key names on screen.
2. E7-02 A language 40% longer than English (German). No clipped text.
3. E7-03 A right-to-left language. Layout mirrors; numbers stay readable.
4. E7-04 Time zone UTC+5:30 and UTC-10. Due dates and "today" are right at 23:30 local time.
5. E7-05 A daylight-saving change day in the test region.
6. E7-06 Currency with no minor unit (JPY), with 3 (KWD), and a comma as the decimal mark.
7. E7-07 Dates written the local way (27/10/2026 vs 10/27/2026).
8. E7-08 Names with one word only, with accents, with an apostrophe.
9. E7-09 Phone numbers and postcodes in the region's form.
10. E7-10 Data-law limits: where personal data is stored, the consent text, and a way to delete a user's data, as `business/RISK.md` says.

## E10 - Mobile

1. E10-01 Rotate the device mid-form.
2. E10-02 The app goes to the background and comes back after 10 minutes.
3. E10-03 No network at start; network lost mid-sync.
4. E10-04 Large text setting (accessibility size).
5. E10-05 Dark mode.
6. E10-06 A small old screen (360 x 640) and a large tablet.
7. E10-07 Permission refused (camera, notifications, location).
8. E10-08 TalkBack or VoiceOver on the main flow.
9. E10-09 The keyboard covers the input field.
10. E10-10 The app is killed during a save.
