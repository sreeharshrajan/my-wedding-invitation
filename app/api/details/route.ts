import fs from 'fs';
import path from 'path';
export const revalidate = 60
 
export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  return Response.json(data);
}