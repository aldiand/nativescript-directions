import { SnackBar, SnackBarOptions } from "nativescript-snackbar";

export function showSnackbar(text) {
    var snacbar = new SnackBar();
          snacbar
            .simple(text)
            .then(args => {
              console.log("SnackBar.simple() result", args);
              this.set("jsonResult", JSON.stringify(args));
            })
            .catch(error => {
              console.log("simple snackbar error", error);
            });
}