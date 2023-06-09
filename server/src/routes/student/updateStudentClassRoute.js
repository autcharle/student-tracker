const StudentModel = require("../../models/studentModel");
const ClassModel = require("../../models/classModel");
const RuleModel = require("../../models/ruleModel");

module.exports = async (req, res) => {
  const { studentID, classID } = req.body;
  const findClass = await ClassModel.find({ classID: classID });
  const findStudent = await StudentModel.find({ studentID: studentID });
  if (findClass.length == 0 || findStudent.length == 0) {
    res.status(409).send("Class or student not exist");
  } else {
    const countStudent = await StudentModel.countDocuments({
      classID: classID,
    });
    const rule = await RuleModel.findById("6458926d3fe38e9a11b38ca3");
    if (countStudent > rule.maxClassAttendant) {
      res.status(409).send("Class is more than allowed");
    } else {
      findStudent[0].classID = classID;
      await findStudent[0].save();
      res.json(findStudent[0]);
    }
  }
};
