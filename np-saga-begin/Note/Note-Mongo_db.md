# Mongo DB
## Description
- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở thuộc họ NoSQL. Nó được thiết kế theo kiểu hướng đối tượng, các bảng trong MongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ trên bảng không cần tuân theo một cấu trúc nhất định nào cả (điều này rất thích hợp để làm big data).

- MongoDB lưu trữ dữ liệu theo hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON nên truy vấn sẽ rất nhanh.

## Các khái niệm
- Database là gì?
Database là một Ô chứa dữ liệu ở mức vật lý (physical), mỗi database sẽ có nhiều collection và được thiết lập lưu trữ ở một nơi trong máy chủ máy tính. Một máy chủ MongoDB thường có thể tạo nhiều cơ sở dữ liệu.

- Collection là gì?
Collection trong MongoDB là nhóm các tài liệu (document), nó tương đương với một bảng (table) trong CSDL thông thường nên mỗi collection sẽ thuộc về một database duy nhất. Tuy nhiên nó có một sực khác biệt đó là nó không có ràng buộc Relationship như các hệ quản trị CSDL khác nên việc truy xuất rất nhanh, chính vì thế mỗi collection có thể chứa nhiều thể loại khác nhau không giống như table trong hệ quản trị mysql là các field cố định.

Document là gì?
Document trong MongoDB có cấu trúc tương tự như kiểu dữ liệu JSON, nghĩa là sẽ có các cặp (key => giá trị) nên nó có tính năng động rất lớn. Document ta có thể hiểu nó giống như các record dữ liệu trong MYSQL, tuy nhiên nó có sự khác biệt là các cặp (key => value) có thể không giống nhau ở mỗi document. 

## So sánh SQL_DB MongoDB
SQL_DB		| MongoDB
-----------------------------------------
Database 	| Database
Table		| Collection
Row			| Document
Column		| Field
Joins		| Embeded documents, linking
Primary key	| Primary key

## Cấu hình MongoDB
-- Tạo file mongod.cfg
systemLog:
   destination: file
   path: E:\mongodb4\data\log\mongodb.log
   logAppend: true
storage:
    dbPath: E:\mongodb4\data\db
net:
   bindIp: 127.0.0.1
   port: 27017

-- CMD
// 	Config Environment Variable
//  Then
>mongod.exe -f ..\mongod.cfg
>mongo			// Run mongo
>use [db_name] 	// Use db
>db.shutdownServer()

* Start MongoDB
>sudo service mongodb start
* Stop MongoDB
>sudo service mongodb stop
* Restart MongoDB
>sudo service mongodb restart
* To use MongoDB run the following command.
>mongo
* MongoDB Statistics
db.stats()
* Help
db.help()

## Tạo database MongoDB trên mongolab.com
https://freetuts.net/hoc-mongodb-online-voi-mongolab-com-va-robomongo-330.html

## RDBMS vs MongoDB
	+ RDBMS: [RDBMS](./RDBMS.png)
	+ MongoDB:
<script type="text/javascript">
{
	_id: POST_ID
	title: TITLE_OF_POST, 
	description: POST_DESCRIPTION,
	by: POST_BY,
	url: URL_OF_POST,
	tags: [TAG1, TAG2, TAG3],
	likes: TOTAL_LIKES, 
	comments: [    
	  {
	     user:'COMMENT_BY',
	     message: TEXT,
	     dateCreated: DATE_TIME,
	     like: LIKES 
	  },
	  {
	     user:'COMMENT_BY',
	     message: TEXT,
	     dateCreated: DATE_TIME,
	     like: LIKES
	  }
	]
}
</script>

## Database
-- The command will create a new database if it doesn't exist, otherwise it will return the existing database.
>use DATABASE_NAME
-- Kiểm tra csdl hiện tại
>db
-- Kiểm tra danh sách db
>show dbs
-- Drop Database
>use mydb
>db.dropDatabase()
## Collection
-- Create
db.createCollection(name, options)
-- VD Create collection
>use test
>db.createCollection("mycollection")
>db.createCollection("mycol", { capped:true, autoIndexId:true, size:6142800, max:10000 } )
-- MongoDB sẽ tự tạo collection nếu insert document
>db.tutorialspoint.insert({"name" : "tutorialspoint"})
-- Drop collection
db.COLLECTION_NAME.drop()
-- VD drop collection
>use mydb
>show collections
>db.mycollection.drop()

## Datatypes
String − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.
Integer − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.
Boolean − This type is used to store a boolean (true/ false) value.
Double − This type is used to store floating point values.
Min/ Max keys − This type is used to compare a value against the lowest and highest BSON elements.
Arrays − This type is used to store arrays or list or multiple values into one key.
Timestamp − ctimestamp. This can be handy for recording when a document has been modified or added.
Object − This datatype is used for embedded documents.
Null − This type is used to store a Null value.
Symbol − This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.
Date − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.
Object ID − This datatype is used to store the document’s ID.
Binary data − This datatype is used to store binary data.
Code − This datatype is used to store JavaScript code into the document.
Regular expression − This datatype is used to store regular expression.

## Insert
	Để insert có thể dùng  insert() or save()
	If we don't specify the _id parameter, then MongoDB assigns a unique ObjectId for this document
<script type="text/javascript">
>db.COLLECTION_NAME.insert(document)
>db.mycol.insert({
   _id: ObjectId(7df78ad8902c),
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
})
</script>

## Query
-- Find
>db.COLLECTION_NAME.find()
-- Query với kết quả đã được format
>db.mycol.find().pretty()
-- FindOne
>db.COLLECTION_NAME.findOne()

### WHERE trong mongodb
Operation			Syntax					Example										RDBMS Equivalent
Equality			{<key>:<value>}			db.mycol.find({"by":"tutorials"}).pretty()	where by = 'tutorials'
Less Than			{<key>:{$lt:<value>}}	db.mycol.find({"likes":{$lt:50}}).pretty()	where likes < 50
Less Than Equals	{<key>:{$lte:<value>}}	db.mycol.find({"likes":{$lte:50}}).pretty()	where likes <= 50
Greater Than		{<key>:{$gt:<value>}}	db.mycol.find({"likes":{$gt:50}}).pretty()	where likes > 50
Greater Than Equals	{<key>:{$gte:<value>}}	db.mycol.find({"likes":{$gte:50}}).pretty()	where likes >= 50
Not Equals			{<key>:{$ne:<value>}}	db.mycol.find({"likes":{$ne:50}}).pretty()	where likes != 50
### AND trong mongodb
>db.mycol.find(
   {
      $and: [{key1: value1}, {key2:value2}]
   }
).pretty()
### OR trong mongodb
>db.mycol.find(
   {
      $or: [{key1: value1}, {key2:value2}]
   }
).pretty()
### Dùng AND cùng vs OR
-- SQL
where likes>10 AND (by = 'tutorials point' OR title = 'MongoDB Overview')
-- MongoDB
>db.mycol.find({"likes": {$gt:10}, $or: [{"by": "tutorials point"},{"title": "MongoDB Overview"}]}).pretty()
### UPDATE
>db.COLLECTION_NAME.update(SELECTION_CRITERIA, UPDATED_DATA)
-- VD :  Mặc định, mongo sẽ update 1 document
>db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})
>db.mycol.find()
-- update nhiều documents
>db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}},{multi:true})
-- Ngoài ra còn updateOne(), updateMany()

-- Dùng save để thay thế document cũ = document mới

<script type="text/javascript">
>db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})
>db.mycol.save(
   {"_id" : ObjectId(5983548781331adf45ec5), "title":"Tutorials Point New Topic","by":"Tutorials Point"}
)
</script>
###Delete Document
	remove nhận 2 parameters: deletion criteria - tiêu chí xóa, justOne - nếu được set là true | 1 => chỉ xóa 1 document
>db.COLLECTION_NAME.remove(DELLETION_CRITTERIA,justOne)
-- VD
>db.mycol.remove({'title':'MongoDB Overview'})
-- TRUNCATE
>db.mycol.remove()
### Projection - Chọn các cột được hiển thị
	Mặc định thì nó sẽ lấy cả _id, để không hiển thị _id => thêm _id: 0 vào object.
	Nếu đã set 1 thì không được set 0, ngoại trừ _id

