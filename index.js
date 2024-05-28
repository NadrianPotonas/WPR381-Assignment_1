const SearchForMovie = require('./OMDb-api');
const p = require('prompt-sync')

const prompt = p();
const api = SearchForMovie;
const file = require("./file-system")
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let option = 0;
DisplayMenue = () => {
    rl.question("---Movie Search--- [Select an Option by typing the corresponding option number]\n1)\tSearch by Title\n2)\tLoad File Query\n3)\tValidate Text File\n4)\tExit\nOption: ", function(ans) {
        try{
            option = parseInt(ans)
        }catch{
            console.log("Please enter a valid integer number")
            DisplayMenue();
        }
        if(option < 1 || option > 4){
            console.log("Please Enter a number in the range of the possible options")
            DisplayMenue();
        }
        switch(option){
            case 1:
                rl.question("Please give the title of the movie\nTitle: ", function(title){
                    console.log("Loading...")
                    SearchForMovie.ByTitle(title)
                        .then(movieData => {
                                console.log(movieData);
                                DisplayMenue();
                            })
                        .catch(error => {
                                console.error(error);
                                DisplayMenue();
                            });;
                });
                break
            case 2:
                rl.question("Please give the directory of the file\nFile Directory: ", function(fileDirectory){
                    console.log("Loading...")
                    let n = file.getNLines(fileDirectory)
                    for (let i = 0; i < n; i++) {
                        let m = file.readNObject(fileDirectory, i)
                        SearchForMovie.ByTitle(m.Name)
                            .then(movieData => {
                                    console.log(movieData);
                                })
                            .catch(error => {
                                    console.error(error);
                                });
                    }
                });
                break;
            case 3:
                rl.question("Please give the directory of the file\nFile Directory: ", function(fileDirectory){
                    console.log("Loading...")
                    let n = file.getNLines(fileDirectory)
                    for (let i = 0; i < n; i++) {
                        let m = file.readNObject(fileDirectory, i)
                        SearchForMovie.ByTitle(m.Name)
                            .then(movieData => {
                                    if(movieData.year == m.Year && movieData.director == m.Director){
                                        console.log(`The Movie: ${m.Name} at index ${i} is Correct`)
                                    }else{
                                        console.log(`The Movie: ${m.Name} at index ${i} is not entirely correct`)
                                    }
                                })
                            .catch(error => {
                                    console.error(error);
                                });;
                    }
                });
                break
            case 4:
                rl.close();
                break
            default:
                console.log("The Option chosen does not exist")
                DisplayMenue();
                break
        }
    });
}

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});

DisplayMenue();