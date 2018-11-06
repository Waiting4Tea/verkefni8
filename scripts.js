const ENTER_KEYCODE = 13;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");
    const items = document.querySelector(".items");

    text.init(form, items);
});

const text = (() => {
    let items;
    var allCkBox = [];
    var allIText = [];
    var i, j;
    var input = [];
    var rButton = [];

    function init(_form, _items) {
        items = _items;
        // variable j start at position 3 after the first three LI already be created, and to make sure everything only check once
        j = 3;
        _form.addEventListener("submit", formHandler);

        // Start by remove the checkmark on checkbox and inline stroke at li firtElementChild of ul
        var item1 = items.firstElementChild;

        // remove the checkmark
        item1.firstElementChild.checked = false;
        // Then remove the stroke at li second child
        // set value for item text and remove line-through
        item1.children[1].style.textDecoration = "none";

        // loop over first three LI
        for(i=0; i<items.children.length; i++) {
            checkAllBox(i);
            textToInput(i);
            removeButton(i);
        }
    }

    /*************************
     *
     * removeButton: use this to remove everything inside .item
     * @param i: index
     * @return nothing
     *
     ************************/
    function removeButton(i) {
        rButton[i] = items.children[i].lastElementChild;
        rButton[i].addEventListener("click", function() {
            items.children[i].style.display = "none";
        });
    }


    /*************************
     *
     * clickEnterToGet: if enter is click then text will be return from input.
     * @param i: index
     * @return nothing
     *
     ************************/
    function clickEnterToGet(i) {
        input[i].addEventListener("keypress", function(e) {
            if(e.keyCode === ENTER_KEYCODE) {
                // get input text and display it none
                var inputText = input[i].value;
                input[i].style.display = "none";

                // set input text and display it to screen
                allIText[i].innerText = inputText;
                allIText[i].style.display = "";
            }
        }, false);
    }


    /*************************
     *
     * textToInput: this function help us to make a call to every item text
     * @param i: index
     * @return nothing
     *
     ************************/
    function textToInput(i) {
        allIText[i].addEventListener("click", function() {
            modifyText(i);
            clickEnterToGet(i);
        }, false);
    }

    /*************************
     *
     * modifyText: this function is used to hide the .item__text and adding input node to .item parent
     * @param i: index
     * @return nothing
     *
     ************************/
    function modifyText(i) {
        var text = allIText[i].innerText;
        // hide it in the mean time
        allIText[i].style.display = "none";

        // create input node and style it little bit
        input[i] = document.createElement("input");
        input[i].setAttribute("class", "item__fixText");
        input[i].setAttribute("type", "text");
        input[i].setAttribute("value", text);
        input[i].style.padding = "5px";
        input[i].style.flex = "1";
        input[i].style.marginRight = "20px";
        input[i].style.fontSize = "1rem";
        input[i].style.fontFamily = "Georgia, 'Times New Roman', Times, serif";
        input[i].focus();

        // connect it with it´s parent by insert it after allCkBox[i]
        items.children[i].insertBefore(input[i], items.children[i].children[2]);

        // try to replace child
        // items.children[i].replaceChild(input, allIText[i]);
    }

    /*************************
     *
     * checkAllBox: use to check on 
     * @param i: index number of all check box and all item text
     * @return nothing
     *
     ************************/
    function checkAllBox(i) {
        allCkBox[i] = items.children[i].children[0];
        allIText[i] = allCkBox[i].nextElementSibling;
        allCkBox[i].addEventListener("click", function() {
            changedText(i);
        }, false);
    }

    /*************************
     *
     * changedText: changed text from .item to line-through or none
     * @param i: is the index number of all check box and all item text
     * @return nothing
     *
     ************************/
    function changedText(i) {
        if(allCkBox[i].checked === true) {
            allIText[i].style.textDecoration = "line-through";
        }
        else if(allCkBox[i].checked === false) {
            allIText[i].style.textDecoration = "none";
        }
    }

    /*************************
     *
     * formHandler: use this function to create elements and give them functionality.
     * @param e: event
     * @return nothing
     *
     ************************/
    function formHandler(e) {
        var formInput = document.querySelector(".form__input");
        var submitText = formInput.value;
        if(submitText.length > 0 && !isAllSpace(submitText)) {
            
            formInput.value = "";

            var newLI = document.createElement("li");
            newLI.setAttribute("class", "item");

            var newInput = document.createElement("input");
            newInput.setAttribute("class", "item__checkbox");
            newInput.setAttribute("type", "checkbox");

            var newSpan = document.createElement("span");
            newSpan.setAttribute("class", "item__text");
            var txt4Span = document.createTextNode(submitText);
            newSpan.appendChild(txt4Span);

            var newButton = document.createElement("button");
            newButton.setAttribute("class", "item__button");
            var txt4Button = document.createTextNode("Eyða");
            newButton.appendChild(txt4Button);

            newLI.appendChild(newInput);
            newLI.appendChild(newSpan);
            newLI.appendChild(newButton);

            items.appendChild(newLI);

            // give all functionality to all children of newLI that we just created here above
            checkAllBox(j);
            textToInput(j);
            removeButton(j);
            j++;

        }
        e.preventDefault();
    }

    /*************************
     *
     * isAllSpace: use this function to check whether all string is only with spaces
     * @param text: is string
     * @return true: if all string is space only
     * @return false: if all string is not
     *
     ************************/
    function isAllSpace(text) {
        if(text.length === 1 && text === " ") return true;
        if(text.length === 2 && text === "  ") return true;
        for(var r=0; r+2<text.length; r++) {
            if(text.substring(r, r+1) === text.substring(r+1, r+2) && text.substring(r, r+1) === " ") {
                return true;
            }
        }
        return false;
    }

    return {
        init: init
    };
})();
