if (process.argv.length >= 3) {
    if (process.argv[2] == "--debug") {
        require("./app/app.js");
    } else {
        require("./app/app.js");
    }
} else {
    require("./app/app.js");
}