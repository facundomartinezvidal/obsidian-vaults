

# binary search

def binary_search(array, low, high, target):
  # base case
  if low > high:
    return False

  # divide
  mid = (low + high) // 2

  if target == array[mid]:
    return True

  # conquer
  if target > array[mid]:
    return binary_search(array, mid + 1, high, target)
  else:
    return binary_search(array, low, mid - 1, target)


# merge sort

def merge_sort(array, low, high):
  # base case
  if low < high:
    # divide
    mid = (low + high) // 2
    # conquer
    merge_sort(array, low, mid)
    merge_sort(array, mid + 1, high)
    # combine
    merge(array, low, mid, high) 


def merge(array, low, mid, high):
  i = 0
  j = 0
  k = low

  left = array[low:mid+1]
  right = array[mid+1:high+1]


  while i < len(left) and j < len(right):
    if left[i] <= right[j]:
      array[k] = left[i]
      i+=1
    else:
      array[k] = right[j]
      j+=1
    k+=1

  while i < len(left):
    array[k] = left[i]
    i+=1
    k+=1

  while j < len(right):
    array[k] = right[j]
    j+=1
    k+=1


# quicksort

def quicksort(array, low, high):
  if low < high:
    p = pivot(array, low, high)
    quicksort(array, low, p - 1)
    quicksort(array, p + 1, high
    )


def pivot(array, low, high):
  p = array[low]
  k = low + 1
  l = high

  while array[k] <= p and k < high:
    k+=1
  
  while array[l] > p:
    l-=1
  
  while k < l:
    array[k], array[l] = array[l], array[k]
    
    while array[k] <= p and k < high:
      k+=1
  
    while array[l] > p:
      l-=1
  array[low], array[l] = array[l], array[low]

  return l