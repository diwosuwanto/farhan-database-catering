import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-static";

const contactFilePath = path.join(process.cwd(), "public/data/contact.json");
export async function GET() {
  try {
    const data =  await fs.readFile(contactFilePath, "utf-8");
    const jsonData = JSON.parse(data);
    return new Response(JSON.stringify(jsonData), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to read file" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    
    const comment = await request.json()
    console.log("1")
    const newData1 = JSON.parse(comment.jsonData);
    const newData = JSON.parse(newData1);
    const data = await fs.readFile(contactFilePath, "utf-8");
    const jsonData = JSON.parse(data);
    jsonData.push(newData);

    await fs.writeFile(contactFilePath, JSON.stringify(jsonData, null, 2));
    return new Response(JSON.stringify(newData), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to write to file" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
