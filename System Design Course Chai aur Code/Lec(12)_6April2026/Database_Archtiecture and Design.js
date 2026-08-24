// //<============Lec12: Database Architecture and Design ============>
// If you're learning Database Architecture and Design, don't learn it as a collection of MongoDB/PostgreSQL commands. 
// Learn the story of why databases evolved, what problems each generation solved, and why an architecture eventually moves from one database
// to another.
// ## 1. The story of databases
// Think of the evolution like this:
// Files
//   ↓
// Hierarchical databases
//   ↓
// Network databases
//   ↓
// Relational databases (SQL)
//   ↓
// Distributed databases
//   ↓
// NoSQL
//   ↓
// Cloud / Managed databases
//   ↓
// Polyglot persistence

// The important point is:
// >A new database type usually appears because the old approach has limitations for a new scale or workload.

// # 2. Before databases — Files
// Originally, applications often stored information in files.
// For example:
// users.txt
// orders.txt
// products.txt

// Imagine an e-commerce application.
// users.txt
// 101, Noor, India
// 102, Rahul, India

// orders.txt
// 5001, 101, Laptop
// 5002, 101, Phone

// ### Problem
// As applications became bigger:
// * duplicate data
// * difficult searching
// * difficult relationships
// * concurrency problems
// * poor data consistency
// * difficult backup/recovery
// So people needed a proper database management system (DBMS).

// # 3. Relational databases
// The major breakthrough was the relational model, introduced by Edgar F. Codd in a 1970 paper.
// The idea was:
// > Store data in structured tables and represent relationships between them.
// Example:
// Users
// +----+-------+
// | id | name  |
// +----+-------+
// | 1  | Noor  |
// | 2  | Rahul |
// +----+-------+

// Orders
// +----+---------+--------+
// | id | user_id | amount |
// +----+---------+--------+
// | 10 | 1       | 5000   |
// | 11 | 1       | 2000   |
// +----+---------+--------+

// Now you can say:
// sql
// SELECT *
// FROM users
// JOIN orders
// ON users.id = orders.user_id;
// This gave us the foundation of modern SQL databases.
// Examples:
// * PostgreSQL
// * MySQL
// * Oracle
// * SQL Server

// # 4. Why SQL became so popular
// Relational databases gave us powerful concepts:
// ### ACID transactions
// For example, transferring ₹1,000:
// Account A: -₹1,000
// Account B: +₹1,000
// You don't want:
// A = -₹1,000
// B = nothing
// You want both operations to succeed or neither to happen.
// That's where transactions and ACID become important.

// # 5. Then applications became HUGE
// Imagine an application with:
// 10 users
//    ↓
// 1,000 users
//    ↓
// 1 million users
//    ↓
// 100 million users
// Now the database becomes a bottleneck.
// You might have:
//           Application
//                ↓
//         ┌─────────────┐
//         │ PostgreSQL  │
//         └─────────────┘

// Eventually:
//                 Application
//                      ↓
//               ┌─────────────┐
//               │   Database  │
//               └─────────────┘
//                      ↑
//                 bottleneck
// You start asking:
// * How do I handle more reads?
// * How do I handle more writes?
// * How do I reduce latency?
// * How do I survive database failure?
// * How do I scale horizontally?
// This led to techniques such as:
// Replication
// Sharding
// Partitioning
// Caching
// Read replicas
// Clustering

// # 6. Replication
// Instead of having one database:
// Application
//      ↓
//  Primary DB
// you can have:
//               Primary
//              /      \
//             ↓        ↓
//        Replica 1   Replica 2
// Writes go to the primary:
// Application → Primary
// Reads can potentially go to replicas:
// Application → Replica 1
//             → Replica 2
// This improves read scalability and availability, depending on the design.

// # 7. Sharding
// Replication doesn't solve everything.
// Suppose you have:
// 10 TB
// 100 TB
// 1 PB
// You might distribute the data across multiple database nodes.
//                  Database
//               /     |      \
//              ↓      ↓       ↓
//           Shard 1 Shard 2 Shard 3
// For example:
// Shard 1 → users A-F
// Shard 2 → users G-M
// Shard 3 → users N-Z
// Now you're distributing the data horizontally.

// # 8. Then came the NoSQL movement
// As web applications became extremely large, some workloads didn't fit neatly into relational databases.
// For example, imagine user profiles:
// {
//   "id": 101,
//   "name": "Noor",
//   "skills": [
//     "React",
//     "Node.js",
//     "AWS"
//   ],
//   "projects": [
//     {
//       "name": "LoopBoard",
//       "role": "Developer"
//     }
//   ]
// }
// A document database such as MongoDB can naturally represent this structure.
// So we got databases such as:
// MongoDB       → Document
// Redis         → Key-value
// Cassandra     → Wide-column
// Neo4j         → Graph

