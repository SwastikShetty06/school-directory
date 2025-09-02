// app/api/schools/route.js
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

// Handler for GET requests to fetch all schools
export async function GET(request) {
  try {
    const schools = await query({
      query: "SELECT * FROM schools",
      values: [],
    });

    return NextResponse.json({ schools: schools });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

// Handler for POST requests to add a new school
export async function POST(request) {
  try {
    const { name, address, city, state, contact, image, email_id } = await request.json();

    // Basic validation
    if (!name || !address || !city || !state) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const addSchool = await query({
      query: "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      values: [name, address, city, state, contact, image, email_id],
    });

    const result = addSchool;
    const message = result.affectedRows ? "School added successfully" : "Error adding school";
    const schoolId = result.insertId;

    return NextResponse.json({ message: message, schoolId: schoolId }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
