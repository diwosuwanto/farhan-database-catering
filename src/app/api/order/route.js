import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-static";

const contactFilePath = path.join(process.cwd(), "public/data/order.json");
export async function GET() {
  try {
    const data = await fs.readFile(contactFilePath, "utf-8");
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
    console.log("sini1");
    const comment = await request.json();
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

export async function PATCH(request) {
  try {
    console.log("1: Received request");
    const comment = await request.json();
    console.log("2: Parsed request body", comment);

    const { id, data: newData } = comment; // Extract id and new data
    console.log("3: Extracted ID:", id);
    console.log("4: Extracted new data:", newData);

    const fileData = await fs.readFile(contactFilePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    const currentDataIndex = jsonData.findIndex((order) => order.id === id);
    if (currentDataIndex === -1) {
      console.error("Order not found with ID:", id);
      return new Response(JSON.stringify({ error: "Order not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Update the existing order data with new data
    jsonData[currentDataIndex] = { ...jsonData[currentDataIndex], ...newData };
    console.log("5: Updated order data:", jsonData[currentDataIndex]);

    await fs.writeFile(contactFilePath, JSON.stringify(jsonData, null, 2));
    console.log("6: Successfully wrote updated data to file");

    return new Response(JSON.stringify(jsonData[currentDataIndex]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(JSON.stringify({ error: "Failed to write to file" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}