// The important lesson:
// >NoSQL didn't make SQL obsolete. It gave developers additional choices for workloads where different trade-offs are useful.

// # 9. Why do we migrate from one database to another?
// This is probably the most important part of your question.
// You don't migrate simply because another database is newer.
// You migrate because the requirements changed.
// For example:
// ### Situation 1 — Performance
// You have:
// MySQL
//  ↓
// 10 million users
// Queries are becoming too slow.
// You investigate and discover the actual problem might be:
// missing indexes
// bad queries
// poor schema
// insufficient hardware
// You should not immediately migrate.
// First optimize the existing database.
// But if the workload fundamentally fits another architecture better, migration may make sense.

// ### Situation 2 — Scale
// Your system grows from:
// 1,000 users
//       ↓
// 100 million users

// The original architecture may no longer scale economically.
// You may introduce:
// Read replicas
// Partitioning
// Sharding
// Distributed database

// ### Situation 3 — Data model changed
// Initially:
// Relational tables
// Later your application becomes heavily document-oriented.
// You might consider:
// MongoDB
// But this comes with trade-offs—you may lose or complicate some relational capabilities.

// ### Situation 4 — Availability
// Your business requires:
// 99.99% availability
// Your current database architecture might not provide the required failure tolerance.
// You may move to a managed or distributed database architecture.
// ### Situation 5 — Cost
// You might have:
// Expensive proprietary database
// and decide to move to:
// PostgreSQL
// to reduce licensing costs.
// Cost is one of the real-world reasons organizations migrate. AWS also lists licensing cost, cloud capabilities, and data quality among reasons for database refactoring.
//  ([Amazon Web Services, Inc.][1])

// ### Situation 6 — Cloud migration
// Old architecture:
// On-premise
//      ↓
// Oracle

// New architecture:
// AWS
//  ↓
// Aurora / PostgreSQL / etc.
// You may migrate to take advantage of managed infrastructure, scalability, availability, or cloud capabilities.

// # 10. Very important: Don't think "SQL → NoSQL
// A beginner often thinks:
// Old database = SQL
// New database = MongoDB
// Therefore MongoDB is better

// ❌ Wrong.
// Instead ask:
// What does my application need?
//         ↓
// What is my workload?
//         ↓
// Read-heavy or write-heavy?
//         ↓
// Strong consistency required?
//         ↓
// What is the data model?
//         ↓
// How much data?
//         ↓
// How much traffic?
//         ↓
// What availability is required?
//         ↓
// What latency is required?
//         ↓
// Which database fits those requirements?

// # 11. Modern architecture: Polyglot Persistence
// Today, a large application doesn't necessarily use one database.

// For example:
//                     Application
//                          |
//         ┌────────────────┼────────────────┐
//         ↓                ↓                ↓
//     PostgreSQL          Redis           MongoDB
//         ↓                ↓                ↓
//  Transactions        Cache/Session    Documents

// And maybe:
// Elasticsearch → Search
// S3             → Videos/images
// Kafka           → Events

// This is called polyglot persistence.
// You choose the storage technology based on the workload.

// # 12. Example: Video application
// Since you were recently learning video transcoding, imagine building YouTube.
// You might use:
// Video files
//     ↓
// S3

// Metadata:
// PostgreSQL

// Cache:
// Redis

// Search:
// OpenSearch

// Events:
// Kafka / EventBridge

// Transcoding jobs:
// SQS
// So there isn't necessarily a single "best database."

// # 13. How a real database migration happens
// Suppose:
// PostgreSQL
//      ↓
// MongoDB
// You don't simply:
// DELETE PostgreSQL
// INSTALL MongoDB

// 😂
// It's more like:
//                  OLD
//              PostgreSQL
//                   |
//                   | Data migration
//                   ↓
//               MongoDB
//                   |
//                   ↓
//               Validation
//                   |
//                   ↓
//              Application
//                   |
//                   ↓
//               New DB
// A serious migration generally involves:
// 1. Understand current system
// 2. Analyze dependencies
// 3. Design target architecture
// 4. Convert schema/data model
// 5. Migrate data
// 6. Keep systems synchronized if needed
// 7. Test
// 8. Performance testing
// 9. Gradually move traffic
// 10. Monitor
// 11. Cut over
// 12. Keep rollback plan
// AWS describes database migration as a multi-phase process involving assessment, schema conversion, data migration, testing, performance tuning, and related work. ([Amazon Web Services, Inc.][2])
// For large systems, an incremental migration can reduce risk compared with a single big cutover. ([AWS Documentation][3])

