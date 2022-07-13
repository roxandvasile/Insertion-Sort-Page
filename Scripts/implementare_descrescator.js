/* Implementarea algoritmului insertion sort in Javascript*/

// Functia pentru sortarea matricei folosind insertion sort
function insertionSort(arr, n) {
    let i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        /* Mutam elementele de arr[i-1..0], care sunt mai mici decat variabila key, cu o pozitie inaintea pozitiei lor curente*/
        while (j >= 0 && arr[j] < key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}