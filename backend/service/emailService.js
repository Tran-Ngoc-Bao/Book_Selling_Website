const nodemailer = require("nodemailer")

const sendEmail = async (req, res) => {
    // try {
        let testAccount = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        })
        const info = await transporter.sendMail({
            from: '"testAccount.user', // sender address
            to: "bachbbeo@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
    // } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    // }

}
module.exports = {sendEmail}
