const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    // Give other folders priority. (use numbers at the start of folder name)
    eventFiles.sort((a, b) => a > b);
    // Replaces backslashes with forward slashes.
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        // Extract function out of the files.
        const eventFunction = require(eventFile);

        await eventFunction(client, arg);
      }
    });
  }
};
