
class AutoComplete{
    constructor(input,values){
        this.currentFocus = -1;
        this.values = values;
        this.input = input;
        this.selected = -1;
    }
    async complete(e){
        const input = e.target;
        let a, b, i, val = input.value;
        /*close any already open lists of autocompleted values*/
        this.closeAllLists();
        if (!val) { return false;}
        this.currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", input.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        e.target.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < this.values.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (this.values[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = this.values[i].substr(0, val.length);
                b.innerHTML += this.values[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + this.values[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener('click',this.clickListener.bind(this));
                a.appendChild(b);
            }
        }
    }
    keyDownListener(e){
        let x = document.getElementById(e.target.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            this.currentFocus++;
            /*and and make the current item more visible:*/
            this.addActive(x);
        } else if (e.keyCode === 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            this.currentFocus--;
            /*and and make the current item more visible:*/
            this.addActive(x);
        } else if (e.keyCode === 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (this.currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[this.currentFocus].click();
                this.selected = this.input.value;
            }
        }
    }
    clickListener(e){
        /*insert the value for the autocomplete text field:*/
        this.input.value = e.target.getElementsByTagName("input")[0].value;
        /*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
        this.selected = this.input.value;
        this.closeAllLists();
    }
    addActive(autoCompleteItems){
        console.log(autoCompleteItems);
        /*a function to classify an item as "active":*/
        if (!autoCompleteItems) return false;
        /*start by removing the "active" class on all items:*/
        this.removeActive(autoCompleteItems);
        if (this.currentFocus >= autoCompleteItems.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (autoCompleteItems.length - 1);
        /*add class "autocomplete-active":*/
        autoCompleteItems[this.currentFocus].classList.add("autocomplete-active");
    }
    removeActive(autoCompleteItems){
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < autoCompleteItems.length; i++) {
            autoCompleteItems[i].classList.remove("autocomplete-active");
        }
    }
    closeAllLists(element) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let autoCompleteItems = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < autoCompleteItems.length; i++) {
            if (element !== autoCompleteItems[i] && element !== this.input) {
                autoCompleteItems[i].parentNode.removeChild(autoCompleteItems[i]);
            }
        }
    }
}