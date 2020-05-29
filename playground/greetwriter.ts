const encoder = new TextEncoder();

const greeting = encoder.encode("Hi Deno, how are you today");

// Deno namespace
await Deno.writeFile("greetings.txt", greeting);
