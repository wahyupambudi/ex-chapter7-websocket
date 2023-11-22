const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Insert(req, res) {
  const { name, email, phoneNumber, role } = req.body;

  const payload = {
    name,
    email,
    phoneNumber,
    role,
  };

  try {
    await prisma.User.create({
      data: payload,
    });

    let respons = ResponseTemplate(null, "created success", null, 200);
    res.status(200).json(respons);
    return;
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.json(resp);
    return;
  }
}

module.exports = { Insert };
