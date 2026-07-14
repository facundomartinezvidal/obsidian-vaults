
Divide and Conquest - tm_p2

```
function champaqui(array, low, high)
    // base case: single element must be the peak
    if low == high // O(1)
        return array[low]

    // --- DIVIDE ---
    mid = (low + high) / 2 O(1)

    // --- CONQUER ---
    if array[mid] < array[mid + 1] // log n 
        return champaqui(array, mid + 1, high)
    else
        return champaqui(array, low, mid)
        
a = 1
b = 2
k = 0

T(n) = T(n/2) + O(1)
T(n) = O(log n)
	
```


Divide and Conquest - tt_p2

```
function mergeSort(array, low, high)
	if low < high
		mid = (low + high) / 2
		mergeSort(array, low, mid)
		mergeSort(array, mid + 1, high)
		merge(array, low, mid, high)
		
function merge(array, low, mid, high)
	i = 0
	j = 0
	k = low
	
	left = array[low...mid]
	right = array[mid+1...high]
	
	while i < lenght(left) and j < length(right):
		if 
		
```