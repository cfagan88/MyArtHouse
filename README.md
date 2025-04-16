NOTES
- Fetching from 2 API's (handling different response objects, handling partial failure (one or the other))
  Get working for 1 first, then refactor
  - not just 1 ID, as we're using 2 API's - may have conflicts so need unique identifier (ID plus a site identifier)
  - BE - users table, artwork table, galleries table (could do similar with state, rather than a BE)


MVP
- Sort functionality
- Add/Remove from temp gallery of saved artwork
  - Check how to create personal (temp) galleries - use state, create multiple arrays/objects within this? Why one over the other? How would these relate to a database/data table

ADDITIONAL
- Create art page with additional info
- Links for classification/type?
- Add loading animation

FINAL CHECKS
- Remove all console logs
- Check error handling
- Responsiveness/Accessibility
- Update README (summary, instructions, dependencies and versions, configuring env variables)
- Host

DONE (Check at end)
- Pagination w/ search - one page too many?
- Check titles - how best to truncate?
- Search - combine with pagination?
