
import UserModel from "../../../../DB/model/user.model.js";


//------------------------------------------------------------------
export const getSpecificPatient = async (req, res, next) => {
  const { id } = req.params;
  const p = await UserModel.findByPk(id);
  if (p) {
    return res.json({ message: "success", p });
  }
  return res.json({ message: "patient not found" });
};
//------------------------------------------------------------
