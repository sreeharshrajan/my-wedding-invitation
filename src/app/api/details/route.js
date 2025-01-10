import { headers } from "next/headers";
import fs from 'fs/promises'; // Use promises for non-blocking file operations
import path from 'path';

export const revalidate = 60;

export async function GET(request) {
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'info.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    return new Response(
      JSON.stringify({ error: "Data fetch failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
