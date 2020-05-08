---
layout: post
title:  "Fun with fibonacci!"
date:   2020-05-08 22:12:42 +0530
categories: jekyll update
tags: [python]
---
I love [fibonacci] series! 
<br><br>
Besides, having the [golden ratio] between its adjacent numbers, it can be used to illustrate important concepts in programming. It's recursive implementation is elegant and with [memoization], we can improve it's time complexity.

What's a fibonacci? It's the following series. <br><br>
`1, 1, 2, 3, 5, 8, 13, ...`

How is it generated? By adding two previous numbers. <br>

Mathematically speaking:

```
    When n is a postive integer
    f(n) = 1 # when n <= 2
    f(n) = f(n-1) + f(n-2) # when n > 2
```

Easiest and most intuitive way to write a fibonacci function is the recursive way.  Just convert the mathematical definition to a programmatic one and you are done.

### Python implementation of fibonacci <br>
{% highlight python %}
def fib(n):
    assert n > 0, "n should be positive integer"
    if n <= 2:
        return 1

    return fib(n-1) + fib(n-2)

print fib(1), fib(2), fib(3)
#=> prints '1 1 2' to STDOUT.
{% endhighlight %}
<br>
But there is a slight hiccup. If we want to find out the fibonacci number of a big number there will be a lot of redundant calculation, which is time consuming, and we get the dreaded exponential growth!

For example: 
```
fib(524) = fib(523) + fib(522)
fib(523) = fib(522) + fib(521)

fib(522) is calcualated twice. And fib(521), fib(520), and so on... What a waste!
```
<br>
So what do we do? Trade off some memory for computation and profit!

Just store the already computed values in a lookup table.  If already computed, return it from the table, 
else compute and update the table with it, and return. 

This technique is called [memoization], (think memorization ;)!

### Memoized fibonacci implementation: <br>
{% highlight python %}
def fib(n, fibtable={}):
    assert n > 0, "n should be positive integer"

    if n <= 2:
        return 1

    if not n in fibtable:   # is it already computed?
        fibtable[n] = fib(n-1) + fib(n-2)   # update the table

    return fibtable[n]

print fib(100)
assert fib(100) == fib(99) + fib(98)
{% endhighlight %}

[fibonacci]: https://en.wikipedia.org/wiki/Fibonacci_number
[memoization]: https://en.wikipedia.org/wiki/Memoization
[time complexity]: https://en.wikipedia.org/wiki/Time_complexity
[golden ratio]: https://en.wikipedia.org/wiki/Golden_ratio#Relationship_to_Fibonacci_sequence
