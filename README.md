Checklist:

- Wes:
- Fetching from 2 API's (handling different response objects, handling partial failure (one or the other))
  Get working for 1 first, then refactor

  - not just 1 ID, as we're using 2 API's - may have conflicts so need unique identifier (ID plus a site identifier)
  - BE - users table, artwork table, galleries table (could do similar with state, rather than a BE)
  - Build own backend to handling incoming data and provide consistent formatting?

- Check how to create personal (temp) galleries - use state, create multiple arrays/objects within this? Why one over the other? How would these relate to a database/data table

- Check error handling
- Add loading animation
- Sort functionality
- Pagination? - GREY OUT "NEXT" BUTTON WHEN NO MORE PAGES AVAILABLE
- Add/Remove from temp gallery of saved artwork

- Remove all console logs
- Host
- Responsiveness/Accessibility
- Update README (summary, instructions, dependencies and versions, configuring env variables)
