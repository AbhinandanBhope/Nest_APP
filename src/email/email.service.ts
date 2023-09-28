// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
        host: process.env.DATABASE_HOST,
        port: 1025,
        ignoreTLS: true,
        secure: false,
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_NO_REPLY,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(email,pass) {
    const mailOptions = {
      from: process.env.GMAIL_NO_REPLY,
      to:email,
      
      text: pass
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
