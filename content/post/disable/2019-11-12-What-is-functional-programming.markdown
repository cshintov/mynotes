---
categories: common
date: "2019-11-12T11:32:43Z"
published: false
tags:
- python
- fp
title: Functional programming with Python!
---

#### Functional programming has many of the following characteristics:
* Functions are first class objects.
* Recursion instead of loops.
* No side-effects. 
* No statements. Only expressions.
* `what` not `how`.
* Utilizes `higher order` functions.

---

#### Advantages
* Rapid development.
* Short code.
* Less bug-prone.
* Less difficult to prove formal properties.

---


#### Functional elements of Python
* map, filter,reduce and lambda.
* list comprehension, generator expressions.

---

#### Eliminating flow control statements
* Replace loop with `map(func, lst)`
* Sequential execution `map(do, [f1, f2, f3])`

Imperative and FP echo
{{< highlight python >}}
# imperative version of "echo()"
def echo_IMP():
    while 1:
        x = raw_input("IMP -- ")
        if x == 'quit':
            breakelseprint x

echo_IMP()

# utility function for "identity with side-effect"
def monadic_print(x):
    print x
    return x

# FP version of "echo()"
echo_FP = lambda: monadic_print(raw_input("FP -- ")) == 'quit' or echo_FP()
echo_FP()
{{< / highlight >}}

Monads are used to contain side-effects.

#### Why "No Side Effects?"
A very large percentage of program errors, and the problem that drives programmers to debuggers, occur because variables obtain unexpected values during the course of program execution. Functional programs bypass this particular issue by simply not assigning values to variables at all.  

#### Reference
[David Mertz's blog] on functional programming with Python

[David Mertz's blog]: https://developer.ibm.com/articles/l-prog/
