# WhatsApp Web Client with QR Authentication and Email Notifications

This project is an Express-based application that integrates WhatsApp Web's client for sending messages and handling events such as QR code generation, authentication failures, and disconnections. It uses whatsapp-web.js and qrcode for WhatsApp Web integration and QR generation, and Nodemailer for sending email notifications.

## Features

- WhatsApp Web Client: Automatically authenticates using a QR code sent via email.
- Email Notifications: Sends email alerts for QR code generation, successful connection, disconnection, and authentication failures.
- Send WhatsApp Messages: Includes an API endpoint to send WhatsApp messages programmatically.
- Docker Support: Easily run the project in a containerized environment.

## Prerequisites

- Node.js (version 14 or above)
- npm or yarn for package management
- Docker (optional but recommended for containerized execution)
- A Gmail account for sending email notifications
- WhatsApp Web account for messaging

## Environment Configuration

Create a .env file in the root of the project and fill it with the following example variables:

    # Application

    PORT=3000

    # Email (using Gmail SMTP)

    GMAIL_USER=your-email@gmail.com
    GMAIL_PASS=your-gmail-app-password
    RECEIVER_EMAIL=recipient-email@gmail.com

    # Base URL for serving images (change to production URL when deploying)

    BASE_URL=http://localhost:3000

## Usage

1. WhatsApp Web QR Authentication

Upon starting the app, the application will generate a WhatsApp Web QR code, which will be sent to the configured email for scanning. Simply scan the QR code with the WhatsApp mobile app to authenticate the session. 2. Send WhatsApp Messages

You can send WhatsApp messages through the following API endpoint:

GET http://localhost:3000/whatsapp/send-message?number=<whatsapp-number>&message=<your-message>

Parameters:

    number: WhatsApp phone number (without + or 00, e.g., 521XXXXXXXXXX)
    message: The message to send

3. Events

The application will send email notifications for the following events:

- QR Code Generated: A QR code will be emailed to scan for authentication.
- WhatsApp Ready: The application successfully starts a WhatsApp session.
- Authentication Failure: If the authentication fails, an error message will be emailed.
- Disconnected: If the client is disconnected, an email notification will be sent.
