## ETL Decisions

### Decision 1 — Standardizing mixed date formats
Problem: The raw file contained multiple date formats such as `29/08/2023`, `12-12-2023`, and `2023-02-05`. If loaded directly, these would make reporting by month unreliable and complicate joins with the date dimension.
Resolution: I converted all transaction dates into a single standardized `YYYY-MM-DD` format before loading them into the warehouse. I then generated a numeric `date_key` in `YYYYMMDD` format for the `dim_date` table.

### Decision 2 — Fixing missing store city values
Problem: The dataset contained NULL values in the `store_city` column, which would create incomplete dimension records and reduce reporting quality by location.
Resolution: I filled missing `store_city` values using the known city associated with the same `store_name`. For example, records for stores such as `Chennai Anna`, `Delhi South`, and `Bangalore MG` were standardized so each store had a consistent city value in `dim_store`.

### Decision 3 — Standardizing category labels
Problem: Product categories appeared in inconsistent forms such as `electronics`, `Electronics`, `Groceries`, and `Grocery`. This would split the same business category into multiple groups during analysis.
Resolution: I standardized category values into a clean warehouse format: `Electronics`, `Clothing`, and `Groceries`. This ensured that category-based aggregations, especially monthly revenue analysis, produced correct and consistent results.