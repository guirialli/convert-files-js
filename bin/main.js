const fs = require("fs");
const args = process.argv.slice(2, process.argv.length);
const child_process = require("child_process");
const inputFormat = args[0] === undefined ? "png" : args[0];
const outputFormat = args[1] === undefined ? "webp" : args[1];

const convertFfmpeg = (file_name) => {
    const ffmpeg = child_process.spawn("ffmpeg", [
        `-i`,
        `${file_name}.${inputFormat}`,
        `${file_name}.${outputFormat}`,
    ]);

    ffmpeg.on("close", () => {
        console.log(`${file_name} convertido com sucesso para ${outputFormat}`);
    });

    ffmpeg.on("error", (err) => { console.log(`${file_name} error ao converter para ${outputFormat}\n${err.message}\n`); });
};

fs.readdir(".", (err, data) => {
    if (err) throw err;
    data.forEach((file) => {
        const arr_file = file.split(".");
        if (arr_file.length > 1 && (arr_file[arr_file.length - 1] === inputFormat || '.' + arr_file[arr_file.length - 1] === inputFormat)) {
            if (fs.existsSync(`${arr_file[0]}.${outputFormat}`)) {
                fs.unlinkSync(`${arr_file[0]}.${outputFormat}`);
            }
            convertFfmpeg(arr_file[0]);
        }
    });
});
