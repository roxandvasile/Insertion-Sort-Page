"use strict"

// Functia pentru sortarea matricei
function insertionSort(arr, n) {
    let i, key, j;

    //iteram in matrice de la arr[1] la arr[n]
    for (i = 1; i < n; i++) {
        key = arr[i]; //stocam urmatorul element in variabila key, acesta v-a incepe cu index-ul 1
        j = i - 1;

        /* Mutam elementele de arr[0..i-1], care sunt mai mari decat variabila key, cu o pozitie inaintea pozitiei lor curente*/
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }

    return arr;
}


const sortBtn = document.getElementById("sortBtn");

sortBtn.onclick = function() {
    // sirul este citit din elementul cu id-ul 'array' (este sir de caractere)  
    var inputVal = document.getElementById("array").value;

    // spargem sirul de caractere intr-o matrice de subsiruri
    const numbers = inputVal.split(",");

    //convertim matricea de subșiruri într-o matrice de numere
    const parsedNumbers = numbers.map((number) => {
        return parseInt(number);
    })

    // sirul este afisat din elementul cu id-ul "sortedArray"
    document.getElementById("sortedArray").value = insertionSort(parsedNumbers, parsedNumbers.length);

    // se verifica daca campul este gol  
    if (inputVal == "") {
        alert('Campul este gol!');
        return;
    }

    // isValid indica daca sirul contine doar , si cifre
    var isValid = /^[0-9,]*$/.test(inputVal);
    if (!isValid) {
        alert('Sirul nu contine doar cifre separate prin caracterul virgula!');
        return;
    }

}