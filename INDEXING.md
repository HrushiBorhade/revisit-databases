# Database Indexing

- Before we dive deep into how indexing works , we should understand these
  
1. How Table Data(rows) are actually stored?
2. What are types of indexing?
3. Understanding the data structure user for indexing and how it works?


## How Table Data(rows) are actually stored?

- DBMS creates Data pages(generally 8kb)
- Each Data page can store multiple tablr rows in it.
  

**Example Representation of a Data Page:**

8KB=8192 bytes
- Header
  - 96 Bytes 
  - Page no., Free space, checksum etc 
- Data Records
  - 8060 Bytes 
  - Actual Data is stored here
- Offset
  - 36 Bytes
  - Contains an array, each index of an array holds a pointer to corresponding data in the Data records.

now let's say each table row size is around 64 bytes so each data page(~8kb) would store ~125 table rows.

DBMS creates and manages data pages, as for storing 1 table data it can create multiple data pages.

These Data pages ultimately get stored on `Data Blocks` in physical memory like disks.

- What is a Data Block?
  - Data Block is the minimum amount of data that can be read/write by an I/O operation
  - It is managed by underlying storage systems like disk, Data Block can range from 4kb to 32kb(common size is 8kb).
  - So bases on the data block size, it can store one or more data pages.

_DBMS maintains the mapping of Data pages and Data Block._

DBMS has no control over Data Blocks, they can be scattered across the disk.

## Types of Indexing in RDBMS

1.Clustered Indexing
2.Non clustered Indexing

**What is Indexing?**
-  Indexing is used to increase the performance of the database query. So that data can be fetched faster.
-  Without indexing, DBMS has to iterate each and every table row to find the requested data i.e O(N)

**Which Data Structure provides better complexity than O(N)?**
- B+ Tree provides O(logN) time complexity for insertion, searching and deletion.