// # 14. Database Architecture — what you should learn
// For your Full Stack + Backend + System Design preparation, I'd learn databases in this order:
// ### Level 1 — Fundamentals
// Database
// DBMS
// RDBMS
// SQL
// Tables
// Rows
// Columns
// Primary Key
// Foreign Key
// Indexes
// Constraints
// Normalization

// ### Level 2 — Transactions
// ACID
// Transactions
// Concurrency
// Locks
// Mutex vs DB locks
// Isolation levels
// Deadlocks
// MVCC

// ### Level 3 — Performance
// Indexes
// Query optimization
// EXPLAIN
// Caching
// Connection pooling
// Read replicas
// Partitioning

// ### Level 4 — Scaling
// Vertical scaling
// Horizontal scaling
// Replication
// Sharding
// Partitioning
// Load balancing
// Consistency
// CAP theorem

// ### Level 5 — Database types
// PostgreSQL
// MySQL
// MongoDB
// Redis
// Cassandra
// DynamoDB
// Elasticsearch/OpenSearch
// Graph databases

// ### Level 6 — Distributed systems
// Strong consistency
// Eventual consistency
// Leader/follower
// Consensus
// Replication
// Quorum
// Distributed transactions
// Event-driven architecture

// ### Level 7 — Real-world architecture
// Database migration
// Zero-downtime migration
// Blue/green migration
// Dual writes
// CDC
// AWS DMS
// Backup/restore
// Disaster recovery
// Multi-region databases

// # 15. Best resources
// ### ⭐ Start with Martin Fowler — Evolutionary Database Design
// This is particularly relevant to your question about database migration and how databases evolve over time.
// It explains why database changes should be treated as version-controlled migrations and how teams can safely evolve production schemas. ([martinfowler.com][4])
// [Martin Fowler — Evolutionary Database Design](https://martinfowler.com/articles/evodb.html?utm_source=chatgpt.com)

// ### ⭐ AWS Database Migration Guide
// Good once you understand the fundamentals. It covers actual migration strategies and tools such as AWS DMS and schema conversion. ([AWS Documentation][5])
// [AWS Database Migration Guide](https://docs.aws.amazon.com/dms/latest/sbs/dms-sbs-welcome.html?utm_source=chatgpt.com)

// ### ⭐ AWS — Database Migration Explained
// Useful for understanding why companies actually migrate databases, including refactoring, cloud migration, cost, and data transformation. ([Amazon Web Services, Inc.][1])
// [AWS — What is Database Migration?](https://aws.amazon.com/what-is/database-migration/?utm_source=chatgpt.com)

// ## The one mental model I want you to remember
// Don't memorize:
// > "MongoDB is better than PostgreSQL."
// Instead think:
//                  BUSINESS REQUIREMENTS
//                          ↓
//                   WORKLOAD PATTERN
//                          ↓
//               ┌──────────┴──────────┐
//               ↓                     ↓
//           DATA MODEL             SCALE
//               ↓                     ↓
//         CONSISTENCY             LATENCY
//               ↓                     ↓
//           AVAILABILITY            COST
//               └──────────┬──────────┘
//                          ↓
//                   DATABASE DESIGN
//                          ↓
//               DATABASE ARCHITECTURE
//                          ↓
//               OPTIMIZE / SCALE
//                          ↓
//                MIGRATE IF NEEDED
// That is the real story of database architecture: databases didn't evolve because one technology replaced another; they evolved because application requirements, data volumes, workloads, and reliability requirements changed.
// [1]: https://aws.amazon.com/what-is/database-migration/?utm_source=chatgpt.com "What is Database Migration? - Database Migration Explained - AWS"
// [2]: https://aws.amazon.com/blogs/database/database-migration-what-do-you-need-to-know-before-you-start/?utm_source=chatgpt.com "Database Migration—What Do You Need to Know Before You Start? | AWS Database Blog"
// [3]: https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-database-migration/strategy-database-migration.pdf?utm_source=chatgpt.com "AWS Prescriptive Guidance - Migration strategy for relational databases"
// [4]: https://www.martinfowler.com/articles/evodb.html?utm_source=chatgpt.com "Evolutionary Database Design"
// [5]: https://docs.aws.amazon.com/dms/latest/sbs/dms-sbs-welcome.html?utm_source=chatgpt.com "Database Migration Step-by-Step Walkthroughs - Database Migration Guide"


//
Yes — this is the right level to study if you want to understand Database Architecture & Design deeply. Don't just memorize "query optimizer = makes query fast.
"Build a story of what happens from the moment SQL enters the DB until data comes back, and then understand what happens during a write/crash.
A useful high-level model is:
                         CLIENT / APPLICATION
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  Query Processor │
                         │                 │
SQL ───────────────────► │ Parser/Rewriter │
                         │       ↓         │
                         │    Optimizer    │
                         │       ↓         │
                         │ Execution Engine│
                         └────────┬────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
             ┌──────────────┐           ┌──────────────┐
             │ Buffer Pool  │           │ Transaction  │
             │ / Page Cache │           │    Manager   │
             └──────┬───────┘           └──────┬───────┘
                    │                          │
                    ▼                          ▼
             ┌──────────────┐           ┌──────────────┐
             │Storage Engine│           │ Lock / MVCC   │
             │              │           │   Manager     │
             └──────┬───────┘           └──────────────┘
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
       Tables     Indexes     Pages
          │
          ▼
        Disk
          ▲
          │
      Write-Ahead Log
          │
          ▼
    Recovery Manager

        System Catalog / Metadata
              │
              └──► used by Optimizer,
                   Parser, Executor, etc.
This general decomposition—query planning, execution, access methods, buffer pool, concurrency control, 
and recovery—is also the way database-system courses such as CMU's 15-445/645 approach database internals. ([CMU CS Department][1])

# 1. First: What is a DBMS actually doing?
You write:
sql
SELECT name
FROM users
WHERE age > 25;
It looks simple.
But internally:
SQL
 ↓
Parse
 ↓
Understand meaning
 ↓
Check metadata
 ↓
Generate possible plans
 ↓
Choose cheapest plan
 ↓
Execute plan
 ↓
Find pages
 ↓
Get pages into RAM
 ↓
Read rows
 ↓
Filter rows
 ↓
Return result
PostgreSQL's official internals documentation describes essentially this path: parser → rewrite → planner/optimizer → executor. ([PostgreSQL][2])
Now let's understand each component as a story.

# 2. Storage Engine — "Where is my data?"
The storage engine's job is basically:
>"How do I physically store and retrieve database data?"
It deals with things like:
Tables
Indexes
Pages
Files
Disk I/O
Buffer manager
Access methods
Free space

A DBMS doesn't generally think:
"Give me row #523."
at the physical storage level.
It works with pages/blocks.

# 3. Pages / Blocks
Imagine your table contains:
10 million users

You can't efficiently treat the entire table as one giant object.
Instead, storage is divided into chunks:
Table
 │
 ├── Page 1
 ├── Page 2
 ├── Page 3
 ├── Page 4
 ├── ...
 └── Page N

A page contains multiple records/tuples plus page-level information.

Conceptually:
┌───────────────────────────────┐
│ Page                           │
├───────────────────────────────┤
│ Header                         │
├───────────────────────────────┤
│ Row 1                          │
│ Row 2                          │
│ Row 3                          │
│ Row 4                          │
├───────────────────────────────┤
│ Free Space                     │
└───────────────────────────────┘

The exact page size and layout depend on the database.
For example, PostgreSQL uses page-based storage,
while CMU's BusTub teaching DBMS uses 4 KB pages. Importantly, a logical page is different from a memory frame that temporarily holds that page in the buffer pool. ([CMU 15-445/645][3])

### Page vs block
People often use page and block almost interchangeably when discussing DB storage.
A useful mental model:
Page = DBMS's unit of storage/I/O
Block = often used as a similar physical storage unit
Don't get stuck on the terminology because the exact meaning varies by database.

# 4. Buffer Pool — "Disk is slow, RAM is fast"
Now imagine the query needs:
Page 500
The database doesn't want to go to disk every time.
So it maintains a buffer pool in RAM:
                 RAM
        ┌───────────────────┐
        │    Buffer Pool    │
        │                   │
        │ Page 10           │
        │ Page 25           │
        │ Page 500          │
        │ Page 720           │
        └───────────────────┘
                  │
                  │ cache miss
                  ▼
                DISK
If Page 500 is already in memory:
Query → Buffer Pool → Page 500
Fast.
If not:
Query
 ↓
Buffer Pool
 ↓
MISS
 ↓
Disk
 ↓
Load Page 500 into RAM
 ↓
Return Page

That's why the buffer pool is essentially the database's page cache.
CMU's database course explicitly describes the buffer pool as the mechanism that 
allows a database larger than RAM to be operated on by moving pages between disk and memory. ([CMU 15-445/645][3])

# 5. Buffer Pool has another important job
Suppose RAM is full:
Buffer Pool
┌───────┬───────┬───────┬───────┐
│ P1    │ P2    │ P3    │ P4    │
└───────┴───────┴───────┴───────┘
You need:
P5
Which page should be removed?
That's where a **replacement policy** comes in.
Examples:
LRU
LRU-K
Clock
CMU's BusTub project, for example, teaches buffer-pool management together with a replacement policy and disk scheduling. ([CMU 15-445/645][3])

