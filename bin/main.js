const fs = require("fs");
const args = process.argv.slice(2, process.argv.length);
const child_process = require("child_process");
const inputFormat = args[0] === undefined ? "png" : args[0];
const outputFormat = args[1] === undefined ? "webp" : args[1];

const convertFfmpeg = (file_name) => {
    child_process
        .exec(`ffmpeg -i ${file_name}.${inputFormat} ${file_name}.${outputFormat}`, (err) => {
            if (err) throw err;
            console.log(`${file_name} foi convertido com sucesso para ${outputFormat}`);
        })

};

fs.readdir(".", (err, data) => {
    if (err) throw err;
    data.forEach((file) => {
        const arr_file = file.split(".");
        if (arr_file.length > 1 && arr_file[arr_file.length - 1] === inputFormat)
            convertFfmpeg(arr_file[0]);
    });
});
