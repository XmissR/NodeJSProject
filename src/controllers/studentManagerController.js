const xtpl = require('xtpl')
const path = require('path')
const datatool = require(path.join(__dirname,"../tools/datatool.js"));

/**
 * 暴露出去，查询学生列表的方法
 */
exports.getStudentListPage = (req,res) => {
    //1.获取到关键字的值
    const keyword = req.query.keyword || "";
    datatool.findList('studentsInfo',{name:{$regex:keyword}},(err,docs)=>{
        xtpl.renderFile(path.join(__dirname,"../views/list.html"),{studentList:docs,keyword},(err,content)=>{
            res.send(content);
        })
    });
}