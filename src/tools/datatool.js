const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'szhmaqd18';
/**
 * 抽取的用来获取数据库集合的方法
 */
const getCollection = (collectionName,callback)=>{
    // 连接数据库
    MongoClient.connect(url, {useNewUrlParser: true},function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        callback(client,collection);
    })
}
// 暴露注册数据
/**
  * 暴露出去的一个通用的插入一条文档的方法，这个方法是给所有控制器用的
  * 
  * 参数1：要操作的集合名称
  * 参数2：要操作的数据
  * 参数3：回调函数，通过回调函数，把操作数据库的结果(成功或是失败)传递给调用它的控制器
  */
exports.insetOne = (collectionName,params,callback) => {
    getCollection(collectionName,(client,collection)=>{
        collection.insertOne(params,(err,result)=>{
            // 关闭数据库
            client.close();
            callback(err,result);
        })
    })
}
/**
  * 暴露出去通用的查询数据库的方法给路由调用
  */
 exports.findOne = (collectionName,params,callback) => {
    getCollection(collectionName,(client,collection)=>{
        // 新增数据
        collection.findOne(params,(err,doc)=>{
            // 关闭数据库
            client.close();
            callback(err,doc);
        })
    })
}
/**
  * 暴露出去查询所有数据库的方法给路由调用
  */
 exports.findList = (collectionName,params,callback) => {
    getCollection(collectionName,(client,collection)=>{
        collection.find(params).toArray((err,docs)=>{
            client.close();
            callback(err,docs);
        }) 
    })
}