>db.collectionName.find(objectwhere,objectselect)
-- cột KEY sẽ được hiển thị, còn lại = 0 =>0 hiển thị
>db.COLLECTION_NAME.find({},{KEY:1})
### Limit Records
>db.COLLECTION_NAME.find().limit(NUMBER)

<script type="text/javascript">
>db.mycol.find({},{"title":1,_id:0}).limit(2)
</script>
-- Ngoài ra còn Skip - cho phép bỏ qua các bản ghi đầu
>db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)

<script type="text/javascript">
>db.mycol.find({},{"title":1,_id:0}).limit(1).skip(1)
</script>
### Sort Records
-- KEY thuộc {1,-1} : {ASC, DESC}
>db.COLLECTION_NAME.find().sort({KEY:1})

<script type="text/javascript">
>db.mycol.find({},{"title":1,_id:0}).sort({"title":-1})
</script>
### Indexing
-- Chỉ mục giúp truy vấn hiệu quả hơn
-- KEY được set {1,-1} => {ASC,DESC}.

>db.COLLECTION_NAME.ensureIndex({KEY:1})
>db.mycol.ensureIndex({"title":1})
>db.mycol.ensureIndex({"title":1,"description":-1})

### Aggregation - Tập hợp

<script type="text/javascript">
-- select by_user, count(*) from mycol group by by_user
> db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
</script>

-- Danh sách cá biểu thức Aggregation
<script type="text/javascript">
Biểu thức	Miêu tả						Ví dụ
$sum	Sum giá trị Document trong Collection đó	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])
$avg	AVG giá trị Document trong Collection đó	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])
$min	Lấy min từ Document trong Collection đó	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])
$max	Lấy max từ Document trong Collection đó	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])
$push	Chèn giá trị vào trong một mảng trong Document kết quả	db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])
$addToSet	Chèn giá trị tới một mảng trong Document kết quả, nhưng không tạo các bản sao	db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
$first	Lấy Document đầu tiên từ Source Document theo nhóm	db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
$last	Lấy Document cuối cùng từ Source Document theo nhóm	db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])
</script>

-- Pipeline
$project: Được sử dụng để chọn một số trường cụ thể từ một Collection.
$match: Đây là một hoạt động lọc và vì thế nó có thể giảm số Document mà được cung cấp như là input cho giai đoạn kế tiếp.
$group: Thực hiện Aggregation thực sự, như đã trình bày ở trên.
$sort: Sắp xếp các Document.
$skip: Nhảy qua số Document đã cung cấp.
$limit: Giới hạn số Document.
$unwind: Chia một Document đang sử dụng mảng thành nhiều Document. Sử dụng hoạt động này sẽ tạo một số lượng Document cho bước tiếp theo.

## Nâng cao
### Mô hình hóa Referenced Relationship
	Đây là phương pháp thiết kế Relationship tiêu chuẩn hóa. Trong phương pháp này, cả user và address document sẽ vẫn được duy trì một cách riêng rẽ, nhưng user document sẽ chứa một trường mà sẽ tham chiếu đến trường id của address document
<script type="text/javascript">
\\ user document:
{
   "_id":ObjectId("52ffc33cd85242f436000001"),
   "name": "Tom Hanks",
   "contact": "987654321",
   "dob": "01-01-1991"
}
\\ address document:
{
   "_id":ObjectId("52ffc4a5d85242602e000000"),
   "building": "22 A, Indiana Apt",
   "pincode": 123456,
   "city": "Los Angeles",
   "state": "California"
}
\\ Quan hệ 1-N (user - address)
{
   "_id":ObjectId("52ffc33cd85242f436000001"),
   "contact": "987654321",
   "dob": "01-01-1991",
   "name": "Tom Benzamin",
   "address_ids": [
      ObjectId("52ffc4a5d85242602e000000"),
      ObjectId("52ffc4a5d85242602e000001")
   ]
}
-- Tìm addresses của "Tom Benzamin"
>var result = db.users.findOne({"name":"Tom Benzamin"},{"address_ids":1})
-- $in : truy vấn trong mảng result["address_ids"]
>var addresses = db.address.find({"_id":{"$in":result["address_ids"]}})

</script>















