import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8e35b11d0571d9",
    pass: "83c31e1bb09d70",
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { nombre = "", email = "", asunto = "", mensaje = "" } = data;

    const info = await transport.sendMail({
      from: `"${nombre}" <${email}>`,
      to: "plastifer.peru20@gmail.com",
      subject: asunto,
      text: mensaje,
      html: `<p><strong>${nombre}</strong> te ha escrito:</p><p>${mensaje}</p>`,
    });

    console.log("Correo enviado:", info.messageId);

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response("Error al enviar el mensaje", { status: 500 });
  }
};
