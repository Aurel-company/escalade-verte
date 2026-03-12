import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  sujet: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("N8N_CONTACT_WEBHOOK_URL not configured — contact not forwarded");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
