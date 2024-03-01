def fib(n):
    assert n > 0, "n should be positive integer"
    if n <= 2:
        return 1

    return fib(n-1) + fib(n-2)

print fib(1), fib(2), fib(3)
# print fib(100)

def fib(n, fibtable={1: 1, 2: 1}):
    assert n > 0, "n should be positive integer"

    if not n in fibtable:
        fibtable[n] = fib(n-1) + fib(n-2)

    return fibtable[n]

print fib(1), fib(2), fib(3)
print fib(100)
assert fib(100) == fib(99) + fib(98)
print fib.func_defaults[0]
