-- Q1:
SELECT
    d.year_num,
    d.month_num,
    d.month_name,
    p.category,
    SUM(f.sales_revenue) AS total_sales_revenue
FROM fact_sales f
JOIN dim_date d
    ON f.date_key = d.date_key
JOIN dim_product p
    ON f.product_key = p.product_key
GROUP BY d.year_num, d.month_num, d.month_name, p.category
ORDER BY d.year_num, d.month_num, p.category;

-- Q2:
SELECT
    s.store_name,
    s.store_city,
    SUM(f.sales_revenue) AS total_revenue
FROM fact_sales f
JOIN dim_store s
    ON f.store_key = s.store_key
GROUP BY s.store_name, s.store_city
ORDER BY total_revenue DESC
LIMIT 2;

-- Q3:
SELECT
    d.year_num,
    d.month_num,
    d.month_name,
    SUM(f.sales_revenue) AS monthly_sales_revenue
FROM fact_sales f
JOIN dim_date d
    ON f.date_key = d.date_key
GROUP BY d.year_num, d.month_num, d.month_name
ORDER BY d.year_num, d.month_num;