---
date: "2020-05-08T22:12:42Z"
tags:
- python
- fibonacci
- memoization
- dynamic programming
title: Fun with fibonacci!
---
Prepare yourselves, ladies and gentlemen, for we're diving into the depths of Fibonacci and the wonders of its mysteries!

The Fibonacci series. Ah, what a wonder it is! It's more than just a series of numbers; it's an elegant dance between digits, an encapsulation of the Golden Ratio, and a playground for coders to frolic in. We're going to crack this nut wide open!

What's the Fibonacci series, you ask? Imagine a series that builds upon itself, where each number is the sum of the two that came before it, like a winding staircase leading to infinity. In the mathematical tongue, we'd say:

{{< highlight python >}}
    When n is a positive integer
    f(n) = 1 # when n <= 2
    f(n) = f(n-1) + f(n-2) # when n > 2
{{< / highlight >}}

Take the leap and scribe this into Python, and voila! Here's a Pythonic Fibonacci for you:

{{< highlight python >}}
def fib(n):
    assert n > 0, "n should be positive integer"
    if n <= 2:
        return 1

    return fib(n-1) + fib(n-2)

print fib(1), fib(2), fib(3)
#=> prints '1 1 2' to STDOUT.
{{< / highlight >}}

But wait, the waters are getting choppy! When we're dealing with big numbers, our Fibonacci function starts to trip over itself. It's re-calculating the same values over and over again like a broken record player. What a colossal waste of precious time!

{{< highlight python >}}
fib(524) = fib(523) + fib(522)
fib(523) = fib(522) + fib(521)

fib(522) is calculated twice. And fib(521), fib(520), and so on... It's a disaster!
{{< / highlight >}}

This is where our inner engineer comes to the rescue. We're going to outsmart the system and store the computed values in a lookup table. It's like building a library of Fibonacci numbers! This sly technique is called memoization, (think memorization, but with an 'o')!

Memoization is an old trick up the sleeve of dynamic programming. Here's how you wield it in the battle against redundancy:

{{< highlight python >}}
def fib(n, fibtable={}):
    assert n > 0, "n should be positive integer"

    if n <= 2:
        return 1

    if not n in fibtable:   # is it already computed?
        fibtable[n] = fib(n-1) + fib(n-2)   # update the table

    return fibtable[n]

print fib(100)
assert fib(100) == fib(99) + fib(98)
{{< / highlight >}}

So there you have it, folks! The Fibonacci series, dressed in Python, and turbocharged with the power of memoization. Now go forth, and Fibonacci like you've never Fibonacci'd before​!