# 6. Now the Query Processor
You send:
sql
SELECT *
FROM users
WHERE age > 25;
The DBMS needs to understand it.
That's the query processor.
Think:

```text
SQL
 ↓
Parser
 ↓
Query representation
 ↓
Rewriter
 ↓
Optimizer
 ↓
Execution Plan
 ↓
Executor
```

---

# 7. SQL Parser — "Is this SQL valid?"

Parser checks the structure/syntax.

For example:

```sql
SELECT name FROM users WHERE age > 25;
```

is valid.

But:

```sql
SELEC name FORM users;
```

isn't.

The parser creates an internal representation, often a tree.

Conceptually:

```text
SELECT
  │
  ├── name
  │
  └── FROM users
          │
          └── WHERE age > 25
```

PostgreSQL's internals explicitly separate the parser stage from later planning and execution. ([PostgreSQL][2])

---

# 8. Query Rewriter

This is often forgotten.

The rewriter can transform the query based on database rules, views, etc.

For example:

```text
SQL
 ↓
Parser
 ↓
Query Tree
 ↓
Rewriter
 ↓
Modified Query Tree
 ↓
Optimizer
```

Think of it as:

> **"Before we optimize this query, do we need to rewrite/expand anything?"**

PostgreSQL, for example, has a rule system that can rewrite queries involving views and rules. ([PostgreSQL][2])

---

# 9. Query Optimizer — "What's the cheapest way?"

This is one of the most important components.

Suppose:

```sql
SELECT *
FROM users
WHERE email = 'noor@example.com';
```

You have:

```text
1 billion users
```

There are several possible ways to execute this.

### Plan A

Scan every row:

```text
1 billion rows
 ↓
check email
 ↓
find user
```

Very expensive.

### Plan B

Use an index:

```text
email index
    ↓
find matching entry
    ↓
fetch row
```

Much cheaper.

So the optimizer asks:

> **"Which execution plan is likely to cost the least?"**

The optimizer considers things such as:

```text
Indexes
Table size
Statistics
Estimated rows
Join order
Join algorithm
Sorting
Filtering
I/O cost
CPU cost
Memory
```

PostgreSQL's documentation describes the planner/optimizer as generating possible plans and selecting the plan it estimates will be most efficient. ([PostgreSQL][4])

---

# 10. Important correction: Optimizer doesn't simply "make query fast"

This is a better understanding:

> **Optimizer chooses an execution strategy based on estimated cost.**

For example:

```text
Query
 ↓
Possible Plans

Plan A → Full Table Scan
Plan B → Index Scan
Plan C → Bitmap Scan
Plan D → Index + Nested Loop
 ↓
Estimate cost
 ↓
Choose plan
```

It doesn't magically execute the query faster.

**It chooses the strategy.**

The **execution engine executes that strategy.**

---

# 11. Execution Engine — "Now actually do it"

Suppose optimizer chooses:

```text
Index Scan
    ↓
Fetch rows
    ↓
Filter
    ↓
Return result
```

The execution engine actually performs those operations.

Common operators:

```text
Table Scan
Index Scan
Filter
Join
Sort
Aggregate
Limit
```

So:

```text
Optimizer
   ↓
"Use Index Scan"
   ↓
Executor
   ↓
Actually performs Index Scan
```

That's the difference you should remember.

---

# 12. Query Optimizer + Buffer Pool are connected

This is a very important concept.

Suppose:

```text
Table = 100 GB
RAM   = 64 GB
```

The optimizer cares about I/O cost.

Why?

Because fetching pages from storage can be expensive.

The optimizer's cost model therefore considers estimated work such as disk/page access, CPU, and other factors. The exact cost model varies by database.

So:

```text
Optimizer
    │
    ├── Table statistics
    ├── Index statistics
    ├── Cardinality estimates
    └── Cost model
             ↓
       Execution Plan
             ↓
      Buffer Manager
             ↓
           Pages
```

---

# 13. Metadata Store / System Catalog

Now here's a component beginners often overlook.

The database needs information **about the database itself**.

For example:

```text
What tables exist?
What columns exist?
What are their data types?
Which indexes exist?
What constraints exist?
How many rows approximately exist?
What statistics are available?
Who owns this table?
```

That's **metadata**.

Conceptually:

```text
System Catalog
      │
 ┌────┼─────────┐
 ↓    ↓         ↓
Tables Indexes Constraints
      │
      ↓
 Statistics
```

PostgreSQL has a large collection of system catalog tables that store metadata about databases, tables, columns, indexes, constraints, etc. ([PostgreSQL][5])

