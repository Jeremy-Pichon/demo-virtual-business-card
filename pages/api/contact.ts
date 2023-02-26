// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer  from 'nodemailer'

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
})

type RequestData = {
  name: string
  email: string
  company: string
  content: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<void>
): Promise<void> => {
  const request = req.body as RequestData;

  const mailData = {
    from: request.email,
    to: process.env.SMTP_EMAIL,
    subject: `[Business Card] Message From ${request.name}`,
    text: `${request.name} (${request.email}) from ${request.company} would like to be in touch with you.\nCustom message: ${request.content}.`,
    html: `<div>${request.name} (${request.email}) from ${request.company} would like to be in touch with you.</div><div>Custom message: ${request.content}.</div>`
  }

  try {
    await transporter.sendMail(mailData)
    res.status(204).json()
  } catch (error) {
    console.error(error)
    res.status(500).json()
  }

}

export default handler;
