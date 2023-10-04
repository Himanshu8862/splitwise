### Frontnend pages
|Url                         | Description                                                                      |
|----------------------------|----------------------------------------------------------------------------------|
|/                           | login                                                                            |
|/register                   | register                                                                         |
|/dashboard                  | homepage with list of friends, groups, create new friends, groups, add expense   |
|/profile/                   | my info, transactions                                                            |
|/friends/[id]               | list of transaction betwee two people                                            |
|/friends/[id]/add-txn       | add transaction form                                                             |
|/group/[id]                 | list of expenses                                                                 |
|/group/[id]/add-expense     | Add expense form                                                                 |
|/txn/[id]                   | details of txn                                                                   |
|/txn/[id]/edit-txn          | edit txn                                                                         |
|/expense/[id]               | details of grp expenses                                                          |
|/expense/[id]/edit-expense  | edit expense -> editing multiple txns                                            |


### Backend routes
|Endpoints                   | Description              |
|----------------------------|--------------------------|
|api/register                | register                 |
|api/auth/[...nextauth]      | login                    |
|api/transaction             | POST txn, GET all        |
|api/transaction/[id]        | Edit, Delete, Update     |
|api/expense                 | POST expense, GET all    |
|api/expense/[id]            | Edit, Delete, Update     |
|api/group                   | POST group, GET all      |
|api/group/[id]              | Edit, Delete, Update     |
|api/user                    | POST user, GET all       |
|api/user/[id]               | Edit, Delete, Update     |