And the optimizer uses metadata/statistics when making planning decisions.

---

# 14. Transaction Manager — "Keep operations correct"

Now move from **reading** to **writing**.

Imagine:

```text
Transfer ₹1,000
```

You need:

```text
Account A: -1000
Account B: +1000
```

You don't want:

```text
A: -1000
B: ❌ transaction failed
```

That's where **transactions** come in.

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;
```

Or:

```text
ROLLBACK
```

if something fails.

---

# 15. ACID

Transaction management is strongly connected to **ACID**.

### A — Atomicity

All or nothing.

```text
A succeeds
B succeeds

OR

A fails
B rolled back
```

### C — Consistency

The database moves from one valid state to another valid state, respecting its constraints/invariants.

### I — Isolation

Concurrent transactions shouldn't improperly interfere with each other.

### D — Durability

Once committed, the database should be able to recover the committed result after a crash.

And **WAL is a major part of how many databases achieve durability/recovery**.

---

# 16. Lock Manager

Now imagine two users modify the same data:

```text
Transaction A
       ↓
Account balance

Transaction B
       ↓
Account balance
```

You need concurrency control.

One mechanism is **locks**.

Conceptually:

```text
Transaction A
     ↓
  🔒 Row
     ↓
Modify
     ↓
 COMMIT
     ↓
  🔓

Transaction B
     ↓
 waits
```

There can be different lock modes, such as:

```text
Shared lock
Exclusive lock
```

But modern databases may also use **MVCC**, not just traditional locking.

---

# 17. MVCC

**MVCC = Multi-Version Concurrency Control**

Instead of making every reader wait for every writer, the database can maintain multiple versions of data.

Conceptually:

```text
Row versions

Version 1
Version 2
Version 3
```

A transaction sees the version appropriate to its isolation/snapshot rules.

PostgreSQL is a well-known example of an MVCC-based system. PostgreSQL's internals also include background processes such as autovacuum that help reclaim obsolete row versions. ([Ajit Singh - Software Engineering Blog][6])

So remember:

```text
Concurrency Control
       │
       ├── Locks
       │
       └── MVCC
```

They're related but not the same mechanism.

---

# 18. Isolation Levels

Isolation answers:

> **"If many transactions execute at the same time, what changes are each transaction allowed to see?"**

Common SQL isolation levels:

```text
READ UNCOMMITTED
READ COMMITTED
REPEATABLE READ
SERIALIZABLE
```

Higher isolation generally gives stronger guarantees but can increase contention or reduce concurrency, depending on the implementation.

---

# 19. Write-Ahead Log — WAL

This is one of the most important concepts.

Imagine the DB changes:

```text
Balance = ₹1000
       ↓
Balance = ₹500
```

The database shouldn't blindly write the data page first and hope nothing goes wrong.

Instead, the basic WAL idea is:

> **Record the change in the log before the corresponding data change is considered safely persisted.**

Conceptually:

```text
Transaction
    ↓
WAL
    ↓
Data Pages
```

If the machine crashes:

```text
Transaction
    ↓
WAL ✓
    ↓
💥 CRASH
```

When the database restarts:

```text
WAL
 ↓
Recovery
 ↓
Reconstruct/reapply necessary changes
```

PostgreSQL documents WAL as its write-ahead logging mechanism for crash recovery; WAL records are appended to WAL files and identified by LSNs. ([PostgreSQL][7])

---

# 20. Why WAL is called "Write-Ahead"

Because:

```text
LOG FIRST
   ↓
DATA LATER
```

Not:

```text
DATA FIRST
   ↓
LOG LATER
```

The log must get ahead of the data page write for the relevant durability/recovery guarantees.

---

# 21. Recovery Manager

What if:

```text
Database
   ↓
Transaction running
   ↓
💥 Power failure
```

Recovery manager comes into play.

It uses mechanisms such as:

```text
WAL / logs
Checkpoints
Recovery algorithms
```

to bring the database back to a consistent state.

So:

```text
Transaction
     ↓
   WAL
     ↓
Database Pages
     ↓
      💥
     ↓
Recovery Manager
     ↓
Read WAL / recovery information
     ↓
Recover
```

---

# 22. Checkpoints

If the database has been running for days, the WAL could contain a huge amount of history.

A **checkpoint** gives recovery a useful point of reference.

Conceptually:

```text
WAL
│
├── changes
├── changes
├── changes
│
├── CHECKPOINT
│
├── changes
├── changes
└── changes
```

After a crash, the DB doesn't necessarily need to replay the entire history from the beginning.

The exact checkpoint/recovery behavior is database-specific.

---

# 23. Put everything together

Now you can see the complete story.

### SELECT

```text
User
 │
 │ SELECT ...
 ▼
