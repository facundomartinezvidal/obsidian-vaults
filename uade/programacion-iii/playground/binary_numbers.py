

# print all n-bit binary numbers using backtracking

def print_binaries(n):
  solution = [0] * n
  backtrack(solution, 0, n)


def backtrack(solution, k, n):
  # base case: full number built
  if k == n:
    print("".join(str(b) for b in solution))
    return

  # try each candidate for position k
  for bit in (0, 1):
    solution[k] = bit
    backtrack(solution, k + 1, n)


if __name__ == "__main__":
  print_binaries(3)
