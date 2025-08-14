import nodemailer from 'nodemailer'
import type { Options as MailOptions } from 'nodemailer/lib/mailer'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default defineEventHandler(async (event) => {
  try {
    // Parse request body
    const body = await readBody<ContactFormData>(event)

    // Validate required fields
    if (!body || !body.name || !body.email || !body.message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'All fields are required'
      })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email address'
      })
    }

    // Sanitize input to prevent XSS
    const sanitizedData = {
      name: body.name.trim().substring(0, 100),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim().substring(0, 5000)
    }

    // Get environment variables
    const emailConfig = {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    }

    // Check if email credentials are configured
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      console.error('Email credentials not configured')
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service is not configured. Please contact administrator.'
      })
    }

    // Create transporter
    const transporter = nodemailer.createTransport(emailConfig)

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('Email configuration error:', verifyError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service configuration error'
      })
    }

    // Prepare email content
    const mailOptions: MailOptions = {
      from: process.env.EMAIL_FROM || `"TTRPG Database" <${emailConfig.auth.user}>`,
      to: process.env.EMAIL_TO || emailConfig.auth.user,
      replyTo: sanitizedData.email,
      subject: `Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1e293b; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #475569; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0; }
              .message { white-space: pre-wrap; word-wrap: break-word; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">TTRPG Database Help Request</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${sanitizedData.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value message">${sanitizedData.message}</div>
                </div>
                <div class="footer">
                  <p>This message was sent from the TTRPG Database contact form.</p>
                  <p>Timestamp: ${new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Contact Form Submission

        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}

        Message:
        ${sanitizedData.message}

        ---
        Sent from TTRPG Database contact form
        Timestamp: ${new Date().toLocaleString()}
      `
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    // Return success response
    return {
      success: true,
      message: 'Your message has been sent successfully!',
      messageId: info.messageId
    }
  } catch (error) {
    // Handle errors
    console.error('Contact form error:', error)
    // If it's already a createError, throw it as is
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    // Otherwise, throw a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message. Please try again later.'
    })
  }
})