Parser
 │
 ▼
Rewriter
 │
 ▼
Optimizer
 │
 │ uses metadata/statistics
 ▼
Execution Plan
 │
 ▼
Execution Engine
 │
 ▼
Buffer Manager
 │
 ├── Page already in RAM?
 │        │
 │        ├── YES → use page
 │        │
 │        └── NO → disk → load page
 │
 ▼
Storage Engine
 │
 ├── Table
 ├── Index
 └── Pages
 │
 ▼
Result
```

This matches the broad architecture described in PostgreSQL's internals documentation. ([PostgreSQL][2])

---

# 24. INSERT / UPDATE story

Now:

```sql
UPDATE users
SET age = 30
WHERE id = 10;
```

Conceptually:

```text
Client
  ↓
Parser
  ↓
Optimizer
  ↓
Executor
  ↓
Transaction Manager
  ↓
Lock / MVCC
  ↓
Buffer Pool
  ↓
Modify Page in Memory
  ↓
WAL
  ↓
Commit
  ↓
Eventually flush data page
```

The exact ordering and implementation details differ across database engines, so don't treat this as a literal PostgreSQL/MySQL instruction sequence.

---

# 25. Crash story

This is where all the components suddenly make sense.

Imagine:

```text
UPDATE account
SET balance = 500;
```

The database has:

```text
Buffer Pool
     ↓
Modified Page
```

and:

```text
WAL
 ↓
Change record
```

Then:

```text
💥 SERVER CRASH
```

On restart:

```text
Database starts
      ↓
Recovery Manager
      ↓
Read WAL
      ↓
Determine required recovery
      ↓
Recover database
      ↓
Database becomes usable
```

That's why **WAL + transaction manager + recovery manager** are connected.

---

# 26. The complete architecture you should memorize

Don't memorize 30 disconnected definitions.

Memorize this:

```text
                    APPLICATION
                         │
                         ▼
                  ┌─────────────┐
                  │ SQL Interface│
                  └──────┬──────┘
                         ▼
                  ┌─────────────┐
                  │   PARSER    │
                  └──────┬──────┘
                         ▼
                  ┌─────────────┐
                  │   REWRITER  │
                  └──────┬──────┘
                         ▼
              ┌─────────────────────┐
              │ QUERY OPTIMIZER     │
              │                     │
              │ Statistics          │
              │ Cost Model          │
              │ Indexes             │
              │ Join Order          │
              │ Access Methods      │
              └──────────┬──────────┘
                         ▼
                  EXECUTION PLAN
                         │
                         ▼
                  ┌─────────────┐
                  │  EXECUTOR   │
                  └──────┬──────┘
                         │
             ┌───────────┴──────────┐
             ▼                      ▼
      ┌─────────────┐        ┌──────────────┐
      │ BUFFER POOL │        │ TRANSACTION  │
      │             │        │   MANAGER    │
      │ Page Cache  │        │              │
      └──────┬──────┘        │ Locks/MVCC   │
             │               │ Isolation    │
             ▼               └──────┬───────┘
      ┌─────────────┐                │
      │   STORAGE   │                │
      │    ENGINE   │                │
      │             │                │
      │ Tables      │                │
      │ Indexes     │                │
      │ Pages       │                │
      └──────┬──────┘                │
             │                       │
             ▼                       ▼
           DISK                    WAL
                                     │
                                     ▼
                                RECOVERY
                                     │
                                     ▼
                              Crash Recovery

       SYSTEM CATALOG / METADATA
                │
                ├── Parser
                ├── Optimizer
                ├── Executor
                └── Storage
```

This is very close to the architecture used in database-internals literature: query processor, execution engine, transaction/lock manager, access methods, buffer manager, and recovery manager. ([CDK EnTest][8])

---

# 27. One example tying everything together

Suppose you run:

```sql
SELECT name
FROM users
WHERE email = 'noor@gmail.com';
```

### Step 1 — Parser

```text
"Is this valid SQL?"
```

### Step 2 — Metadata

```text
Does users exist?
Does email exist?
What is its type?
```

### Step 3 — Optimizer

It sees:

```text
users = 50 million rows

email index = exists
```

So it may choose:

```text
Index Scan
```

instead of:

```text
Full Table Scan
```

### Step 4 — Executor

Executor says:

```text
Use email index
```

### Step 5 — Buffer Pool

It asks:

```text
Is the required index page in RAM?
```

If yes:

```text
RAM → page
```

If no:

```text
Disk → RAM → page
```

### Step 6 — Storage Engine

It accesses:

```text
Index
 ↓
Find matching row location
 ↓
Table page
 ↓
