
def coin(array, low, high):
  if low == high:
    return low

  mid = (low + high) // 2

  if weigh(array, low, mid) > weigh(array, mid + 1, high):
    return coin(array, low, mid)
  else:
    return coin(array, mid + 1, high)

def weigh(array, low, high):
  return sum(array[low:high + 1])