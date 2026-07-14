

def knapsack(items, capacity):
  n = len(items)
  # [n][capacity + 1]
  dp = [[0] * (capacity + 1) for _ in range(n)]

  for i in range(n):
    for j in range(capacity + 1):
      if i == 0:
        if items[i]["weight"] > j:
          dp[i][j] = 0
        else:
          dp[i][j] = items[i]["value"]
      else:
        if items[i]["weight"] > j:
          dp[i][j] = dp[i - 1][j]
        else:
          dp[i][j] = max(dp[i - 1][j], dp[i -1][j - items[i]["weight"]] + items[i]["value"])
  return dp[n - 1][capacity]