Row
```

### Step 7 — Result

```text
Noor
```

comes back to your application.

**That entire journey is what "database internals" means.**

---

# 28. What you should study next

Since you want **Database Architecture and Design**, I would follow this order:

```text
1. Pages / Blocks
       ↓
2. Buffer Pool
       ↓
3. Heap Files / Table Storage
       ↓
4. B+ Tree Index
       ↓
5. Hash Index
       ↓
6. Query Parser
       ↓
7. Query Optimizer
       ↓
8. Execution Engine
       ↓
9. Transactions
       ↓
10. Locks
       ↓
11. MVCC
       ↓
12. Isolation Levels
       ↓
13. WAL
       ↓
14. Checkpoints
       ↓
15. Crash Recovery
       ↓
16. Replication
       ↓
17. Partitioning
       ↓
18. Sharding
       ↓
19. Distributed Databases
```

That sequence will make the later topics much easier.

---

# Best resources I recommend

### 🥇 1. CMU 15-445/645 — Database Systems

This is probably the **best resource for what you're asking for**. It goes into storage managers, indexes, query processing, optimization, transactions, concurrency control, recovery, and distributed/parallel databases. ([CMU CS Department][1])

[CMU 15-445 Database Systems](https://csd.cmu.edu/course/15445/s26?utm_source=chatgpt.com)

### 🥈 2. PostgreSQL Internals — Official Documentation

Excellent for seeing how a **real production DBMS** implements these ideas. It has dedicated sections for query processing, planner/optimizer, executor, and system catalogs. ([PostgreSQL][5])

[PostgreSQL Internals Documentation](https://www.postgresql.org/docs/18/internals.html?utm_source=chatgpt.com)

### 🥉 3. Database Internals — Alex Petrov

This is especially relevant to the exact topics you're asking about: storage engines, pages, indexes, buffer management, transactions, concurrency, and distributed databases.

[Database Internals — Alex Petrov](https://www.oreilly.com/library/view/database-internals/9781492040330/?utm_source=chatgpt.com)

### 4. Practical PostgreSQL internals article

This newer article gives a readable overview of **storage + MVCC + query planning + WAL**, which is a nice bridge between theory and a real DBMS. ([Let's Build Solutions][9])

[How PostgreSQL Works Internally](https://letsbuildsolutions.com/blog/system-design/how-postgresql-works-internally-storage-mvcc-query-planning-and-the-wal/?utm_source=chatgpt.com)

---

## The key mental model

If you remember only one thing:

> **Query Processor decides what you asked. Optimizer decides how to do it. Executor does it. Storage Engine finds/stores the data. Buffer Pool keeps frequently needed pages in RAM. Transaction Manager keeps concurrent operations correct. WAL makes recovery/durability possible. Metadata tells the DB what exists and helps the optimizer make decisions.**

Once this story is clear, **indexes, B+ trees, transactions, locks, MVCC, WAL, replication, sharding, and query optimization stop looking like separate topics**—they become different pieces of the same machine.

[1]: https://csd.cs.cmu.edu/course/15445/s26?utm_source=chatgpt.com "Database Systems | Carnegie Mellon University Computer Science Department"
[2]: https://www.postgresql.org/docs/18/overview.html?utm_source=chatgpt.com "PostgreSQL: Documentation: 18: Chapter 51. Overview of PostgreSQL Internals"
[3]: https://15445.courses.cs.cmu.edu/spring2025/project1/?utm_source=chatgpt.com "Project #1 - Buffer Pool Manager | CMU 15-445/645 :: Intro to Database Systems (Spring 2025)"
[4]: https://www.postgresql.org/files/documentation/pdf/8.1/postgresql-8.1-A4.pdf?utm_source=chatgpt.com "Chapter 41. Overview of PostgreSQL Internals"
[5]: https://www.postgresql.org/docs/18/internals.html?utm_source=chatgpt.com "PostgreSQL: Documentation: 18: Part VII. Internals"
[6]: https://singhajit.com/postgresql-internals-how-queries-execute/?utm_source=chatgpt.com "PostgreSQL Internals: How Queries Actually Execute - Ajit Singh"
[7]: https://www.postgresql.org/docs/15/wal-internals.html?utm_source=chatgpt.com "PostgreSQL: Documentation: 15: 30.6. WAL Internals"
[8]: https://d2cvlmmg8c0xrp.cloudfront.net/book/database-internals.pdf?utm_source=chatgpt.com "Database Internals"
[9]: https://letsbuildsolutions.com/blog/system-design/how-postgresql-works-internally-storage-mvcc-query-planning-and-the-wal/?utm_source=chatgpt.com "How PostgreSQL Works Internally: Storage, MVCC, Query Planning, and the WAL — Let's Build"
