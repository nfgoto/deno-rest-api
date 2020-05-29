const file = await Deno.open("greetings.txt");
await Deno.copy(file, Deno.stdout);
file.close();
