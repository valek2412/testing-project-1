# testing-project-1

## Task

https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md

Develop an app which makes a request to any of provided api and lists the result as a table of 3 columns:
time added, title and domain
- table headers should be clickable and should sort the entries by according column
- upon reaching end of page load new entries using pagination api
- entry should be clickable and should lead to HackerNews comments(link)
- (optional) implement mobile version which consists of entry title column only (fills screen completely) and has floating sort by date button
- (optional) make table adaptive: breakline entries, truncate by ellipsis any overflow that doesn't fit into 3 lines
- (optional) implement the same functionality for other list (news if you implemented newest, newest otherwise,etc.), add ability to transition between lists

Use any flux-like state management stategy(redux, useReducer hook, flux utilities)
you are free to use any npm packages
you are not obliged to do optional points
do not use CRA


## Start

To start a project, enter `npm start` in the console.
