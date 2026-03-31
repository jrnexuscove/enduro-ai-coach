import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

const INPUT = String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\long hill.mp4`;
const OUTPUT = String.raw`C:\Users\rigge\OneDrive\Videos\Enduro ai coach test clips\long hill_gemini.mp4`;

ffmpeg.setFfmpegPath(ffmpegStatic!);

ffmpeg(INPUT)
  .videoCodec("libx264")
  .size("1920x?")
  .videoBitrate("8000k")
  .audioCodec("copy")
  .output(OUTPUT)
  .on("end", () => console.log("done"))
  .on("error", (err) => console.error("Error:", err.message))
  .run();
