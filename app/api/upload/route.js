import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
  }

  // Sanitize filename to prevent directory traversal
  const filename = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Store the file in the `public/schoolImages` directory
  const relativePath = join('/schoolImages', `${Date.now()}_${filename}`);
  const absolutePath = join(process.cwd(), 'public', relativePath);
  
  try {
    await writeFile(absolutePath, buffer);
    console.log(`File saved to ${absolutePath}`);
    // Return the public path to be stored in the database
    return NextResponse.json({ message: "File uploaded successfully.", path: relativePath }, { status: 201 });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ message: "Failed to save file." }, { status: 500 });
  }
}
