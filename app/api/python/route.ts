import { exec } from "child_process";
import path from "path";

export async function POST(req) {
  try {
    // Get the absolute path of your Python script
    const body = await req.json();
    // console.log("this is post request ",body);

    const title = body.title ?? "Unknown Title";
    const artist = body.artist ?? "Unknown Artist";
    const album = body.album ?? "Unknown Album";
    const inputString = `${title}+${artist}+${album}`.replace(/\s+/g, "+");
    console.log("inputString", inputString);
    const scriptPath = path.join(process.cwd(), "script.py");

    // Execute the Python script
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec(`python ${scriptPath} "${inputString}"`, (err, stdout, stderr) => {
        if (err) {
          reject({ error: "Error executing Python script", details: stderr });
        } else {
          resolve({ stdout, stderr });
        }
      });
    });

    // Return the output of the script
    return new Response(JSON.stringify({ lyrics: stdout.trim() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.error, details: error.details }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
