// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/runoob";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     db.close();
// });

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     var myobj = { name: "菜鸟教程", url: "www.runoob" };
//     dbo.collection("site").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
// });

// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017';

// MongoClient.connect( url, function(err, db){
//     if(err) throw err;
// } )

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var myobj = [
//         { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn' },
//         { name: 'Google', url: 'https://www.google.com', type: 'en' },
//         { name: 'Facebook', url: 'https://www.google.com', type: 'en' }
//     ];
//     dbo.collection("site").insertMany(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("插入的文档数量为: " + res.insertedCount);
//         db.close();
//     });
// });

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     dbo.collection("site").find({}).limit(5).toArray(function (err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });