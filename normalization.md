## Anomaly Analysis

### Insert Anomaly
The flat file mixes order data with customer, product, and sales representative data in the same row. Because of this, a new product cannot be inserted independently unless an order is also created. For example, in row 13, the product information (`product_id = P008`, `product_name = Webcam`, `category = Electronics`, `unit_price = 2100`) exists only together with order-related columns such as `order_id = ORD1185`, `customer_id = C003`, and `order_date = 2023-11-09`. There is no separate place in the current design to store a new product master record before it is sold. This is an insert anomaly.

### Update Anomaly
The same sales representative details are repeated across multiple rows, creating a risk of inconsistency during updates. A clear example is `sales_rep_id = SR01`. In row 3, the `office_address` is recorded as `Mumbai HQ, Nariman Point, Mumbai - 400021`, while in row 39 the same sales representative has `office_address = Mumbai HQ, Nariman Pt, Mumbai - 400021`. The columns involved are `sales_rep_id`, `sales_rep_name`, and `office_address`. If the office address is updated in one row but not in all other rows, inconsistent values remain in the dataset. This is an update anomaly.

### Delete Anomaly
A delete anomaly occurs when removing one order row also removes all information about a product or other entity. In this dataset, product `P008` (`Webcam`) appears only once, in row 13. If row 13 is deleted because order `ORD1185` is cancelled or removed, all product information in columns `product_id`, `product_name`, `category`, and `unit_price` for `P008` is also lost. This is a delete anomaly because deleting transactional data causes loss of master data.

## Normalization Justification

I would refute the manager’s argument that one table is “simpler.” In this dataset, keeping everything in a single denormalized table creates repeated customer, product, and sales representative details in every order row, which directly causes data quality problems. A strong example is `sales_rep_id = SR01`, where the same office address appears in two inconsistent forms: “Nariman Point” and “Nariman Pt.” Because the address is stored repeatedly across many rows, one partial update can leave the database inconsistent. This is exactly the type of problem normalization is meant to prevent.

The same issue exists for products. Product `P008` (`Webcam`) appears only once in row 13. If that single row is deleted, the company loses all information about the product itself. Likewise, inserting a new product before any order is placed is not possible because product columns are tied to order columns in the same row. That means the current structure creates insert, update, and delete anomalies.

Normalizing the data into separate tables such as `customers`, `products`, `sales_representatives`, and `orders` stores each fact only once and connects them through keys. This improves integrity, avoids duplication, and makes future maintenance much easier. Therefore, normalization here is not over-engineering; it is necessary for correctness, consistency, and scalability.